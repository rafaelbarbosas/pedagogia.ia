# Arquitetura — Pedagogia.IA

## Estado documental

Auditado em 2026-08-19 após a consolidação. **Atual** descreve código versionado; **transição** descreve remoção/adaptação planejada; **alvo** não deve ser lido como implementado. Decisões aceitas permanecem em `docs/adr/`.

## Arquitetura atual real

```text
Browser
  └─ frontend/ — Angular 19 standalone
       ├─ páginas institucionais
       ├─ gerador + feedback ───────┐
       └─ auth/área do usuário ─────┤ HTTP
                                    v
backend/ — FastAPI monolítico (`api/main.py`), Vercel Python
  ├─ POST /gerar ──HTTP direto──> OpenAI (`gpt-4`)
  ├─ /feedback, /auth/* e /activities
  └─ HTTP Supabase Auth/REST ───> PostgreSQL/Supabase
       └─ schema.sql: profiles, activities, anonymous_requests, feedback
```

### Frontend

- Angular standalone em `frontend/`; rotas públicas, geração, login/cadastro/callback e área autenticada coexistem.
- `IaService` consome `/gerar` e `/feedback`; `AuthSessionService` e páginas de conta consomem `/auth/*`; callback acessa Supabase diretamente.
- Produção aponta para `pedagogia-ia-api.vercel.app`. `frontend/vercel.json` não oferece fallback SPA geral.
- Só há smoke specs superficiais; não existem E2E ou workflow CI.

### Backend FastAPI

- Um entrypoint, sem routers/services/repositories/models ORM: `backend/api/main.py` concentra 13 rotas, 8 schemas Pydantic, helpers, logs e integrações.
- CORS lê `ALLOW_ORIGINS`, permite credenciais/métodos/headers amplos. Há handlers FastAPI padrão, sem política de erro própria.
- Logs incluem prompt e, no cadastro, payload com senha. Erros do Supabase podem vazar corpo remoto. Isso exige correção durante a retirada/hardening, não uma mudança silenciosa de escopo.
- Não existe health check. `favicon` é o único GET público sem integração; `/feedback` é público e grava, e `/gerar` é público/auth opcional.
- Dependências: FastAPI, httpx, dotenv, uvicorn e asyncpg. `httpx` é usado; `asyncpg` não é usado.

### Banco

- A aplicação usa Supabase Auth/REST via HTTP. Não há `DATABASE_URL`, pool, repository ou migration runner.
- `backend/supabase/schema.sql` é snapshot/script idempotente, não histórico de migrations. `profiles` depende de `auth.users`; `activities` guarda prompt/resposta e usuário; `anonymous_requests` guarda IP/rota; `feedback` guarda prompt/resposta/avaliação.
- RLS existe apenas em `profiles` e `activities`; o acesso de feedback/limite depende da key configurada. O código aceita service-role como preferência, ampliando impacto de configuração incorreta.
- Não há seed, fixture, dump ou evidência versionada de dados existentes. Produção precisa ser confirmada antes de descarte/migração.

### Infraestrutura e testes

- Dois projetos Vercel são presumidos pelos dois `vercel.json`; Root Directory precisa ser `frontend/` ou `backend/`. Configuração remota não foi auditada.
- Não há `.github/`, Docker, CI/CD, testes Python, cobertura, lock Python ou configuração Neon.
- `backend/vercel.json` roteia tudo ao entrypoint; `frontend/vercel.json` só declara `/`.

## Estado de transição

1. Caracterizar frontend e backend separadamente (P010/P015).
2. Remover geração/feedback em fatias coordenadas, mas branches separadas (P012/P016).
3. Remover auth/contas/CRUD privado no frontend e backend (P013/P017).
4. Auditar resíduos em todo o monorepo (P014); somente então declarar o legado removido.
5. Confirmar destino dos dados legados (P019/CP05) antes de migrations destrutivas.
6. Adaptar a aplicação FastAPI existente: health, módulos de domínio e leitura pública; não recriar backend.

O schema legado não será promovido ao modelo alvo por inércia. `activities` pode inspirar identidade/timestamps, mas campos generativos e `user_id` contradizem conteúdo público anônimo. Nenhuma migration será implementada antes de CP01.

## Arquitetura alvo mínima (planejada)

```text
Professor
  ├─ ChatGPT + Skills versionadas
  │             └─ MCP read-only
  └─ Angular estático (vitrine/tutorial)

backend/
  ├─ API FastAPI pública read-only + /health
  ├─ MCP (entrypoint/transporte separado)
  ├─ services/repositories compartilhados
  └─ PostgreSQL (preferência Neon)
```

- Angular não terá chat, geração, feedback, auth ou contas.
- FastAPI não chamará OpenAI nem persistirá prompts/IP/tokens; oferecerá health e leitura pública.
- MCP terá apenas busca e recuperação aprovadas no CP03. Recomendação: ficar em `backend/mcp/`, compartilhando domínio/repository sem obrigar mesmo processo de deploy.
- Conteúdo será público, anônimo e carregado por migration/seed versionado. Sem BNCC estruturada, embeddings ou escrita MCP.

## Modelo de dados: comparação e checkpoint

As alternativas originais continuam pendentes no CP01. O backend não elimina essa decisão:

- **A — tabela estruturada + JSONB:** simples, mas filtros/evolução mais frágeis.
- **B — núcleo relacional enxuto (recomendada):** `activities`, steps, materials, tags e join; grade/subject controlados e objetivos/variações estruturados.
- **C — domínio amplamente normalizado:** integridade maior, complexidade prematura.

O schema Supabase atual não equivale a nenhuma alternativa: sua tabela `activities` armazena entrada/saída generativa privada. Reuso seguro limita-se a conceitos de UUID/timestamps. CP01 deve aprovar o contrato; CP05, criado pela auditoria, decide retenção/exportação/descarte dos dados legados caso produção contenha registros.

## Skills e MCP

As opções de Skills permanecem: uma central; várias independentes; ou central + especializadas (recomendada). O backend não trouxe Skills nem muda CP02.

Para MCP, a recomendação funcional permanece `search_activities` + `get_activity`, read-only, com limites e erros tipados. O monólito real reforça a necessidade de extrair repository/service compartilhado antes do MCP. CP03 deve confirmar contrato e transporte/deploy; a localização sugerida é `backend/mcp/`, não um novo projeto por padrão.

## Limites de confiança

Esta auditoria cobre Git. Não confirma banco/dados de produção, variáveis Vercel, domínios, logs/retention remotos nem histórico do repositório backend anterior. Esses itens aparecem no backlog como verificação humana/infra, sem sondagem de produção nesta tarefa.

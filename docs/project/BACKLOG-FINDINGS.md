# Auditoria pós-monorepo (2026-08-19)

## O que o backend revelou

- O monorepo já contém `frontend/` e `backend/`; a consolidação entrou pelo commit `bd6e33a`. Não há `skills/`, MCP ou `.github/` versionados.
- O backend é uma aplicação FastAPI monolítica em `backend/api/main.py`: schemas Pydantic, endpoints, acesso HTTP ao Supabase, autenticação, geração, feedback e CRUD ficam no mesmo módulo. Não há routers, services, repositories, models ORM, dependency injection ou middleware próprio além de CORS.
- Endpoints atuais: `GET /favicon.ico`; `POST /gerar`; `POST /feedback`; `POST /auth/register`, `/auth/verify-email`, `/auth/login`, `/auth/change-password`, `/auth/logout`; `GET /auth/me`; `PUT /auth/profile`; e CRUD autenticado em `/activities`. Não existe `/health`.
- Persistência usa a API REST/Auth do Supabase via `httpx`, não `asyncpg`, apesar de `asyncpg` estar declarado. `backend/supabase/schema.sql` é um script idempotente, não uma cadeia de migrations. Ele cria `profiles`, `activities`, `anonymous_requests` e `feedback`, além de triggers, índices e RLS para as duas primeiras tabelas.
- O schema legado depende de `auth.users`; `activities` guarda prompt e resposta gerada vinculáveis a usuário. Ele não representa o acervo público estruturado alvo. Nenhuma tabela alvo pode ser considerada implementada ou migrada.
- A geração antiga não usa SDK: `POST /gerar` faz HTTP direto com `httpx`, modelo `gpt-4`, `OPENAI_API_KEY` e `OPENAI_API_URL`. O mesmo fluxo valida sessão, limita anônimos por IP e persiste IP/rota.
- A configuração também exige `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` ou `SUPABASE_ANON_KEY`, `ALLOW_ORIGINS` e `LOG_LEVEL`. Há risco de exposição: o registro loga o `payload`, incluindo senha; geração/feedback logam prompts; erros do Supabase podem ser devolvidos ao cliente.
- Vercel está configurado separadamente em `frontend/vercel.json` e `backend/vercel.json`. O frontend ainda aponta para `pedagogia-ia-api.vercel.app`. Não há workflow CI, health check, testes Python, fixtures, mocks, cobertura, lock Python ou configuração Neon/DATABASE_URL.

## Comparação com o planejamento anterior

| Afirmação/suposição | Classificação | Reconciliação |
|---|---|---|
| Somente Angular estava no checkout | DESATUALIZADA | O backend agora está em `backend/`. |
| Backend precisava ser criado | INCORRETA | FastAPI existe; deve ser modularizado/adaptado, não recriado. |
| Backend não podia ser auditado | NÃO ERA POSSÍVEL VERIFICAR ANTES | Inventário fechado localmente; infraestrutura remota continua fora da auditoria. |
| Integração OpenAI provável no backend | PARCIALMENTE CORRETA | Confirmada como HTTP direto, sem SDK. |
| Não havia migrations/banco observável | DESATUALIZADA | Há schema Supabase legado único, mas não migrations nem modelo alvo. |
| PostgreSQL/Neon alvo | CORRETA | Supabase também é PostgreSQL, porém contrato e acesso atuais não atendem ao alvo aprovado. |
| FastAPI + API read-only + MCP compartilhando domínio | CORRETA COMO ALVO | Nada disso está implementado; o monólito fornece código HTTP/log/CORS parcialmente reutilizável. |
| MCP no mesmo backend quando viável | PARCIALMENTE CORRETA | Recomenda-se `backend/mcp/` compartilhando services/repositories; transporte/deploy ainda exige CP03. |
| Remover gerador e auth só no Angular | INCORRETA | Backend contém geração, feedback, auth, CRUD e schema legados; remoções precisam de frentes coordenadas. |
| P012 e P013 dependiam de estratégia de importação | DESATUALIZADA | Consolidação já ocorreu; P011A foi cancelada por perda de objeto. |
| Testes e CI eram lacunas | CORRETA | Backend não tem testes e monorepo não tem CI. |

## Inventário definitivo da integração antiga

| Ocorrência | Classificação | Tratamento planejado |
|---|---|---|
| `backend/api/main.py`: `/gerar`, prompt embutido, `gpt-4`, HTTP OpenAI, `OPENAI_API_KEY`, `OPENAI_API_URL` | REMOVER | P016, depois auditoria P014. |
| `backend/api/main.py`: `/feedback`, limite/IP e helpers exclusivos do gerador | REMOVER | P016; preservar helper Supabase somente até P017. |
| `frontend/src/app/service/ia.service.ts`, spec, generator page e rota/CTAs | REMOVER | P012. |
| `httpx` | MANTER temporariamente por dependência | Ainda serve Supabase/auth até P017; reavaliar após repository PostgreSQL. Não é por si só OpenAI. |
| `asyncpg` | NÃO relacionado à geração antiga | Dependência não usada; substituir/confirmar driver somente após CP01. |
| `backend/supabase/schema.sql`: `anonymous_requests`, `feedback`, `profiles`, `activities` legado | SUBSTITUIR/MIGRAR | P019 define transição; P023 implementará apenas após CP01. |
| Endpoints `/auth/*`, CRUD `/activities`, frontend auth e environments Supabase | REMOVER | P013/P017; fora do MVP. |
| `frontend/src/environments/environment.production.ts`: host do backend antigo | REFATORAR | P018/P071, após contrato de deploy. |
| ADRs e documentos que registram a remoção | NÃO relacionado à geração antiga | Manter como histórico/fonte de verdade. |
| SDK, mocks, testes OpenAI, scripts e CI | NÃO ENCONTRADO | Confirmar novamente em P014. |

## Reuso, obsolescência e riscos

**Reutilizável:** instanciação FastAPI, CORS parametrizado (após hardening), logging básico, padrão de chamadas assíncronas como referência, deployment Python da Vercel e shell/assets/páginas públicas Angular.

**Obsoleto:** toda geração/feedback, controle de IP, autenticação/perfis, CRUD privado, schema ligado a `auth.users` e mensagens/CTAs de gerador. A remoção será incremental e protegida por caracterização; nada foi removido nesta reconciliação.

**Dados:** não há dump nem evidência de dados reais no Git. Antes de retirar tabelas, P019 deve decidir retenção/exportação/descarte e confirmar se existe produção. Isso é checkpoint humano porque pode haver dados pessoais e histórico útil; não autoriza ampliar o MVP.

**Infra:** os dois `vercel.json` dependem de Root Directory correto no painel; a configuração do painel e secrets não são verificáveis pelo Git. P018 cobre CI e validação dos dois builds; P070/P071 cobrem deploy, sem mudança nesta auditoria.

## Posição do MCP

Não existe decisão humana sobre diretório/processo. A recomendação continua ser a alternativa A: módulo `backend/mcp/`, separado da API em entrypoint/transporte, mas compartilhando schemas, services e repository do backend. Isso reduz duplicação e custo sem forçar o MCP ao mesmo processo Vercel. CP03 deve confirmar tools, transporte e restrições de deploy antes da implementação; não é necessário um novo checkpoint apenas para o diretório.

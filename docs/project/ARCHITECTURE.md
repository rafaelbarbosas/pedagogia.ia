# Arquitetura — Pedagogia.IA

## Estado e linguagem documental

Este documento separa explicitamente o que **existe**, o que está **implementado hoje** e o que é **alvo aprovado apenas conceitualmente**. Itens propostos não devem ser tratados como disponíveis.

## Arquitetura atual (auditada em 2026-08-19)

Este repositório contém somente uma aplicação Angular 19 standalone na raiz. O backend existe separadamente no repositório/infraestrutura `pedagogia.ia-api`, conforme confirmação humana de 2026-08-19. Esse segundo checkout não está montado nem disponível entre os recursos desta sessão, portanto seu código ainda não foi auditado. Neste repositório frontend não há código Python, models, schemas, routers, migrations, banco local, MCP, Skills, GitHub Actions ou testes de integração.

```text
Browser
  └─ Angular 19 (raiz do monorepo)
       ├─ páginas públicas institucionais
       ├─ gerador antigo ──HTTP──> API externa configurada
       ├─ feedback antigo ─HTTP──> API externa configurada
       └─ autenticação antiga ────> API externa/Supabase

Vercel: somente regra de rota mínima
Backend atual: repositório/infraestrutura separado `pedagogia.ia-api`
Banco/MCP/Skills: não observados neste checkout
```

### Angular atual

- Rotas: `/home`, `/como-utilizar`, `/sobre-nos`, `/contato`, `/gerar-atividades`, callback, login, área do usuário, cadastro e agradecimento; a raiz redireciona ao gerador.
- `IaService` chama `POST /gerar` e `POST /feedback` em host configurável.
- `GeneratorPageComponent` concentra geração, feedback, limite de uso, renderização Markdown e exportação TXT/PDF.
- Autenticação chama `/auth/login`, `/auth/register`, `/auth/logout`, `/auth/me` e consulta Supabase no callback; token fica em `localStorage`.
- Headers e menus alternam conforme sessão autenticada.
- Testes existentes: smoke tests de criação do componente raiz e do `IaService`; o teste do service não configura `HttpClient` e não cobre contratos.

### Infraestrutura atual

- `package.json` oferece start, build, watch e teste.
- `vercel.json` contém apenas uma rota para `/`; não documenta deploy do backend nem fallback completo de SPA.
- As environments configuram um host remoto de API em produção e valores vazios de Supabase.
- Não há workflows de CI, arquivos de container, configuração Neon, migrations ou gerenciador Python.

## Arquitetura já implementada

Somente o frontend Angular e seus assets/configurações estão implementados e versionados **neste checkout**. As páginas institucionais, layout responsivo e partes de exportação local podem ser reaproveitados após revisão. O backend citado pelas URLs pertence ao repositório separado `pedagogia.ia-api`; até que ele seja disponibilizado nesta sessão, não é possível afirmar quais partes de FastAPI, banco e infraestrutura já estão implementadas.

## Inventário da integração antiga

| Área | Evidência/contrato | Impacto |
|---|---|---|
| Geração | `IaService.gerarExercicio()` → `POST /gerar` | Fluxo central incompatível com o MVP |
| Feedback | `IaService.enviarFeedback()` → `POST /feedback` | Persiste prompt/resposta potencialmente sensíveis; fora do MVP |
| Interface | `GeneratorPageComponent` e rota padrão | Aplicação atua como gerador/chat próprio |
| Autenticação | login, cadastro, callback, sessão, área e headers autenticados | Fora do MVP; amplia superfície e dados pessoais |
| Configuração | `urlApi`, `supabaseUrl`, `supabaseAnonKey` | Configuração antiga a remover em etapas |
| Pacotes | Nenhum SDK OpenAI no `package.json` do frontend | A integração OpenAI provável está no backend separado ainda não auditado |
| Backend/testes/mocks/CI/docs | Repositório separado conhecido: `pedagogia.ia-api`; checkout indisponível nesta sessão | Lacuna de auditoria; auditar o segundo repositório e a infraestrutura antes de afirmar remoção completa |

## Código reaproveitável

- Shell Angular, estilos globais, assets, páginas institucionais e responsividade.
- Exportação client-side pode virar exemplo/utility apenas se houver valor para o site; não é requisito central.
- `HttpClient` e configuração standalone podem atender futuramente endpoints públicos.
- Componentes devem ser reaproveitados seletivamente; conteúdo que promete geração própria precisa ser reescrito.

## Código obsoleto ou candidato à remoção incremental

- Gerador, `IaService`, feedback e mensagens de limite de geração.
- Login, cadastro, callback, sessão, área autenticada e componentes de autenticação.
- Campos Supabase e contratos `/auth/*`, `/gerar`, `/feedback`.
- Dependência `marked` se nenhum conteúdo estático ou exemplo continuar exigindo Markdown.
- CTA e textos que direcionam ao gerador próprio.

Nada deve ser removido em big bang: primeiro caracterizar build/testes, depois isolar rotas e remover fatias verificáveis.

## Arquitetura alvo mínima (planejada; não implementada)

```text
Professor
  ├─ ChatGPT
  │    ├─ Skills pedagógicas (arquivos versionados)
  │    └─ MCP read-only
  │          └─ adaptador MCP no mesmo backend/processo quando viável
  └─ Angular estático (vitrine/tutorial)

FastAPI (um serviço)
  ├─ health
  ├─ API pública read-only
  ├─ regras de consulta compartilhadas com MCP
  └─ acesso PostgreSQL
           └─ Neon PostgreSQL
```

### Princípios alvo

- Monorepo com diretórios claros para frontend, backend, Skills e documentação. Como frontend e backend estão hoje em repositórios separados, a consolidação deve ser incremental: primeiro auditar `pedagogia.ia-api`, depois escolher uma direção de importação com histórico/rastreabilidade e somente então alterar deploys.
- Um único backend FastAPI. MCP no mesmo deploy/processo se compatível com o transporte exigido pelo ChatGPT; nenhum microserviço novo por padrão.
- Repository/service simples compartilhado por API e MCP, evitando duplicar consultas.
- SQL parametrizado e filtros indexáveis antes de FTS; sem embeddings ou banco vetorial.
- Conteúdo somente leitura em runtime; carga editorial via migration/seed versionado, não via MCP.
- Sem autenticação, cookies próprios, perfis ou conteúdo privado no MVP.

## Modelo de dados — alternativas para decisão conjunta

### Alternativa A — uma tabela estruturada com JSONB

`activities`: `id`, `slug`, `title`, `summary`, `grade` (enum/check), `subject`, `topic`, `difficulty`, `duration_minutes`, `objectives jsonb`, `materials jsonb`, `steps jsonb`, `variations jsonb`, `methodology`, `created_at`, `updated_at`, `published`.

- **Relações:** nenhuma no MVP.
- **Vantagens:** migration e consultas simples; conteúdo ainda possui seções; seed fácil.
- **Desvantagens:** filtros de tags e evolução taxonômica ficam frágeis; arrays JSONB têm validação/índices menos óbvios.
- **Impacto futuro:** futura normalização exige migration de dados.

### Alternativa B — núcleo relacional enxuto (recomendada)

- `activities`: identidade, título, resumo, `grade`, `subject`, tema, dificuldade, duração, metodologia textual, status público e timestamps.
- `activity_steps`: `activity_id`, `position`, `instruction`.
- `activity_materials`: `activity_id`, `position`, `name`, `quantity_or_note` opcional.
- `tags`: `id`, `slug`, `name`; `activity_tags`: N:N.
- Objetivos e variações ficam em `text[]` ou JSONB validado no primeiro contrato, evitando tabelas prematuras.

- **Relações:** activity 1:N steps/materials; activity N:N tags.
- **Vantagens:** preserva ordem e estrutura, permite bons filtros, mantém apenas cinco tabelas e evolui bem.
- **Desvantagens:** joins e seed um pouco maiores; `grade`/`subject` textuais exigem checks ou validação na aplicação.
- **Impacto futuro:** grades/subjects/metodologias podem virar tabelas somente quando governança/taxonomia justificar.

### Alternativa C — domínio amplamente normalizado

Além da alternativa B, cria `grades`, `subjects`, `methodologies`, `pedagogical_objectives` e `activity_variations`.

- **Vantagens:** integridade referencial e taxonomias reutilizáveis.
- **Desvantagens:** alto custo editorial e de joins para uma base pequena; decisões de taxonomia e BNCC prematuras.
- **Impacto futuro:** flexível em escala, mas cria complexidade antes da validação.

### Recomendação

Aprovar a **Alternativa B**, mantendo `grade` e `subject` como valores controlados pela aplicação/migration e objetivos/variações como arrays estruturados. Ela equilibra consulta, estrutura e YAGNI. Antes da migration, decidir IDs, campos obrigatórios, enumerações, limites e formato dos arrays.

## Skills — alternativas para decisão conjunta

### A — uma Skill central

Uma Skill cobre gerar, planejar, adaptar, variar e avaliar. Menor instalação e pouca sobreposição, mas tende a crescer, reduzir precisão de seleção e dificultar testes isolados.

### B — várias Skills independentes

Uma por capacidade. Modular e testável, porém repete regras de faixa etária, aumenta manutenção e pode gerar seleção/conflitos ambíguos.

### C — central + especializadas (recomendada)

Uma Skill central de atividades pedagógicas reúne princípios, coleta de contexto e roteamento; inicialmente duas especializadas: `planejar-atividade` (inclui materiais, passos e variações) e `adaptar-atividade` (idade, dificuldade e recursos). Sequência didática e avaliação tornam-se Skills somente após evidência.

- **Manutenção:** regras compartilhadas centralizadas.
- **Qualidade/testes:** contratos e casos reproduzíveis por fluxo.
- **Complexidade:** moderada e controlável com apenas três Skills iniciais.
- **Risco:** roteamento/sobreposição exigem exemplos negativos e regra clara de precedência.

## MCP tools — proposta para decisão conjunta

### `search_activities` (necessária)

- **Responsabilidade:** buscar/listar atividades com uma única interface.
- **Inputs:** `query?`, `grade?`, `subject?`, `topic?`, `difficulty?`, `tags?`, `limit?`, `cursor?`.
- **Output:** itens resumidos (`id`, título, resumo, etapa, tema, dificuldade, duração, tags) e paginação.
- **Motivo:** substitui `list_activities`, `search_by_grade` e `search_by_topic`; filtros opcionais eliminam redundância.
- **Simplificação:** começar sem cursor se o acervo inicial e limite máximo forem pequenos; não prometer ranking inteligente.

### `get_activity` (necessária)

- **Responsabilidade:** recuperar uma atividade pública completa por ID/slug canônico.
- **Inputs:** exatamente um identificador conforme contrato aprovado.
- **Output:** campos, objetivos, materiais, passos ordenados, variações, metodologia e metadados públicos.
- **Erros:** retorno tipado para inexistente/inválido, sem stack trace ou dados internos.
- **Motivo:** mantém resultados de busca leves e permite detalhamento explícito.

### Tools não recomendadas no MVP

`list_activities`, `search_by_grade` e `search_by_topic` duplicam filtros. `get_activity_recommendations` implica ranking/recomendação não validado e pode ser atendido pelo raciocínio do ChatGPT sobre os resultados de busca.

## CHECKPOINT HUMANO — MODELO DE DADOS

**Pendente.** Escolher A, B (recomendada) ou C e confirmar: formato de ID, vocabulários de grade/subject/difficulty, campos obrigatórios e representação de objetivos/variações. Não criar models/migrations antes do registro da decisão.

## CHECKPOINT HUMANO — SKILLS

**Pendente.** Escolher A, B ou C (recomendada) e confirmar nomes, fronteiras e estrutura de saída. Não criar Skills antes do registro da decisão.

## CHECKPOINT HUMANO — MCP TOOLS

**Pendente.** Aprovar `search_activities` + `get_activity`, filtros e estratégia ID/slug/paginação. Não implementar MCP antes do registro da decisão.

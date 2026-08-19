# Roadmap

O roadmap é orientado por dependências, não por datas. O detalhamento executável está em [BACKLOG.md](BACKLOG.md).

## Fase 0 — Auditoria

Inventário do Angular, integrações externas, infraestrutura, testes e lacunas. **P001 em REVIEW.** O backend foi identificado como o repositório/infraestrutura separado `pedagogia.ia-api`, mas seu checkout ainda precisa ser disponibilizado e auditado.

## Fase 1 — Arquitetura e documentação

Documentos-base, ADRs e decisões conjuntas. **P002 em REVIEW; CP01–CP03 pendentes.**

## Fase 2 — Remoção da arquitetura antiga

Caracterizar testes e dependências nos dois repositórios; auditar `pedagogia.ia-api`; definir a consolidação incremental no monorepo; remover, em incrementos, geração/feedback e autenticação; auditar resíduos. Não afirmar remoção completa enquanto o código e o deploy do backend não forem verificados.

## Fase 3 — Modelo de domínio

Após CP01: contrato enxuto de atividade, esqueleto FastAPI e schemas. Sem migration antes de aprovação humana do modelo.

## Fase 4 — Banco e dados

Migration PostgreSQL, repository read-only, filtros SQL e seed pequeno para Jardim 1, Jardim 2 e 1º ano. Registrar origem editorial e não incluir dados pessoais.

## Fase 5 — Skills

Após CP02: casos reproduzíveis, Skill central e especializadas aprovadas. Avaliar estrutura, adequação etária, pedidos incompletos, adaptação e conflitos sem depender apenas de julgamento subjetivo.

## Fase 6 — MCP read-only

Após CP03 e repository: duas tools aprovadas, contratos tipados e testes de ausência, ID inválido, indisponibilidade, limites, segurança e não mutação.

## Fase 7 — Integração ChatGPT

Documentar instalação e executar smoke test real ChatGPT → MCP. Não usar a OpenAI API no backend.

## Fase 8 — Site vitrine/tutorial

Substituir gerador e auth por landing, tutorial, instalação, exemplos e FAQ. Manter Angular, sem chat próprio.

## Fase 9 — Hardening e produção

Deploy Angular, FastAPI e Neon; CORS, secrets, logs minimizados, erros, health check, testes E2E e validação humana do MVP.

## Fase 10 — Pós-MVP: autenticação

Autenticação, OAuth, contas e perfil somente com novo checkpoint; depois, se validado, turmas/escolas/favoritos/coleções.

## Fase 11 — Pós-MVP: MCP de escrita

Somente após identidade, autorização, publicação e moderação. Não é evolução automática do MCP read-only.

## Fase 12 — Pós-MVP: comunidade e evolução

Avaliações, comentários, publicação, moderação, comunidade, BNCC, busca semântica, personalização e monetização. Embeddings e serviços pagos exigem análise explícita de custo.

## Marcos

1. **M0 — Fonte de verdade revisada:** P001/P002 aprovados.
2. **M1 — Contratos humanos aprovados:** CP01–CP03.
3. **M2 — Legado removido:** P014.
4. **M3 — Dados públicos consultáveis:** P026.
5. **M4 — Skills e MCP verificáveis:** P033/P043.
6. **M5 — Experiência completa:** P051/P063.
7. **M6 — Produção e validação:** CP04.

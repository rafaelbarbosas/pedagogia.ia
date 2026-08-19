# Índice de decisões

## Decisões definidas

| ADR | Decisão | Estado |
|---|---|---|
| [ADR-001](../adr/001-manter-angular.md) | Manter Angular | Aceita |
| [ADR-002](../adr/002-manter-fastapi.md) | Manter Python + FastAPI | Aceita |
| [ADR-003](../adr/003-monorepo.md) | Adotar monorepo | Aceita |
| [ADR-004](../adr/004-postgresql-neon.md) | PostgreSQL com preferência por Neon | Aceita |
| [ADR-005](../adr/005-mcp-read-only.md) | MCP read-only no MVP | Aceita |
| [ADR-006](../adr/006-sem-autenticacao.md) | Sem autenticação ou contas no MVP | Aceita |
| [ADR-007](../adr/007-conteudo-publico-anonimo.md) | Conteúdo público e anônimo | Aceita |
| [ADR-008](../adr/008-remover-openai-backend.md) | Remover integração OpenAI API do backend | Aceita |
| [ADR-009](../adr/009-chatgpt-ambiente-principal.md) | ChatGPT como ambiente principal | Aceita |
| [ADR-010](../adr/010-site-vitrine.md) | Site Angular como vitrine/tutorial | Aceita |
| [ADR-011](../adr/011-bncc-fora-mvp.md) | BNCC estruturada fora do MVP | Aceita |

## Decisões pendentes (checkpoints humanos)

| Checkpoint | Opções e recomendação | Bloqueia |
|---|---|---|
| CHECKPOINT-01 — Modelo de dados | A/B/C; recomenda-se núcleo relacional enxuto (B) | Models, migration, repository, dados |
| CHECKPOINT-02 — Skills | A/B/C; recomenda-se central + duas especializadas (C) | Estrutura e testes de Skills |
| CHECKPOINT-03 — MCP tools | Recomenda-se busca parametrizada + recuperação por ID | Contrato/implementação MCP |

As propostas completas estão em [ARCHITECTURE.md](ARCHITECTURE.md). Aprovações devem gerar novos ADRs, atualizar este índice e liberar dependentes no backlog. Nenhuma decisão pendente está implicitamente aprovada.

## Regra de mudança

Reabrir ADR aceito somente diante de impedimento técnico grave documentado. Mudanças de modelo, contrato MCP, estrutura de Skills, infraestrutura, autenticação ou escrita exigem checkpoint humano.

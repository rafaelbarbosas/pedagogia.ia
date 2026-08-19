# CP03 — Aprovar contrato inicial MCP

## ID
CP03
## Título
Aprovar contrato inicial MCP
## Fase
1 — Arquitetura e documentação
## Prioridade
P0
## Complexidade
XS
## Tipo
CHECKPOINT
## Classificação
PRECISA REFINAMENTO — checkpoint humano pós-monorepo.

## Objetivo
Obter e registrar decisão humana explícita antes da implementação.
## Contexto
O FastAPI real está em `backend/api/main.py` e ainda não tem domínio/repository reutilizável. Recomenda-se MCP em `backend/mcp/`, com entrypoint/transporte próprio e services compartilhados; confirmar transporte e compatibilidade de deploy sem criar microserviço por padrão.

As alternativas, vantagens, desvantagens e recomendação estão em `docs/project/ARCHITECTURE.md`.
## Pré-requisitos
P001 e P002 revisados.
## Dependências
P001, P002.
## Pode executar em paralelo?
SIM.

Pode executar em paralelo com:
- os outros checkpoints C1
## Área afetada
documentação; schemas e implementação MCP.
## Instruções para o Codex
Apresentar contexto e opções sem reabrir decisões definidas. Aprovar `search_activities` parametrizada + `get_activity`, filtros, identificador e paginação; ou registrar ajustes objetivos. Registrar a resposta em um novo ADR, atualizar DECISIONS, ARCHITECTURE, BACKLOG, DAG e prompts dependentes.
## Restrições
Não inferir aprovação pelo silêncio; não implementar contrato; não marcar DONE sem resposta humana explícita.
## Arquivos esperados
Novo ADR e atualizações dos documentos centrais.
## Testes obrigatórios
Validar links, consistência de status e dependências.
## Critérios de aceite
Escolha inequívoca, detalhes mínimos definidos e dependentes desbloqueados corretamente.
## Decisões humanas necessárias
Este item é a própria decisão humana.
## Atualizações de documentação
ADR, DECISIONS, ARCHITECTURE, BACKLOG, ROADMAP e prompts próximos.
## Atualização do backlog
DONE somente após aprovação registrada; liberar dependentes apenas quando todas as dependências estiverem DONE.
## Resultado esperado
Decisão, arquivos, validações, riscos, pendências e próximos READY.

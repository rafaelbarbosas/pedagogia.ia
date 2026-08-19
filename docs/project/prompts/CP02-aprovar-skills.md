# CP02 — Aprovar arquitetura inicial de Skills

## ID
CP02
## Título
Aprovar arquitetura inicial de Skills
## Fase
1 — Arquitetura e documentação
## Prioridade
P0
## Complexidade
XS
## Tipo
CHECKPOINT
## Objetivo
Obter e registrar decisão humana explícita antes da implementação.
## Contexto
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
documentação; arquivos e testes de Skills.
## Instruções para o Codex
Apresentar contexto e opções sem reabrir decisões definidas. Escolher Skill central (A), Skills independentes (B) ou central + duas especializadas (C, recomendado). Confirmar nomes, fronteiras e saída. Registrar a resposta em um novo ADR, atualizar DECISIONS, ARCHITECTURE, BACKLOG, DAG e prompts dependentes.
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

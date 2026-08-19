# CP01 — Aprovar modelo mínimo de dados

## ID
CP01
## Título
Aprovar modelo mínimo de dados
## Fase
1 — Arquitetura e documentação
## Prioridade
P0
## Complexidade
XS
## Tipo
CHECKPOINT
## Classificação
PRECISA REFINAMENTO — checkpoint humano; considerar `backend/supabase/schema.sql` e CP05.

## Objetivo
Obter e registrar decisão humana explícita antes da implementação.
## Contexto
O backend agora revela uma tabela `activities` legada (`user_id`, `prompt`, `atividade_gerada`, `compartilhar`) que não atende ao acervo público alvo. UUID/timestamps podem inspirar o contrato, mas não equivalem a modelo aprovado. A decisão de destino dos registros pertence ao CP05.

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
documentação; models, migrations, banco e MCP detalhado.
## Instruções para o Codex
Apresentar contexto e opções sem reabrir decisões definidas. Escolher entre tabela com JSONB (A), núcleo relacional enxuto (B, recomendado) ou normalização ampla (C). Confirmar ID, valores controlados, campos obrigatórios e objetivos/variações. Registrar a resposta em um novo ADR, atualizar DECISIONS, ARCHITECTURE, BACKLOG, DAG e prompts dependentes.
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

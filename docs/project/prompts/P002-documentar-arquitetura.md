# P002 — Estruturar documentação e ADRs definidos

## ID
P002

## Título
Estruturar documentação e ADRs definidos

## Fase
1 — Arquitetura e documentação

## Prioridade
P0

## Complexidade
M

## Tipo
SEQUENCIAL

## Objetivo
Tornar o Git fonte de verdade para escopo, arquitetura, decisões, backlog, DAG, Waves e retomada.

## Contexto
As decisões definidas não são perguntas; modelo, Skills e MCP ainda exigem checkpoint.

## Pré-requisitos
Auditoria preliminar disponível para não documentar planos como implementados.

## Dependências
Nenhuma formal; integrar com achados de P001.

## Pode executar em paralelo?
SIM.

Pode executar em paralelo com:
- P001

## Área afetada
documentação.

## Instruções para o Codex
Criar/atualizar os documentos obrigatórios, onze ADRs, três alternativas de dados, três de Skills, proposta MCP mínima, backlog acíclico e roadmap. Separar atual, implementado e alvo.

## Restrições
Não aprovar checkpoints; não implementar produção; usar linguagem explícita de estado.

## Arquivos esperados
`docs/project/*.md`, `docs/adr/*.md`, `docs/project/prompts/*.md`.

## Testes obrigatórios
Validar links locais, colunas obrigatórias, IDs/dependências e ausência de ciclos no DAG.

## Critérios de aceite
Uma nova sessão consegue identificar estado, decisões, próxima Wave e bloqueadores apenas pelo Git.

## Decisões humanas necessárias
CP01, CP02 e CP03 permanecem pendentes.

## Atualizações de documentação
Todos os documentos-base.

## Atualização do backlog
P002 → REVIEW; dependentes não ficam READY antes de revisão humana.

## Resultado esperado
Informar resumo, arquivos, testes, riscos, pendências e `REVIEW`.

# P012 — Remover rota/UI de geração e feedback

## ID
P012
## Título
Remover rota/UI de geração e feedback
## Fase
2 — Remoção da arquitetura antiga
## Prioridade
P0
## Complexidade
M
## Tipo
PARALELIZÁVEL
## Objetivo
Remover incrementalmente gerador, service e feedback após testes e inventário; substituir a rota inicial por página institucional existente/provisória, sem implementar o redesign final.
## Classificação
PRONTO — Wave 2 pós-monorepo.

## Contexto
A interface atual contradiz o MVP. A remoção deve ser pequena, reversível e protegida por testes de caracterização.
## Pré-requisitos
Reler código, inventário, ADRs e resultados das tarefas dependentes; refinar este prompt antes de executar.
## Dependências
P010 e P015 em DONE.
## Pode executar em paralelo?
SIM, somente com P016 em `backend/`.

Executar em paralelo com P016 (arquivos separados); P013 permanece sequencial após P012.
## Área afetada
frontend; testes; documentação.
## Instruções para o Codex
1. Marcar IN_PROGRESS. 2. Identificar referências e testes exatos. 3. Remover a menor fatia coerente. 4. Ajustar rotas/textos sem criar funcionalidade nova. 5. Rodar testes e busca de resíduos. 6. Registrar descobertas e mover a REVIEW.
## Restrições
Sem novo chat, auth substituta, backend, redesign amplo ou dependência desnecessária; não remover `HttpClient` se ainda usado; não apagar evidência externa ainda pendente.
## Arquivos esperados
Arquivos Angular estritamente ligados ao fluxo, specs e documentação de estado.
## Testes obrigatórios
`npm test -- --watch=false --browsers=ChromeHeadless`; `npm run build`; `rg` para `/gerar`, `/feedback` e `IaService`.
## Critérios de aceite
Fluxo removido não está acessível/importado; navegação pública compila; testes passam; resíduos legítimos estão explicados.
## Decisões humanas necessárias
Nenhuma, salvo descoberta que altere escopo/contrato.
## Atualizações de documentação
ARCHITECTURE, BACKLOG-FINDINGS, BACKLOG, DAG/Waves e prompt seguinte.
## Atualização do backlog
IN_PROGRESS ao iniciar; REVIEW ao concluir; nunca DONE automaticamente.
## Resultado esperado
Resumo, arquivos, testes, resultados, riscos, pendências e status sugerido.

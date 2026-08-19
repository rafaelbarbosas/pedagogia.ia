# P013 — Remover autenticação e Supabase do Angular

## ID
P013
## Título
Remover autenticação e Supabase do Angular
## Fase
2 — Remoção da arquitetura antiga
## Prioridade
P0
## Complexidade
M
## Tipo
SEQUENCIAL
## Objetivo
Remover rotas, páginas, session service, headers autenticados, CTAs e environments de auth após o gerador estar estabilizado; manter o site público.
## Contexto
A interface atual contradiz o MVP. A remoção deve ser pequena, reversível e protegida por testes de caracterização.
## Pré-requisitos
Reler código, inventário, ADRs e resultados das tarefas dependentes; refinar este prompt antes de executar.
## Dependências
P010, P011, P012.
## Pode executar em paralelo?
NÃO.

Conflitos esperados com: nenhuma (sequencial após P012).
## Área afetada
frontend; testes; documentação.
## Instruções para o Codex
1. Marcar IN_PROGRESS. 2. Identificar referências e testes exatos. 3. Remover a menor fatia coerente. 4. Ajustar rotas/textos sem criar funcionalidade nova. 5. Rodar testes e busca de resíduos. 6. Registrar descobertas e mover a REVIEW.
## Restrições
Sem novo chat, auth substituta, backend, redesign amplo ou dependência desnecessária; não remover `HttpClient` se ainda usado; não apagar evidência externa ainda pendente.
## Arquivos esperados
Arquivos Angular estritamente ligados ao fluxo, specs e documentação de estado.
## Testes obrigatórios
`npm test -- --watch=false --browsers=ChromeHeadless`; `npm run build`; `rg` para auth, Supabase, tokens e rotas de conta.
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

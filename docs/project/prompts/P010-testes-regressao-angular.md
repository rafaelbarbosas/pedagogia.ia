# P010 — Caracterizar build e testes Angular

## ID
P010
## Título
Caracterizar build e ampliar testes de regressão Angular
## Fase
2 — Remoção da arquitetura antiga
## Prioridade
P0
## Complexidade
S
## Tipo
PARALELIZÁVEL
## Objetivo
Criar uma rede mínima de segurança antes de remover geração e autenticação.
## Contexto
O Angular 19 existe; os testes atuais são superficiais e o service depende de HttpClient.
## Pré-requisitos
P001 e P002 aprovados; reler o código real e refinar nomes.
## Dependências
P001, P002.
## Pode executar em paralelo?
SIM.

Pode executar em paralelo com:
- P011
## Área afetada
frontend; testes; documentação.
## Instruções para o Codex
1. Executar build/testes atuais e registrar baseline.
2. Corrigir somente infraestrutura de teste indispensável.
3. Adicionar testes de caracterização das rotas/shell e contratos HTTP antigos que protejam a remoção incremental.
4. Não reforçar comportamento obsoleto além do necessário.
## Restrições
Sem redesign, sem remoção do legado, sem nova dependência salvo justificativa; não chamar rede real.
## Arquivos esperados
Specs Angular existentes/novos e atualizações de backlog/achados.
## Testes obrigatórios
`npm test -- --watch=false --browsers=ChromeHeadless`; `npm run build`.
## Critérios de aceite
Build passa; testes interceptam HTTP; rotas críticas e baseline ficam documentados; nenhuma chamada externa ocorre.
## Decisões humanas necessárias
Nenhuma.
## Atualizações de documentação
BACKLOG, achados se divergirem e prompt seguinte.
## Atualização do backlog
P010 IN_PROGRESS ao iniciar e REVIEW ao terminar; não DONE.
## Resultado esperado
Resumo, arquivos, testes, resultados, riscos, pendências e status sugerido.

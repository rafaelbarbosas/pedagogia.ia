# P011 — Auditar `pedagogia.ia-api` e seu deploy

## ID
P011
## Título
Auditar `pedagogia.ia-api` e fechar inventário OpenAI
## Fase
2 — Remoção da arquitetura antiga
## Prioridade
P0
## Complexidade
M
## Tipo
PARALELIZÁVEL
## Classificação
OBSOLETO COMO EXECUÇÃO — o backend foi incorporado e a auditoria está em REVIEW; preservar para rastreabilidade.

## Objetivo
Ler o repositório de backend já identificado e mapear FastAPI, banco, OpenAI, auth, feedback, variáveis, testes, CI e deploy antes da remoção ou consolidação.
## Contexto
O frontend chama um host Vercel. O humano confirmou que o backend está no repositório/infraestrutura separado `pedagogia.ia-api`; ele não estava acessível no filesystem da sessão que produziu a auditoria inicial.
## Pré-requisitos
P001/P002 aprovados e checkout legível de `pedagogia.ia-api`, além de acesso somente leitura às configurações de deploy quando autorizado.
## Dependências
P001, P002.
## Pode executar em paralelo?
SIM.

Pode executar em paralelo com:
- P010
## Área afetada
backend; infraestrutura; documentação; privacidade.
## Instruções para o Codex
1. Confirmar instruções `AGENTS.md` do segundo repositório. 2. Mapear árvore, dependências Python, app FastAPI, routers, services, schemas, banco, migrations e testes. 3. Inventariar todas as referências OpenAI, endpoints consumidos pelo frontend, env vars, persistência, logs, CI e deploy com caminhos. 4. Comparar contratos frontend/backend e registrar incompatibilidades. 5. Propor opções de consolidação no monorepo sem executar a migração. Não sondar produção nem expor valores.
## Restrições
Não alterar deploy, não copiar secrets, não concluir que OpenAI foi removida só porque o código falta.
## Arquivos esperados
Atualizações em ARCHITECTURE, BACKLOG-FINDINGS, BACKLOG e prompts de remoção.
## Testes obrigatórios
Buscas `rg` no código localizado e `git ls-files`; checks apenas locais e não destrutivos.
## Critérios de aceite
Cada integração antiga tem localização e tarefa de remoção; a arquitetura implementada do backend está documentada; diferenças de contrato estão registradas; opções de consolidação são apresentadas no checkpoint P011A.
## Decisões humanas necessárias
Disponibilizar o checkout de `pedagogia.ia-api` e, depois da auditoria, aprovar em P011A a estratégia de consolidação e transição de deploy.
## Atualizações de documentação
Inventário, riscos, DAG e próximos prompts.
## Atualização do backlog
P011 REVIEW se inventário completo; BLOCKED se acesso essencial não existir.
## Resultado esperado
Resumo, evidências, testes, riscos, pendências e status.

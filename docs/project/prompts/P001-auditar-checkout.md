# P001 — Auditar checkout atual

## ID
P001

## Título
Auditar checkout atual

## Fase
0 — Auditoria

## Prioridade
P0

## Complexidade
S

## Tipo
BLOQUEADOR

## Objetivo
Produzir inventário verificável do frontend, backend, banco, OpenAI, infraestrutura e qualidade sem alterar produção.

## Contexto
O checkout aparenta conter Angular na raiz e referências a uma API externa; não presumir a existência do backend.

## Pré-requisitos
Acesso de leitura ao repositório e instruções locais.

## Dependências
Nenhuma.

## Pode executar em paralelo?
SIM.

Pode executar em paralelo com:
- P002

## Área afetada
documentação; frontend; backend; infraestrutura.

## Instruções para o Codex
1. Ler AGENTS.md aplicáveis, árvore excluindo dependências, configs, rotas, componentes, services, testes e deploy.
2. Buscar referências OpenAI/IA/auth/env/API em arquivos versionados.
3. Distinguir ausência de evidência de evidência de ausência.
4. Registrar reaproveitamento, obsolescência, riscos, privacidade e custos.

## Restrições
Não implementar nem remover funcionalidades; não acessar ou registrar secrets; não inferir o conteúdo de repositórios ou deploys que não estejam acessíveis.

## Arquivos esperados
`docs/project/ARCHITECTURE.md`, `docs/project/BACKLOG-FINDINGS.md`, backlog e prompts se descobertas alterarem o plano.

## Testes obrigatórios
`git status --short`; busca `rg` por integrações; inspeção da árvore versionada.

## Critérios de aceite
Inventário cobre todas as áreas pedidas, indica limitações e sustenta cada conclusão no checkout.

## Decisões humanas necessárias
Nenhuma; descobertas podem criar checkpoints.

## Atualizações de documentação
Arquitetura atual/implementada e riscos.

## Atualização do backlog
Mover a REVIEW, nunca DONE automaticamente; adicionar descobertas sem ampliar escopo silenciosamente.

## Resultado esperado
Informar resumo, arquivos, comandos/testes, resultado, riscos, pendências e status sugerido `REVIEW`.

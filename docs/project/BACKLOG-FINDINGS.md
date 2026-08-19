# Auditoria resumida e riscos

## Estrutura e organização

- Aplicação Angular standalone na raiz; nenhum monorepo de fato ainda, embora monorepo seja a decisão alvo.
- O backend atual foi confirmado pelo humano como um repositório/infraestrutura separado chamado `pedagogia.ia-api`. Ele não está montado no filesystem nem exposto como recurso MCP nesta sessão; uma tentativa de clone pelo GitHub foi bloqueada pelo proxy com HTTP 403.
- Assets em `public/`, páginas/componentes/services em `src/app`, environments em `src/environments`.
- Scripts limitados a Angular; não há lint explícito, E2E, backend ou automação CI.

## FastAPI e banco

Não existem neste checkout frontend. Consequentemente ainda não foi possível auditar routers, services, schemas, models, tratamento de erros, logs, tabelas, migrations ou conteúdo do `pedagogia.ia-api`. A P011 deixa de procurar a identidade do backend e passa a auditar o repositório já identificado assim que seu checkout for disponibilizado.

## Infraestrutura

Há configuração Vercel mínima para o frontend. Não há evidência versionada de Neon, GitHub Actions, secrets, ambientes do backend ou deploy reproduzível. GitHub é apenas o repositório Git; integrações remotas não foram inferidas sem evidência.

## Qualidade e riscos priorizados

1. **Crítico — backend conhecido, mas inacessível nesta sessão:** não é possível confirmar como OpenAI, feedback e autenticação operam ou são cobrados sem ler `pedagogia.ia-api` e sua configuração de deploy.
2. **Alto — construção incorreta de URL:** development usa `http://...`, mas os services prefixam `https://`, produzindo `https://http://...`.
3. **Alto — segurança de renderização:** `bypassSecurityTrustHtml` ignora sanitização do HTML produzido de resposta remota.
4. **Alto — privacidade:** feedback envia prompt, série, resposta e comentário; podem conter dados pessoais e não há política de retenção visível.
5. **Alto — autenticação fora do MVP:** token em `localStorage`, rotas e callbacks ampliam superfície e contradizem escopo aprovado.
6. **Médio — testes insuficientes:** service sem `HttpClientTesting`, TODO explícito e nenhum teste de geração/auth/rotas.
7. **Médio — SPA/deploy:** regra Vercel não cobre claramente deep links.
8. **Médio — componente grande:** gerador mistura rede, estado, feedback, exportação e PDF manual.
9. **Médio — documentação genérica:** README não descreve produto, configuração, arquitetura ou deploy.
10. **Baixo — dependências:** `marked` pode se tornar órfã após remoção do gerador; confirmar antes de excluir.

## Estratégia de mitigação

Seguir `auditar ambos os repositórios → documentar → testar → isolar → definir consolidação no monorepo → migrar → remover`. Não introduzir produção antes dos três checkpoints e não declarar o backend livre de OpenAI sem auditar `pedagogia.ia-api` e seu deploy.

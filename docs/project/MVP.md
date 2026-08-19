# MVP — Pedagogia.IA

## Hipótese

Professores de Jardim 1, Jardim 2 e 1º ano conseguem usar o ChatGPT como ambiente principal, enriquecido pela especialização pedagógica e pelo acervo público do Pedagogia.IA via MCP read-only, sem geração paga pelo backend.

## Público e problema

O MVP atende docentes das três etapas iniciais que precisam localizar, criar e adaptar atividades com rapidez. O ChatGPT fornece geração e recursos multimodais; o Pedagogia.IA fornece conhecimento, regras, workflows e dados pedagógicos estruturados.

## Escopo

- Angular como vitrine, tutorial, instalação, exemplos, FAQ e documentação básica, sem chat próprio.
- FastAPI para health check, leitura de atividades e suporte ao MCP.
- PostgreSQL, preferencialmente Neon, com uma base pequena, pública, anônima e representativa.
- Skills pedagógicas aprovadas após o checkpoint correspondente.
- MCP exclusivamente read-only, com busca e recuperação de atividade.
- Busca SQL por filtros; PostgreSQL Full-Text Search somente se a busca simples se mostrar insuficiente.
- Deploy funcional, documentação de instalação/uso e testes essenciais.
- Remoção incremental, testada e rastreável dos fluxos antigos de geração, feedback e autenticação.
- Caracterização dos dois aplicativos, decisão controlada sobre dados legados e CI/deploy por subdiretório são requisitos técnicos de transição; não adicionam funcionalidade ao produto.

## Fora do escopo

Autenticação, OAuth, contas, perfis, professores identificados, turmas, escolas, alunos, dados de crianças, conteúdo privado, favoritos, avaliações, comentários, coleções, publicação por usuários, moderação, comunidade, MCP de escrita, histórico individual, personalização, BNCC estruturada, embeddings, busca/banco vetorial, marketplace, pagamentos e assinaturas.

## Privacidade e custo

- Não solicitar nem persistir nomes ou outros dados identificáveis de crianças.
- Não associar atividades a professores identificados.
- Evitar cookies e analytics no MVP; se indispensáveis, exigir decisão e documentação prévias.
- Não registrar corpos de requisição, prompts, IPs completos ou tokens. Configurar retenção mínima nos provedores.
- Não usar a OpenAI API, embeddings pagos ou outro serviço generativo pago no backend.
- Neon e Vercel podem ter custo de infraestrutura por uso; começar nos planos mínimos e monitorar limites.

## Critérios de conclusão

1. SDK, chamadas, endpoints, variáveis, mocks e documentação da integração generativa antiga foram removidos e uma auditoria de resíduos passa.
2. O fluxo normal não gera custo de OpenAI API no backend.
3. Angular e FastAPI executam e possuem testes essenciais.
4. PostgreSQL/Neon possui migrations e dados públicos para as três etapas.
5. Skills aprovadas estão instaláveis, documentadas e cobertas por casos reproduzíveis.
6. MCP read-only aprovado oferece busca e recuperação por ID, sem operações mutáveis.
7. ChatGPT consegue consultar as tools MCP em um smoke test documentado.
8. O site explica proposta, instalação, uso, exemplos e FAQ, sem autenticação ou chat.
9. Deploy e health check funcionam e não expõem secrets.
10. A hipótese pode ser avaliada com um roteiro de validação sem coletar dados pessoais.

## Checkpoints que bloqueiam implementação

- **CHECKPOINT-01 — Modelo de dados:** pendente.
- **CHECKPOINT-02 — Skills:** pendente.
- **CHECKPOINT-03 — MCP tools:** pendente.
- **CHECKPOINT-05 — destino dos dados legados:** pendente; bloqueia descarte/migração destrutiva, não a remoção de UI.

Nenhuma implementação dependente desses contratos deve começar antes da aprovação humana registrada em ADR.

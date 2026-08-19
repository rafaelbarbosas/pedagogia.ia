# CP05 — Destino dos dados legados

## Classificação
BLOQUEADO — checkpoint humano criado pela auditoria do backend.

## Contexto
O Git contém schema Supabase para perfis, atividades geradas, requisições anônimas/IP e feedback. Não há dump nem confirmação de registros em produção. O MVP novo não pode manter contas/dados pessoais por inércia, mas a auditoria não autoriza destruição.

## Decisão solicitada
Após inventário autorizado e sem copiar conteúdo sensível para o Git, escolher:
1. exportação segura e retenção temporária com prazo/responsável;
2. anonimização/migração apenas de conteúdo editorial comprovadamente reutilizável;
3. descarte controlado conforme política aplicável.

Registrar existência/volume/categoria, base e prazo de retenção, responsável, backup/rollback e autorização de DROP. A escolha não amplia o MVP e deve gerar ADR/consequência antes de P019/P017 destrutivo.

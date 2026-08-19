# Prompts executáveis e classificação pós-monorepo

| Prompt | Classificação | Motivo |
|---|---|---|
| P001, P002 | PRONTO PARA REVISÃO | Entregas antigas em REVIEW; não reexecutar. |
| CP01 | PRECISA REFINAMENTO | Deve considerar o schema Supabase legado; checkpoint continua humano. |
| CP02 | PRONTO | Backend não alterou as alternativas de Skills. |
| CP03 | PRECISA REFINAMENTO | Incluir transporte/deploy e compartilhamento com `backend/`. |
| P010 | PRONTO | Wave 1, caminhos Angular reais. |
| P011 | OBSOLETO COMO EXECUÇÃO | Auditoria foi reconciliada; entrega está em REVIEW. |
| P012 | PRONTO | Wave 2, agora paralelo com P016 após baselines. |
| P013 | FUTURO PRÓXIMO | Wave 3; refinar após remoção do gerador. |
| P015 | PRONTO | Novo baseline FastAPI da Wave 1. |
| P016 | PRONTO | Remoção backend da Wave 2. |
| P017 | FUTURO PRÓXIMO | Refinado em nível intermediário; condicionado a CP05 para dados. |
| CP05 | BLOQUEADO | Requer confirmação humana de dados/produção. |
| P018–P073 | FUTURO/MACRO | Refinar progressivamente após cada Wave/checkpoint. |

Antes de executar: releia código, documentos e ADRs; confirme dependências `DONE`; atualize para `IN_PROGRESS`. Ao terminar, registre evidências e proponha `REVIEW`, nunca `DONE`. Não execute automaticamente uma tarefa READY.

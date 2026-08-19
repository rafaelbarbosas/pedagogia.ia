# P017 — Remover autenticação, perfis e CRUD privado do backend

## Classificação
FUTURO PRÓXIMO — refinar após P016; não executar agora.

## Objetivo
Após a remoção generativa, retirar `/auth/*`, CRUD privado `/activities`, schemas/helpers Supabase exclusivos e logs sensíveis de `backend/api/main.py`, preservando dados físicos até decisão CP05/P019. P017 depende de P016; pode acompanhar P013 em branch separada. Não criar ainda a API pública alvo, migration, repository ou MCP. Testes devem provar a ausência das rotas e nenhuma rede real. Se CP05 não estiver decidido, endpoints podem ser removidos, mas nenhum DROP/limpeza de produção é autorizado.

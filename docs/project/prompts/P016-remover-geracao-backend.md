# P016 — Remover geração, feedback e controle de IP do backend

## Classificação
PRONTO — Wave 2, após P015.

## Objetivo
Eliminar do FastAPI a geração paga e persistências auxiliares, mantendo temporariamente apenas o legado auth/activities necessário à P017.

## Dependências e paralelo
P015 DONE. Executável em paralelo com P012 (`frontend/`), mas P016 e P017 são sequenciais porque compartilham `backend/api/main.py`.

## Remoção exata
- Rotas `POST /gerar` e `POST /feedback`.
- `PromptRequest`, `FeedbackRequest`, prompt pedagógico, corpo `gpt-4`, `OPENAI_API_KEY`, `OPENAI_API_URL` e chamada HTTP OpenAI.
- `resolve_client_ip`, `is_logged_user`, `count_anonymous_requests` e imports exclusivos (`date`, `timedelta`, `urlencode`, `Literal` se não restar uso).
- Referências planejadas às tabelas `anonymous_requests` e `feedback`; **não executar DROP**. O destino físico pertence a P019/CP05.
- Reavaliar `httpx`, mas mantê-lo enquanto Supabase/auth ainda o usar.

## Restrições
Não criar gerador substituto, MCP, health, repository ou migration; não remover auth/activities; não tocar dados/produção; não mascarar logs que P017 ainda precise caracterizar.

## Aceite e comandos
- Atualizar testes de caracterização para provar 404/ausência no OpenAPI e preservar rotas temporárias.
- `python -m pytest backend/tests`
- `python -m compileall backend/api backend/tests`
- `rg -n -i 'openai|gpt-4|OPENAI_API_KEY|OPENAI_API_URL|/gerar|/feedback|anonymous_requests' backend --glob '!*.md'` não encontra código ativo; resíduos SQL ficam classificados até P019.
- Atualizar backlog/arquitetura e mover P016 a REVIEW, nunca DONE.

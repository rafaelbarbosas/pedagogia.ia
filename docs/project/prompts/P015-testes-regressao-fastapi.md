# P015 — Baseline e testes de caracterização FastAPI

## Classificação
PRONTO — Wave 1.

## Objetivo
Criar rede mínima de segurança para retirar o legado de `backend/api/main.py`, sem chamar OpenAI, Supabase ou rede real.

## Dependências
P001 e P002 em DONE. Paralelo com P010; não iniciar nesta reconciliação.

## Escopo real
- `backend/api/main.py`, `backend/requirements.txt` e novos testes sob `backend/tests/`.
- Caracterizar app/rotas e contratos de `/gerar`, `/feedback`, `/auth/*` e `/activities` apenas no necessário para provar posterior remoção.
- Isolar com mocks `httpx.AsyncClient`/helpers Supabase; nunca depender de secrets.
- Registrar baseline de importação e ausência atual de `/health`.

## Passos
1. Marcar P015 IN_PROGRESS e criar ambiente Python isolado.
2. Fixar dependências de teste de forma mínima e justificada (pytest/TestClient ou transporte ASGI compatível).
3. Testar OpenAPI/rotas, validação Pydantic, CORS/configuração segura e pelo menos um erro de integração mockado.
4. Impedir chamadas externas por fixture autouse ou mocks explícitos.
5. Não modularizar produção nem corrigir funcionalidades além do indispensável ao harness.
6. Rodar testes e import/compile; mover a REVIEW, nunca DONE.

## Aceite e comandos
- `python -m compileall backend/api backend/tests`
- `python -m pytest backend/tests`
- Testes determinísticos sem `OPENAI_API_KEY`, Supabase ou internet.
- Achados de segurança ficam documentados; nenhuma funcionalidade MVP é implementada.

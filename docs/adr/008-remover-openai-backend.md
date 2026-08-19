# ADR-008 — Remover OpenAI API do backend

- **Status:** Aceita
- **Data:** 2026-08-19

## Contexto

O princípio de custo exige que a geração ocorra no ChatGPT do professor.

## Decisão

Remover incrementalmente SDK, chamadas, endpoints, configurações, testes e documentação generativa do backend.

## Consequências

Elimina custo variável de geração. A auditoria localizou HTTP direto à OpenAI em `backend/api/main.py`, além do fluxo consumidor Angular; a remoção só será confirmada após P012, P016 e a auditoria de resíduos P014.

## Alternativas rejeitadas

Qualquer alternativa que contradiga a decisão definida pelo produto foi rejeitada para o MVP. Reabertura exige impedimento técnico grave e novo registro humano.

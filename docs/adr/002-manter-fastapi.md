# ADR-002 — Manter Python + FastAPI

- **Status:** Aceita
- **Data:** 2026-08-19

## Contexto

FastAPI é a tecnologia definida e já existe em `backend/api/main.py`, atualmente como aplicação monolítica legada.

## Decisão

Manter e adaptar o backend Python + FastAPI no monorepo.

## Consequências

O código existente será modularizado incrementalmente para API, health e domínio compartilhado com MCP; não se justifica reescrita ou microserviço por padrão.

## Alternativas rejeitadas

Qualquer alternativa que contradiga a decisão definida pelo produto foi rejeitada para o MVP. Reabertura exige impedimento técnico grave e novo registro humano.

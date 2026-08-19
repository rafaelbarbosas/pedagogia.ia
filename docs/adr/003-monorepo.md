# ADR-003 — Usar monorepo

- **Status:** Aceita
- **Data:** 2026-08-19

## Contexto

Frontend, backend, Skills, MCP e documentação precisam evoluir com contratos rastreáveis.

## Decisão

Manter todas as partes do produto em um único repositório.

## Consequências

Facilita mudanças coordenadas e fonte de verdade; requer organização clara e CI por área. A consolidação foi realizada com `frontend/` e `backend/`; deploys e referências ao host antigo ainda precisam de validação incremental.

## Alternativas rejeitadas

Qualquer alternativa que contradiga a decisão definida pelo produto foi rejeitada para o MVP. Reabertura exige impedimento técnico grave e novo registro humano.

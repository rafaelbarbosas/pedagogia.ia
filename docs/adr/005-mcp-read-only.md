# ADR-005 — MCP read-only no MVP

- **Status:** Aceita
- **Data:** 2026-08-19

## Contexto

O ChatGPT precisa consultar o acervo, mas escrita traz identidade, autorização e moderação.

## Decisão

Expor somente tools MCP de leitura no MVP.

## Consequências

Reduz risco e escopo; testes devem provar ausência de mutação. Escrita exige novo checkpoint futuro.

## Alternativas rejeitadas

Qualquer alternativa que contradiga a decisão definida pelo produto foi rejeitada para o MVP. Reabertura exige impedimento técnico grave e novo registro humano.

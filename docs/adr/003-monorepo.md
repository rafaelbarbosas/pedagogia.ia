# ADR-003 — Usar monorepo

- **Status:** Aceita
- **Data:** 2026-08-19

## Contexto

Frontend, backend, Skills, MCP e documentação precisam evoluir com contratos rastreáveis.

## Decisão

Manter todas as partes do produto em um único repositório.

## Consequências

Facilita mudanças coordenadas e fonte de verdade; requer organização clara e CI por área. O estado atual ainda é de dois repositórios, com o backend em `pedagogia.ia-api`; a decisão não autoriza uma cópia ou reescrita imediata. A consolidação deverá preservar rastreabilidade, considerar o histórico Git e planejar a transição dos deploys depois da auditoria do backend.

## Alternativas rejeitadas

Qualquer alternativa que contradiga a decisão definida pelo produto foi rejeitada para o MVP. Reabertura exige impedimento técnico grave e novo registro humano.

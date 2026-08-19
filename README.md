# Pedagogia.IA

Monorepo do Pedagogia.IA.

## Estrutura atual

```text
.
├── frontend/  # Angular 19 (site e fluxos legados em transição)
├── backend/   # FastAPI + schema Supabase legados em transição
└── docs/      # planejamento, prompts e decisões arquiteturais
```

O estado implementado e o alvo são diferentes. Leia primeiro [`docs/project/ARCHITECTURE.md`](docs/project/ARCHITECTURE.md), [`docs/project/BACKLOG.md`](docs/project/BACKLOG.md) e a [auditoria pós-monorepo](docs/project/BACKLOG-FINDINGS.md). Skills e MCP ainda não existem.

## Desenvolvimento

Frontend:

```bash
cd frontend
npm ci
npm start
```

Backend (local, sem executar integrações externas sem configuração segura):

```bash
cd backend
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn api.main:app --reload
```

As configurações Vercel são específicas de cada subdiretório; os respectivos projetos precisam usar `frontend` e `backend` como Root Directory.

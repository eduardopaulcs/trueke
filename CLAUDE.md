# Trueke

Argentine marketplace platform for feria (street market) vendors and visitors.
Core value: answer "which vendors will be at this feria this weekend?" — a question no existing platform answers.

## Monorepo structure

```
trueke/
├── web/    → React + Vite + TypeScript + Tailwind (frontend)
└── api/    → NestJS + TypeScript + Prisma (backend REST)
```

See `web/CLAUDE.md` and `api/CLAUDE.md` for per-project details.

## Key commands

> **CRITICAL: ALL `npm`, `npx`, and `prisma` commands MUST run inside the Docker container — for both `api/` and `web/`.**
> Never run them on the host. Always use:
> ```bash
> docker compose exec api <command>
> docker compose exec web <command>
> ```

```bash
# API
docker compose exec api npm run start:dev
docker compose exec api npm run typecheck
docker compose exec api npx prisma migrate dev

# Web
docker compose exec web npm run dev
docker compose exec web npm run typecheck
```

## Domain model

- **User**: single registration. Roles accumulate: `visitor` → `vendor` → `organizer`
- **Market**: a street market. Has location, schedule (recurring or specific dates), status (`unverified` | `active` | `inactive`)
- **Attendance**: a vendor confirming attendance at a market on a specific date. This is the core differentiating entity.
- **Follow**: a visitor following a vendor to receive email notifications when that vendor confirms an attendance

## Role system

All users start as `visitor`. Roles are additive — a `vendor` also has all `visitor` capabilities.
- Activate `vendor` role: fill in vendor profile (brand name, categories, description)
- Activate `organizer` role: claim a feria (manual admin verification in MVP)

## MVP scope

In: auth, user roles, market CRUD, vendor profile, attendance confirm/cancel, market search, market public calendar, follow vendor, email notifications on attendance
Out: push notifications (PWA), paid plans, photo gallery, reviews, analytics

## Deploy

- `web/` → Vercel (watch path: `web/`)
- `api/` → Railway (watch path: `api/`)
- PostgreSQL + Redis → Railway

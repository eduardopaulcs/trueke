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

## Specialized agents

Eight sub-agents live in `.claude/agents/`. **Always prefer delegating to a specialized agent over handling the task inline** — they carry full context about conventions, patterns, and project architecture for their domain.

### API agents

| Agent | When to use |
|---|---|
| `api-architect` | Design new NestJS modules, endpoints, DTOs, Prisma schema changes |
| `api-reviewer` | Read-only code review: quality, security, English docs, convention audit |
| `api-standards` | Research and apply NestJS/Prisma/REST/security best practices |
| `api-tester` | Write Jest unit and integration tests for services and controllers |

### Web agents

| Agent | When to use |
|---|---|
| `web-architect` | Design new React pages, hooks, services, schemas, and components |
| `web-reviewer` | Read-only code review: architecture compliance, security, convention audit |
| `web-standards` | Research and apply React/Vite/Tailwind/PWA/accessibility best practices |
| `web-tester` | Scaffold Vitest + React Testing Library tests for hooks and components |

**Examples of when to invoke an agent:**
- Adding a new module → `api-architect`
- Reviewing a PR → `api-reviewer` + `web-reviewer`
- Upgrading a library → `api-standards` or `web-standards`
- Writing tests after a feature → `api-tester` or `web-tester`
- Building a new page from scratch → `web-architect`

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
- **Attendance**: a vendor confirming or cancelling presence at a market on a specific date (`confirmed: boolean`). This is the core differentiating entity.
- **Follow**: a visitor following a vendor to receive email notifications when that vendor confirms an attendance

## Role system

All users start as `visitor`. Roles are additive — a `vendor` also has all `visitor` capabilities.
- Activate `vendor` role: fill in vendor profile (brand name, categories, description)
- Activate `organizer` role: claim a feria (manual admin verification in MVP)

## Auth

Auth is HttpOnly cookie-based. The frontend never sees or stores the JWT.

- `POST /auth/register` and `POST /auth/login` — set an `access_token` HttpOnly cookie and return the `User` object
- `POST /auth/logout` — clears the cookie, returns 204
- `JwtAuthGuard` is global (all routes require auth by default)
- `@Public()` — skips auth entirely (e.g. landing page assets)
- `@OptionalAuth()` — attempts auth but does not reject if no cookie is present; sets `req.user = null` (e.g. `GET /brands`)

## MVP scope

In: auth, user roles, market CRUD, vendor profile, attendance confirm/cancel, market search, market public calendar, follow vendor, email notifications on attendance
Out: push notifications (PWA), paid plans, photo gallery, reviews, analytics

## Deploy

- `web/` → Vercel (watch path: `web/`)
- `api/` → Railway (watch path: `api/`)
- PostgreSQL + Redis → Railway

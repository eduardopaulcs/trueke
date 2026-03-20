# api/ — Backend

NestJS + TypeScript + Prisma + PostgreSQL + BullMQ + Redis

## Commands

> All commands must run inside the Docker container — never on the host.

```bash
docker compose exec api npm run start:dev       # dev server with watch
docker compose exec api npm run build           # production build
docker compose exec api npm run start:prod      # run production build
docker compose exec api npm run typecheck       # tsc --noEmit
docker compose exec api npm run lint            # eslint
docker compose exec api npx prisma migrate dev  # run migrations
docker compose exec api npx prisma migrate deploy  # deploy migrations (production)
docker compose exec api npx prisma studio       # open Prisma Studio
```

## Stack

- **NestJS 11** — framework
- **Prisma 7** + `@prisma/adapter-pg` — ORM with PostgreSQL driver adapter
- **PostgreSQL** — main database
- **BullMQ** — job queues
- **Redis** — BullMQ broker
- **Passport.js** + **JWT** — authentication
- **class-validator** + **class-transformer** — DTO validation
- **Nodemailer** — email sending

## Module structure

```
src/
├── app.module.ts
├── main.ts
├── auth/           → register, login, JWT strategy
├── users/          → profile, role activation
├── brands/         → vendor brand profiles
├── markets/        → market CRUD and search
├── attendances/    → confirm/cancel vendor attendance
├── locations/      → geographic hierarchy (country → province → city)
├── notifications/  → BullMQ jobs for email notifications
├── prisma/         → PrismaService
└── common/         → shared infrastructure (always in subdirectories)
    ├── decorators/
    ├── dto/
    ├── filters/
    ├── guards/
    ├── interceptors/
    ├── selects/
    ├── utils/
    └── validators/
```

## Environment variables

```
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=...
JWT_EXPIRES_IN=7d
MAIL_HOST=...
MAIL_PORT=...
MAIL_USER=...
MAIL_PASS=...
FRONTEND_URL=http://localhost:5173
```

## API conventions

- REST: `GET /api/v1/markets`, `POST /api/v1/markets/:id/attendances`, etc.
- All responses: `{ data: T }` (wrapped by ResponseInterceptor automatically — never wrap manually)
- Paginated responses: `{ data: { items: T[], pagination: { page, limit, total, pages } } }`
- Errors: `{ error: { statusCode, message } }`
- Semantic HTTP errors: 400, 401, 403, 404, 409, 500
- Auth via Bearer JWT header

## Key conventions

- **Soft deletes**: all models have `deletedAt DateTime?`; always filter `{ deletedAt: null }` in queries
- **common/ subdirectories**: files in `src/common/` must always be inside a named subdirectory — never at the root of common/
- **Pagination**: use `$transaction([count, findMany])` + `paginate(dto)` + `paginatedResponse(data, total, dto)`
- **Ownership checks**: fetch entity first, throw `ForbiddenException` if `ownerId !== userId`
- **Async email**: always enqueue a BullMQ job — never send email synchronously
- **English**: all code and comments in English

## Notes

- Guards: `JwtAuthGuard` (global, authenticated), `RolesGuard` (global, role-based)
- `@Public()` marks routes that skip JwtAuthGuard
- `@Roles('vendor')` restricts routes to that role
- Roles are stored as a `String[]` on the User model and are additive: `['visitor', 'vendor']`
- Role granting uses a raw SQL `ARRAY(SELECT DISTINCT unnest(roles))` deduplication query

## Specialized agents

Four sub-agents are available in `.claude/agents/` for targeted tasks:

| Agent | When to use |
|---|---|
| `api-architect` | Design new modules, endpoints, DTOs, Prisma schema changes |
| `api-standards` | Research NestJS/Prisma/security best practices and apply them |
| `api-reviewer` | Read-only code review: quality, security, convention audit |
| `api-tester` | Write Jest unit and integration tests for services/controllers |

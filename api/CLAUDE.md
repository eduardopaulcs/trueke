# api/ — Backend

NestJS + TypeScript + Prisma + PostgreSQL + BullMQ + Redis

## Commands

```bash
npm run start:dev    # dev server with watch at localhost:3000
npm run build        # production build
npm run start:prod   # run production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npx prisma migrate dev       # run migrations
npx prisma migrate deploy    # deploy migrations (production)
npx prisma studio            # open Prisma Studio
```

## Stack

- **NestJS 10** — framework
- **Prisma** — ORM
- **PostgreSQL** — main database
- **BullMQ** — job queues
- **Redis** — BullMQ broker
- **Passport.js** + **JWT** — authentication
- **class-validator** + **class-transformer** — DTO validation
- **Nodemailer** — email sending

## Module structure

```
src/modules/
├── auth/           → register, login, JWT strategy, guards
├── users/          → profile, role activation
├── markets/        → market CRUD, search, claim
├── attendances/    → confirm/cancel vendor attendance
└── notifications/  → BullMQ jobs for email notifications
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

- REST: `GET /markets`, `POST /markets/:id/attendances`, etc.
- All responses: `{ data, meta?, error? }`
- Semantic HTTP errors: 400, 401, 403, 404, 409, 500
- Auth via Bearer JWT header
- DTOs for all request bodies with class-validator decorators

## Notes

- Guards: `JwtAuthGuard` (authenticated), `RolesGuard` (role-based)
- Roles are stored as a string array on the User model: `['visitor', 'vendor']`
- Jobs are fired in the `attendances` module when an attendance is confirmed
- Never send emails synchronously — always via BullMQ job

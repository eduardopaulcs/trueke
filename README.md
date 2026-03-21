# Trueke

Argentine marketplace for street market (feria) vendors and visitors.

**Core question it answers:** which vendors will be at this feria this weekend?

---

## Stack

| | |
|---|---|
| **Frontend** | React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router v7 · TanStack Query v5 |
| **Backend** | NestJS 11 · TypeScript · Prisma 7 · PostgreSQL |
| **Queue** | BullMQ · Redis |
| **Auth** | Passport.js · JWT · HttpOnly cookies |
| **Dev environment** | Docker Compose |

---

## Getting started

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose

### Setup

```bash
# 1. Clone and enter the repo
git clone https://github.com/eduardopaulcs/trueke.git
cd trueke

# 2. Create environment files
cp api/.env.example api/.env
cp web/.env.example web/.env
# Edit .env files as you please

# 3. Start everything
./bin/dev.sh

# 4. On first run, apply database migrations (in a separate terminal)
./bin/migrate.sh --name init
```

| Service | URL |
|---------|-----|
| Web | http://localhost:5173 |
| API | http://localhost:3000 |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |

---

## Scripts

| Script | Description |
|--------|-------------|
| `./bin/dev.sh` | Start all services with Docker Compose |
| `./bin/migrate.sh` | Run Prisma migrations inside the API container |
| `./bin/shell.sh` | Open a shell inside the API container |

---

## Project structure

```
trueke/
├── api/              # NestJS backend
│   ├── prisma/       # Database schema and migrations
│   ├── src/
│   │   ├── auth/           # Register, login, logout, JWT strategy
│   │   ├── users/          # Profile, role activation
│   │   ├── brands/         # Vendor brand profiles
│   │   ├── markets/        # Market CRUD and search
│   │   ├── attendances/    # Confirm/cancel vendor attendance
│   │   ├── locations/      # Geographic hierarchy
│   │   ├── notifications/  # BullMQ jobs for email notifications
│   │   └── common/         # Guards, decorators, interceptors, utils
│   └── .env.example
├── web/              # React frontend
│   ├── src/
│   │   ├── lib/        # Axios client, QueryClient, query key factory, date utils
│   │   ├── errors/     # AppError class, HTTP → Spanish message mapping
│   │   ├── types/      # Domain types
│   │   ├── services/   # API adapters — one file per domain
│   │   ├── stores/     # AuthProvider (cookie-based session)
│   │   ├── hooks/      # TanStack Query wrappers, useAuth()
│   │   ├── router/     # createBrowserRouter, ProtectedRoute
│   │   ├── schemas/    # Zod validation schemas
│   │   ├── components/ # Reusable UI components
│   │   └── pages/      # Route-level compositions
│   └── .env.example
└── bin/              # Dev scripts
```

---

## Domain model

- **User** — single registration, additive roles: `visitor` → `vendor` → `organizer`
- **Market** — a street market with location, schedule, and status
- **Attendance** — a vendor confirming or cancelling presence at a market on a specific date (`confirmed: boolean`). This is the core entity.
- **Follow** — a visitor following a vendor to get email notifications

---

## Environment variables

### `api/.env`

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `JWT_SECRET` | Secret for signing JWT tokens |
| `JWT_EXPIRES_IN` | Token expiry — session lasts until logout (e.g. `365d`) |
| `MAIL_HOST` | SMTP host |
| `MAIL_PORT` | SMTP port |
| `MAIL_USER` | SMTP user |
| `MAIL_PASS` | SMTP password |
| `MAIL_FROM` | Sender address |
| `FRONTEND_URL` | Used for CORS and email links |

### `web/.env`

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL for API requests (e.g. `http://localhost:3000/api/v1`) |

> Auth is cookie-based. The frontend never handles the JWT — it is stored in an HttpOnly cookie set by the API on login/register and cleared on logout.

---

## Deploy

- **web/** → [Vercel](https://vercel.com) (watch path: `web/`)
- **api/** → [Railway](https://railway.app) (watch path: `api/`)
- **PostgreSQL + Redis** → Railway

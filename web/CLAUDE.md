# web/ — Frontend

React + Vite + TypeScript + Tailwind CSS PWA

## Commands

> All commands must run inside the Docker container — never on the host.

```bash
docker compose exec web npm run dev          # dev server at localhost:5173
docker compose exec web npm run build        # production build
docker compose exec web npm run preview      # preview production build
docker compose exec web npm run typecheck    # tsc --noEmit
docker compose exec web npm run lint         # eslint
```

## Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite 7** — build tool with `vite-plugin-pwa`
- **Tailwind CSS v4** — utility styling
- **React Router v7** — routing (`createBrowserRouter`)
- **TanStack Query v5** — all server state
- **Axios** — HTTP client (`withCredentials: true`, base URL from `VITE_API_URL`)
- **React Hook Form** + **Zod v4** — forms and validation
- **Phosphor Icons** — icon library (`@phosphor-icons/react`)

## Architecture

The frontend is backend-agnostic. Components never call the API directly — all HTTP concerns are isolated in the infrastructure layers below.

```
lib/         → infrastructure: axios client, QueryClient, query key factory, date utils
errors/      → error domain: AppError class, HTTP → Spanish message mapping
types/       → frontend-owned domain types (mirror API but decoupled from it)
services/    → API adapters: one file per domain, import http from lib/axios
stores/      → client state: auth context (user, isAuthenticated, login/logout/register)
hooks/       → application layer: TanStack Query wrappers, business logic
router/      → routing: createBrowserRouter, ProtectedRoute guard
schemas/     → Zod validation schemas: one file per domain, used in forms
components/  → reusable UI components (generic, usable across pages)
pages/       → route-level compositions
```

### Invariants

- `lib/` never imports from `stores/`, `hooks/`, or `services/`
- Components and pages never import from `services/` — only from `hooks/`
- User-visible error messages come only from `errors/error-mapper.ts`
- Raw backend error strings are silently discarded
- All date formatting goes through `lib/date.ts` — never inline

## Error handling

All HTTP errors are caught in `lib/axios.ts` and converted to `AppError` instances. The mapper in `errors/error-mapper.ts` translates status codes + URL context into friendly Spanish messages.

```typescript
// In components, read the user-facing message from AppError:
if (isAppError(error)) {
  showToast(error.userMessage); // always Spanish, always safe
}
```

Never propagate raw API error messages to the UI.

## Auth

Auth is cookie-based (HttpOnly). The frontend never sees or manages the token.

- **`useAuth()`** — returns `{ user, isAuthenticated, isLoading, login, register, logout }`
- **`user`** — the full `User` object, populated by `GET /users/me` on mount
- **`isLoading`** — `true` while the initial session check is in flight (use to avoid premature redirects)
- **`isAuthenticated`** — `true` once session check completes and user is present
- **`login(email, password)`** — async; server sets cookie and returns User
- **`logout()`** — async; calls `POST /auth/logout` server-side, then clears query cache

Role checks use the `user` object directly:
```typescript
const { user } = useAuth();
if (user?.roles.includes('vendor')) { ... }
```

## State management

- **Server state**: always via TanStack Query. No `useState` for remote data.
- **Client state**: `useAuth()` for auth user and session state.
- Query keys are centralized in `lib/query-keys.ts` — always use `queryKeys.*` factories, never raw strings.

## Date formatting

The backend always returns dates as full UTC ISO strings (`"2024-11-15T00:00:00.000Z"`). Use `lib/date.ts` — never format dates inline.

```typescript
import { toDateString, formatDate, formatDateTime } from '@/lib/date';

toDateString(attendance.date)   // "2024-11-15"       (for @db.Date fields)
formatDate(market.createdAt)    // "15 de noviembre de 2024"
formatDateTime(brand.createdAt) // "15/11/2024, 10:30"
```

## Service conventions

Services are thin typed wrappers. They receive typed inputs and return typed domain objects. The axios interceptor unwraps `{ data: T }` → `T` automatically.

```typescript
// Correct — use a hook that wraps the service
const { data } = useQuery({
  queryKey: queryKeys.brands.detail(id),
  queryFn: () => brandsService.findOne(id),
});

// Wrong — never call services directly in components
const brand = await brandsService.findOne(id); // ❌
```

## Component organization

- **Reusable / generic** → `src/components/`
- **Page-specific** → `src/pages/[page-name]/components/`

Keep components focused. If a component grows beyond ~150 lines, split it.

## Forms

Use React Hook Form with `zodResolver`. Schemas live in `src/schemas/`.

```typescript
const form = useForm<LoginFormValues>({
  resolver: zodResolver(loginSchema),
});
```

## Design tokens

Defined in `tailwind.config.ts`:

| Token | Value | Usage |
|---|---|---|
| `primary` | `#C84B2F` | Main CTA, active states |
| `primary-dark` | `#8B3420` | Hover on primary |
| `primary-light` | `#F5D5CC` | Subtle highlights |
| `green-brand` | `#3A6B2A` | Positive states |
| `amber-brand` | `#D4890A` | Warnings, pending |
| `cream` | `#FAF4EC` | Page background |
| `ink` | `#1C1508` | Body text |
| `muted` | `#6B5B4A` | Secondary text |

Fonts: **Syne** (headings, weight 800) · **DM Sans** (body)

Utility classes defined in `index.css`: `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.tag`, `.tag-primary`, `.tag-active`, `.tag-pending`, `.card`

## Environment variables

```
VITE_API_URL=http://localhost:3000/api/v1
```

## PWA

`manifest.json` and service worker are configured in `vite.config.ts` via `vite-plugin-pwa`. The app must be installable on mobile. Push notifications are out of MVP scope.

## Notes

- Attendance cancellation: upsert with `confirmed: false` via `attendancesService.upsert(marketId, { date, confirmed: false })`. There is no DELETE endpoint.
- The `MarketSchedule` type is intentionally opaque (`Record<string, unknown>`) until the schedule format is formalized.

## Specialized agents

Four sub-agents are available in `.claude/agents/` for targeted tasks:

| Agent | When to use |
|---|---|
| `web-architect` | Design new pages, hooks, services, schemas, and components |
| `web-standards` | Research React/Vite/Tailwind/PWA/accessibility best practices and apply them |
| `web-reviewer` | Read-only code review: architecture, security, convention audit |
| `web-tester` | Scaffold Vitest + React Testing Library tests for hooks, components, services |

# web/ — Frontend

React + Vite + TypeScript + Tailwind CSS

## Commands

```bash
npm run dev          # dev server at localhost:5173
npm run build        # production build
npm run preview      # preview production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
```

## Stack

- **React 18** + **TypeScript** (strict mode)
- **Vite** — build tool
- **Tailwind CSS** — styling
- **React Router v6** — routing
- **TanStack Query v5** — server state, data fetching
- **Axios** — HTTP client (base URL from `VITE_API_URL`)
- **React Hook Form** + **Zod** — forms and validation

## Structure

```
src/
├── components/     → reusable UI components
├── pages/          → route-level components
├── hooks/          → custom React hooks
├── services/       → API calls (axios wrappers)
├── stores/         → client state if needed
└── types/          → shared TypeScript types
```

## Environment variables

```
VITE_API_URL=http://localhost:3000
```

## PWA

`manifest.json` and a basic service worker are configured from day one.
The app must be installable on mobile. Push notifications are out of MVP scope.

## Notes

- All API calls go through `src/services/` — never call axios directly in components
- Use TanStack Query for all server state — no useState for remote data
- Domain entity names in English (Market, Vendor, Attendance, Follow)
- Code (variables, functions, components) in English

# Backend TODOs for the frontend

Required changes in `api/` for the frontend to work correctly.

---

## HttpOnly cookie authentication

The frontend assumes the backend manages sessions via a single HttpOnly cookie. No refresh token or second cookie is needed — the standard approach for a session-based web app is one long-lived cookie.

### Dependencies
- [ ] Install `cookie-parser` and its types (`npm install cookie-parser @types/cookie-parser`)

### Bootstrap (`main.ts`)
- [ ] Register `cookieParser()` as global middleware (`app.use(cookieParser())`)
- [ ] Update CORS: add `credentials: true` and ensure `origin` is the explicit value of `FRONTEND_URL` (cannot be `*` when `credentials: true`)

### JWT Strategy (`auth/strategies/jwt.strategy.ts`)
- [ ] Change token extraction from `fromAuthHeaderAsBearerToken()` to `fromExtractors([req => req.cookies?.access_token])` (or whichever cookie name is defined)

### Auth endpoints (`auth/auth.controller.ts` + `auth/auth.service.ts`)
- [ ] `POST /auth/login` — instead of returning `{ accessToken }`, set the HttpOnly cookie and return the full `User` object
- [ ] `POST /auth/register` — same as login
- [ ] `POST /auth/logout` — new endpoint: clear the cookie and return 204

### Session lifetime
- [ ] Set `JWT_EXPIRES_IN` to a longer value (e.g. `30d`) — when the cookie expires the user simply logs in again, no refresh mechanism needed

---

## Brands — `isFollowing` field

The frontend displays the authenticated user's follow status on brand lists and detail views.

- [ ] `GET /brands` — include `isFollowing: boolean` on each item, computed from whether the authenticated user follows the brand (always `false` for anonymous requests)
- [ ] `GET /brands/:id` — same

---

## User select — remove `deletedAt`

`deletedAt` is a soft-delete implementation detail and should not be exposed in the public API.

- [ ] `common/selects/user.select.ts` — remove `deletedAt: true` from `userPublicSelect`

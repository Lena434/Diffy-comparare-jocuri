# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Diffy** is a game comparison and rating platform. It is a full-stack application:
- **Backend**: C# .NET 8 Web API (`Diffy.Api`, `Diffy.BusinessLayer`, `Diffy.DataAccessLayer`, `Diffy.Domain`)
- **Frontend**: React 19 + TypeScript SPA (`web-frontend/`)
- **Database**: PostgreSQL via Entity Framework Core 8

The backend runs on `http://localhost:5258`. The frontend Axios client has this URL hardcoded in `web-frontend/src/axios/axios-provider.tsx`.

---

## Commands

### Frontend (`web-frontend/`)

```bash
cd web-frontend
npm run dev        # Start Vite dev server with HMR
npm run build      # Type-check (tsc) then production bundle
npm run lint       # ESLint check
npm run preview    # Preview production build
```

### Backend

```bash
cd Diffy.Api
dotnet run         # Start API on http://localhost:5258
dotnet build       # Build solution
```

### Database

EF Core migrations are in `Diffy.DataAccessLayer/Migrations/`. Apply with:
```bash
cd Diffy.DataAccessLayer
dotnet ef database update
```

---

## Architecture

### Backend Layers

| Project | Role |
|---|---|
| `Diffy.Api` | Controllers, JWT config, CORS, Swagger, `Program.cs` startup |
| `Diffy.BusinessLayer` | Business logic, interfaces |
| `Diffy.DataAccessLayer` | EF Core `DiffyDbContext`, repositories, migrations |
| `Diffy.Domain` | Entity classes, DTOs |

**Auth flow**: `AuthController` issues JWT tokens → frontend stores token in `sessionStorage` → Axios request interceptor injects `Authorization: Bearer {token}` header → JWT middleware validates on each request.

**Password hashing**: BCrypt (not plaintext).

**CORS**: Allowed origins are configurable via `appsettings.json`. Credentials are allowed.

**API conventions**: POST returns 201, DELETE/PUT returns 204, missing resources return 404, all controllers use try-catch.

### Frontend Structure (`web-frontend/src/`)

**State management** — Context API only (no Redux):
- `AuthContext`: Login/signup, token persistence in `sessionStorage`, user profile
- `FavoritesContext`: Favorite games (API-backed) + saved comparisons (per-user `localStorage`)
- `ThemeContext`: Dark mode toggle
- `SidebarContext`: Mobile sidebar visibility

**Routing** (`routes/`):
- `routes.ts`: Single source of truth for all route paths
- `Guard.tsx`: Protects routes by auth status or role (`user` / `admin`)

**API layer** (`axios/`):
- `axios-provider.tsx`: Creates the Axios instance; response interceptors auto-redirect on 401/403/500
- `apiRoutes.ts`: Centralized endpoint strings for Auth, Users, Games, Genres, Platforms, Ratings, Favorites, Profile
- `context.ts`: `useAxios()` hook to access the typed API client anywhere

**Services** (`services/`):
- `gameService.ts`: Exposes a `useGameService()` hook with `useCallback`-wrapped API calls (getAll, getById, getByIds, getSimilar, CRUD, genre/platform/gameMode management)
- `authService.ts`: Helpers to read current user and token from `sessionStorage`

**Pages** (`pages/`):
- Public: `HomePage`, `GameListPage`, `GameDetailsPage`, `ComparePage`, `FavoritesPage`, `AboutPage`
- Auth: `LoginPage`, `SignUpPage`, `ProfilePage`
- Admin (`pages/admin/`): `Dashboard`, `Users`, `UserDetail`, `Games`, `GameDetail`, `GameData`, `Comparisons`, `Settings`
- Errors (`pages/error/`): 401, 403, 404, 500

**Styling**: Tailwind CSS 3.4 with a custom arcade theme (neon pink, purple, cyan, green palette). PostCSS + Autoprefixer.

**Build tooling**: Vite 7 with the SWC plugin (no Babel). TypeScript strict mode, `noUnusedLocals`, `noUnusedParameters` are enforced.

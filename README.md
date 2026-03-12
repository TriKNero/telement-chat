# Telement — Posts SPA

React + TypeScript SPA that fetches posts from a public REST API, displays a list with detail view, and preserves list state when navigating back.

## API

[JSONPlaceholder](https://jsonplaceholder.typicode.com):

- `GET /posts` — list of 100 posts
- `GET /posts/:id` — single post
- `GET /posts/:id/comments` — comments for a post
- `GET /users/:id` — author info

## Run

```bash
npm install
npm run dev
```

## Test

```bash
npm run test
```

## GitHub Pages

**Option 1 — automatic (recommended):**

1. Push to GitHub
2. Settings → Pages → Source: **GitHub Actions**
3. Push to `main` — workflow builds and deploys

**Option 2 — manual:**

```bash
npm run deploy
```

Requires `base` in `vite.config.ts` to match repo name (e.g. `/telement/` for `user.github.io/telement`). For a different repo name, set `VITE_BASE=/your-repo/` before build.

## Docker

```bash
docker build -t telement .
docker run -p 8080:80 telement
```

Open http://localhost:8080

## Architecture

### State Management (React Query)

TanStack React Query is used for server state:

- **Caching** — list and detail data cached for 5 min (`staleTime`), so returning to the list does not reload
- **Loading/error** — `isLoading`, `isError`, `error` in hooks; skeletons and `ErrorFallback` with retry in UI
- **Retry** — 2 retries on transient failures

No Redux/Zustand — React Query covers server state; local UI state (drawer, theme) in React state/context.

### Layer Separation

```
src/
  api/          — HTTP layer: typed fetch, getPosts, getPost, etc.
  types/        — Post, Comment, User interfaces
  hooks/        — React Query wrappers (usePosts, usePost)
  components/   — presentational UI
  pages/        — route-level components
```

- **api/** — knows about HTTP, base URL, errors
- **hooks/** — knows about React Query, query keys, staleTime
- **components/** — receive data via props, no API calls
- **types/** — shared models for API responses

### Typing

- `Post`, `Comment`, `User` in `types/` (post.ts, comment.ts, user.ts)
- API functions return `Promise<Post>`, `Promise<Post[]>`, etc.
- Zod schemas validate API responses at runtime (`api/schemas.ts`)

### Responsive

- **Desktop (≥900px)** — sidebar + detail panel
- **Mobile (<900px)** — drawer for list, full-width detail; swipe right to open list

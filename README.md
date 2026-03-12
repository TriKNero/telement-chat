# Telement — Posts SPA

React + TypeScript SPA that fetches posts from a public REST API, displays a list with detail view, and preserves list state when navigating back.

## API

[JSONPlaceholder](https://jsonplaceholder.typicode.com):

- `GET /posts` — list of 100 posts
- `GET /posts/:id` — single post
- `GET /posts/:id/comments` — comments for a post
- `GET /users/:id` — author info

## Run

### Terminal

```bash
npm install
npm run dev
```

Open http://localhost:5173

### Docker

```bash
docker build -t telement .
docker run -p 8080:80 telement
```

Open http://localhost:8080

## Test

```bash
npm run test
```

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
- **Mobile (<900px)** — drawer for list, full-width detail

### Swipe (mobile)

On mobile, the list drawer can be opened and closed with swipe gestures:

- **Swipe right** — opens the list drawer (when viewing a post)
- **Swipe left** — closes the drawer

Two mechanisms work together:

1. **MUI SwipeableDrawer** — built-in swipe on the left edge (56px strip below the header) and on the drawer paper when open
2. **Custom `useSwipe` hook** — horizontal swipe on the main content area (55px threshold, ignores vertical scroll)

`touch-action: pan-y` on the content keeps vertical scrolling smooth and avoids conflicts with horizontal swipes.

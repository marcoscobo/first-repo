# CLAUDE.md

Guidance for Claude when working in this repository.

## Project overview

Online shop for mobile phones. Single-page app in Vue 3 + TypeScript: phone catalog with filters, product detail, cart and checkout. Frontend only for now: data comes from mock fixtures behind a service layer, so a real REST API can replace them later without changing views or stores.

Current status: `Dockerfile`, `docker-compose.yml` and `.devcontainer/` exist. The Vue scaffold described below is not created yet.

## Stack

- Vue 3 (Composition API, `<script setup lang="ts">`) + TypeScript
- Vite
- Vue Router, Pinia
- Tailwind CSS
- Vitest + Vue Test Utils
- ESLint + Prettier
- Docker + docker compose (all commands run inside containers), VS Code Dev Containers

## Architecture

```
src/
  main.ts           # app bootstrap: createApp, router, pinia
  App.vue           # layout shell (header, cart badge, <RouterView>)
  router/           # routes: /, /phones, /phones/:id, /cart, /checkout
  views/            # route-level pages (HomeView, CatalogView, PhoneDetailView, CartView, CheckoutView)
  components/       # reusable presentational UI (PhoneCard, PriceTag, FilterPanel, ...)
  composables/      # reusable logic (useCart, useFilters, ...)
  stores/           # Pinia stores: products, cart, filters
  services/         # data access (productService, orderService) - the ONLY layer that fetches data
  mocks/            # JSON fixtures used by services until a real API exists
  types/            # shared models: Phone, CartItem, Order, ...
  assets/           # static assets, Tailwind entry CSS
```

Tests: Vitest + Vue Test Utils, `*.spec.ts` colocated next to the file under test.

### Rules

- Data flow: `views -> stores -> services -> mocks/API`. Components never fetch data or import services directly.
- Components receive data via props and emit events; business logic lives in stores or composables.
- All shared models are typed in `src/types/`. No `any` unless justified in a comment.
- Use `<script setup lang="ts">` and the Composition API. No Options API.
- Style with Tailwind utilities. Use scoped CSS only when Tailwind can't express it.
- Services return typed Promises so the mock implementation can be swapped for HTTP calls with the same interface.

## Docker

- `Dockerfile` (multi-stage):
  - `dev`: Node LTS (pinned tag), runs as user `node`, starts the Vite dev server with `--host` on port 5173.
  - `build`: runs `npm ci && npm run build` to produce `dist/`.
  - `prod`: nginx (pinned tag) serving `dist/` with SPA fallback (`try_files $uri /index.html`, see `nginx.conf`).
- `docker-compose.yml`: service `web` (target `dev`), port `5173:5173`, source bind-mounted for hot reload, named volume for `node_modules`.
- `.devcontainer/`: VS Code attaches to the compose `web` service at `/app` as user `node`. Its `docker-compose.yml` override sets `command: sleep infinity`, so the dev server is started manually (`npm run dev -- --host`). `postCreateCommand` runs `npm ci` when `package-lock.json` exists.
- Mock data lives in `src/mocks`; there is no separate mock API container.
- Run every Node command through compose, not on the host. Inside the dev container you are already in the `web` container: run `npm ...` directly.

### Commands

```bash
docker compose up                              # dev server -> http://localhost:5173
docker compose run --rm web npm install <pkg>  # add a dependency
docker compose run --rm web npm test           # Vitest
docker compose run --rm web npm run lint       # ESLint + Prettier check
docker compose run --rm web npm run build      # type-check + production build
docker build --target prod -t phone-shop .     # production image
```

## Git workflow (mandatory for every task)

Branches:

- `main`: released code. `develop`: integration branch.
- Never commit directly to `main` or `develop`.

For each new task:

1. `git checkout develop && git pull`
2. `git checkout -b <type>/<short-kebab-description>`
   Types: `feature/`, `fix/`, `docs/`, `chore/`, `refactor/`, `test/`.
   Example: `feature/cart-quantity-selector`.
3. Make small, focused commits. One logical change per commit.
4. Before committing, lint and tests must pass in Docker.
5. Ask the user before pushing or opening a PR. PRs target `develop`.
6. Never force-push, rewrite shared history, or merge into `main` unless the user explicitly asks.

### Conventional Commits

Format: `<type>(<optional scope>): <imperative summary>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`, `perf`.
Breaking changes: add `!` after the type/scope or a `BREAKING CHANGE:` footer.

Examples:

```
feat(catalog): add brand filter
fix(cart): keep quantity when item is re-added
docs: describe docker setup in README
build(docker): add multi-stage Dockerfile
test(cart): cover total price calculation
refactor(services)!: return Result objects from productService
```

Summary in English, lowercase, no trailing period, ≤ 72 characters.

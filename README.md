# Phone Shop

Online shop for mobile phones, built with Vue 3.

Users can browse a phone catalog, filter it (brand, price, specs), open a product page, add phones to a cart and go through checkout. Data comes from a mock API for now; a real backend can be plugged in later without touching the UI.

> **Status:** first version. The phone catalog (`/phones`) lists phones from mock data. Product detail, filters, cart and checkout are not built yet.

## Stack

| Area        | Tool                          |
| ----------- | ----------------------------- |
| Framework   | Vue 3 (Composition API) + TypeScript |
| Build       | Vite                          |
| Routing     | Vue Router                    |
| State       | Pinia                         |
| Styling     | Tailwind CSS                  |
| Tests       | Vitest + Vue Test Utils       |
| Code style  | ESLint + Prettier             |
| Environment | Docker + docker compose, VS Code Dev Containers |

## Run it

You only need Docker. No local Node install required.

### Option A: VS Code Dev Container

Requires the VS Code [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.

1. Open the repo in VS Code and run **Dev Containers: Reopen in Container**.
2. In the container terminal (you are already inside the `web` container, run npm directly):

```bash
npm run dev -- --host
```

Port 5173 is forwarded: open http://localhost:5173. Use `npm test`, `npm run lint` and `npm run build` the same way.

### Option B: docker compose

```bash
docker compose up
```

Open http://localhost:5173. Code changes reload automatically.

Other commands:

```bash
docker compose run --rm web npm test        # run tests
docker compose run --rm web npm run lint    # lint
docker compose run --rm web npm run build   # production build
docker build --target prod -t phone-shop .  # production image (nginx)
```

## Contributing

- `main` = released code, `develop` = integration branch. Don't commit to either directly.
- Branch from `develop`: `feature/…`, `fix/…`, `docs/…`, `chore/…`, `refactor/…`, `test/…`.
- Write commits with [Conventional Commits](https://www.conventionalcommits.org/): `feat(cart): add quantity selector`.
- Open a pull request to `develop`. Lint and tests must pass.

## Working with Claude

[CLAUDE.md](CLAUDE.md) holds the architecture and rules Claude follows in this repo. Update it when the architecture changes.

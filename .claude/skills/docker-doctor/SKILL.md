---
name: docker-doctor
description: Diagnose the Docker and dev container setup (compose service, ports, node_modules volume, prod image) when the environment misbehaves.
---

Diagnose, read-only first. Report findings before changing anything.

1. Read `Dockerfile`, `docker-compose.yml`, `.devcontainer/`, `nginx.conf`, `.dockerignore` and compare with the Docker section of CLAUDE.md (targets `dev`/`build`/`prod`, pinned tags, user `node`, port 5173, bind mount plus named `node_modules` volume, SPA fallback).
2. Check state: `docker compose config`, `docker compose ps`, and whether port 5173 is already in use.
3. Common causes to test: stale `node_modules` volume after dependency changes (`docker compose down -v` is destructive to that volume: ask before running), missing `npm ci`, dev server not started with `--host`.
4. Verify the prod image: `docker build --target prod -t phone-shop .`, and confirm `nginx.conf` has `try_files $uri /index.html`.
5. Report what is wrong, the proposed fix and its cost. Apply fixes only after confirmation; never delete volumes, images or containers without asking.

---
name: release-check
description: Pre-release verification before merging develop into main - build, prod image, docs accuracy and a changelog draft. Read-only; never merges.
disable-model-invocation: true
---

Verify that `develop` is ready to release.

1. `git fetch` and confirm `develop` is up to date and clean. Do not switch branches with uncommitted changes.
2. In Docker, run lint, tests and build, and `docker build --target prod -t phone-shop .`. Report any failure verbatim.
3. Check docs against the code: the "Current status" in CLAUDE.md and README must match which views, stores and services actually exist (`src/`, `src/router/index.ts`). List every mismatch.
4. Draft a changelog from `git log main..develop` grouped by Conventional Commit type, flagging breaking changes (`!` / `BREAKING CHANGE:`). Flag commits that do not follow the convention.
5. Run the `repo-reviewer` agent on `git diff main...develop`.
6. Output a go/no-go with the evidence. Never merge, tag or push; merging into `main` only happens if the user explicitly asks.

---
name: ship
description: Finish a task - run lint, tests and build in Docker, then commit with Conventional Commits. Asks before any push or PR.
disable-model-invocation: true
---

Prepare the current branch for review.

1. Refuse if the branch is `main` or `develop`.
2. Run in Docker and stop at the first failure, showing its output verbatim:
   - `docker compose run --rm web npm run lint`
   - `docker compose run --rm web npm test`
   - `docker compose run --rm web npm run build`
3. Inspect `git status` and `git diff`. Split the changes into small, focused commits (one logical change each). Stage files by name, never `git add -A`.
4. Commit message: `<type>(<optional scope>): <imperative summary>`, English, lowercase, no trailing period, <= 72 chars. Types: feat, fix, docs, style, refactor, test, chore, build, ci, perf. Breaking changes: `!` or a `BREAKING CHANGE:` footer.
5. Optionally run the `repo-reviewer` agent first if the diff is large.
6. Show the commit list. Ask before pushing; if confirmed, push and ask before opening a PR targeting `develop`. Never force-push or merge into `main`.

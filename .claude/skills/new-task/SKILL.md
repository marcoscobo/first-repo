---
name: new-task
description: Start a new task following the repo Git workflow - branch from develop with the right type prefix, then present a plan before editing anything.
argument-hint: <type> <short description>
disable-model-invocation: true
---

Start a task from `$ARGUMENTS` (`<type> <description>`).

1. Validate `<type>` is one of `feature`, `fix`, `docs`, `chore`, `refactor`, `test`. If missing or invalid, ask.
2. Run `git status --short`. If the tree is dirty, stop and ask what to do with the changes; never discard them.
3. `git checkout develop && git pull`, then `git checkout -b <type>/<kebab-description>` (lowercase, short).
4. Never work on `main` or `develop` directly.
5. Present a short plan (step -> how it is checked) and the "done" criteria. Do not edit files until the user confirms.
6. If the task is a roadmap feature, suggest `/new-feature`.

---
name: new-feature
description: Build a shop feature (e.g. phone detail, cart, checkout, filters, orders) across the layers type -> service -> store -> UI -> tests, delegating to the project agents.
argument-hint: <feature name and goal>
---

Implement `$ARGUMENTS` following the architecture in CLAUDE.md (`views -> stores -> services -> mocks/API`).

1. Read the closest existing code first: `src/types/phone.ts`, `src/services/productService.ts`, `src/stores/products.ts`, `src/components/PhoneCard.vue`, `src/views/CatalogView.vue`.
2. Write a plan listing the public interfaces (types, service methods, store state/actions, props/emits, routes) and the "done" criteria. Present it and wait for confirmation. Unspecified design calls (error semantics, stock rules, validation) must be asked, not chosen.
3. Make sure the work is on a `feature/...` branch (use `/new-task` if not).
4. Delegate in order, passing the agreed interfaces:
   - `data-layer-dev`: types, service, fixtures, store.
   - `vue-feature-dev`: views, components, composables, route.
   - `test-qa`: colocated specs, then lint, tests and build.
   Independent pieces may run in parallel.
5. Run `repo-reviewer` on the result and fix valid findings.
6. Update the "Current status" line in CLAUDE.md if a view or store became implemented.
7. Hand over with `/ship`; do not commit or push here.

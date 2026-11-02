---
name: swap-service
description: Replace a mock-backed service (productService, orderService) with a real REST API implementation without changing stores or views.
argument-hint: <service name> <API base URL or spec location>
---

Swap the mock implementation of `$ARGUMENTS` for HTTP calls.

1. Read the service in `src/services/`, its spec, and the types in `src/types/`. The existing exported function signatures are the contract and must not change.
2. Get the real API contract (endpoints, payloads, error shapes) from the user or a provided spec. Do not guess endpoints or fields; if they are missing, ask.
3. Base URL and any credentials come from environment config (e.g. `import.meta.env.VITE_*`); never hardcode them or put secrets in the repo.
4. Implement the HTTP version behind the same typed Promises. Keep the mock path selectable (e.g. by env flag) so tests and offline dev still work. Error handling is a design call: propose it and wait for confirmation.
5. Map API responses to the shared types at the service boundary; nothing API-specific leaks to stores or views.
6. Test with mocked `fetch` (contract tests for success, empty and error cases). Run lint, tests and build in Docker.
7. If any store or view needs to change, stop and report it: that means the interface was not preserved.

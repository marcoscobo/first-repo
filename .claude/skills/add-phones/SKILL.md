---
name: add-phones
description: Add synthetic phone entries to the mock catalog (src/mocks/phones.json), validated against the Phone type.
argument-hint: <how many / brands / price range>
---

Add phones to `src/mocks/phones.json` per `$ARGUMENTS`.

1. Read `src/types/phone.ts` and the current fixtures. Every entry must have exactly the `Phone` fields: `id`, `brand`, `model`, `price` (EUR), `storageGb`, `ramGb`, `screenInches`.
2. `id` is unique kebab-case `<brand>-<model>`. Use fictional brands and models only (like the existing Nova and Orbit); no real products or real data.
3. Keep values plausible and consistent: higher storage/RAM tiers cost more, realistic screen sizes.
4. If the `Phone` type needs new fields (color, image, stock), stop: that is a type change for `data-layer-dev`, not a fixture edit.
5. Follow the existing JSON formatting. Run the tests in Docker (`docker compose run --rm web npm test`); update specs that assert on catalog size if needed.

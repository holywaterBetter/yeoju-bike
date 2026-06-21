# yeoju-bike

## Verification

Use the production-backed verification command before and after layout or refactor work:

```bash
npm run verify
```

This builds the app once, starts a local production server on a free port, audits public asset references, checks PC/tablet/mobile layout invariants, and compares screenshots against `test-assets/screenshots/baseline`.

To refresh the screenshot baseline after an intentional visual change:

```bash
npm run visual:baseline:production
```

To run only the screenshot comparison against an already running server:

```bash
VISUAL_BASE_URL=http://127.0.0.1:3000 npm run visual:compare
```

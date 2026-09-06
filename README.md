# yeoju-bike

## Kakao Map

The directions page uses the Kakao Maps Web JavaScript SDK when an app key is configured. Without a key, the existing map image remains visible as a fallback.

1. Create an app in Kakao Developers and enable Kakao Map API usage.
2. Add `http://localhost:3000` and `https://www.여주자전거시티투어.com` to the JavaScript key's allowed SDK domains.
3. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_KAKAO_MAP_APP_KEY` to the app's **JavaScript key**.
4. For GitHub Pages, add the same value as the repository Actions variable `NEXT_PUBLIC_KAKAO_MAP_APP_KEY`.

`NEXT_PUBLIC_KAKAO_MAP_APP_KEY` is sent to the browser by design. Restrict it with the registered JavaScript SDK domains; do not use a REST API or Admin key here.

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

# Propack Odisha International Expo

Next.js App Router, TypeScript and Tailwind. Brand-preserving compact redesign with Atlas, Google Sheets, Gmail notifications and server-verified reCAPTCHA v2.

Read **DEPLOYMENT-HANDOFF.md** for full configuration and launch acceptance.

## Development

Use Node.js 24.x. Install with `npm ci`, copy `.env.example` to `.env.local`, then `npm run dev`. Open http://localhost:3000. Without credentials, pages remain available and forms honestly report that online submissions are not yet available.

## Production and checks

```sh
npm run lint
npm run typecheck
npm test
npm run check:deployment
npm run build
npm start
```

The deployment preflight needs completed production configuration; it is expected to fail on the blank example. Run browser tests with `npx playwright install chromium` then `npm run test:e2e` against localhost with unconfigured integrations. These tests intentionally use invalid/mocked fixtures; do not point them at production.

## Service setup

- Atlas: create a scoped database user, allow the host network and set MONGODB_URI/MONGODB_DB_NAME. Connection utility caches the client.
- Sheets: enable Sheets API, share the spreadsheet with the service account, set GOOGLE_CLIENT_EMAIL/GOOGLE_PRIVATE_KEY/GOOGLE_SHEET_ID, then run `node --env-file=.env.local scripts/setup-sheets.mjs`. Optional GOOGLE_SHEET_NAME prefixes the nine form tabs; preserve it once live data exists.
- Gmail: enable account 2-Step Verification, create an App Password if permitted, set GMAIL_USER/GMAIL_APP_PASSWORD and CONTACT_EMAIL_1/CONTACT_EMAIL_2. Both recipients receive original submission time, source and fields. Legacy SMTP settings remain supported.
- reCAPTCHA: register v2 checkbox keys for the intended domains; set NEXT_PUBLIC_RECAPTCHA_SITE_KEY before building and keep RECAPTCHA_SECRET_KEY server-only. Tokens are checked for Google-verified validity and exact hostname. Configure real keys before enabling public submissions.
- Generate separate TOKEN_SECRET and CRON_SECRET values, each at least 32 random characters. Schedule authenticated POST /api/jobs/retry every five minutes.
- Set SITE_URL and NEXT_PUBLIC_SITE_URL to the same confirmed public HTTPS origin before production build. Localhost is for development only.

## Content and assets

Event facts: lib/site.ts. Navigation/download cards: lib/navigation.ts. FAQs: lib/faqs.ts. Sector applications: lib/sector-details.ts. Form fields and validation: lib/forms.ts. Editorial pages: components/pages/. Homepage modules: components/home/.

Replace an image in public/assets with an optimized file, update its referenced filename/alt text in the relevant content component and verify mobile crops. Preserve the existing wordmark and font families. Fonts install as local package assets and are loaded with next/font/local.

To replace the brochure, keep the approved PDF outside public, update app/api/brochure/route.ts, its file-tracing entry in next.config.ts, lib/forms.ts brochure copy, lib/navigation.ts and any archive labels. The included PDF is explicitly a 2023 archive. Do not fabricate unavailable current-edition documents.

## Code organization

- `app/(site)/` contains explicit editorial routes; `app/(forms)/[slug]/` contains the shared form route for the existing form slugs. Route groups do not change public URLs.
- `components/layout/` contains the site header/footer, `components/shared/` contains shared UI and motion primitives, and `components/forms/`, `components/home/`, `components/pages/` keep feature/page code together.
- `styles/base.css` contains design tokens, reset and global primitives. Shared component styles live in `styles/components/`; page-specific styles live in `styles/pages/`; CSS keyframes live in `styles/animations.css`. `app/globals.css` only establishes the stylesheet import order.
- Tailwind remains available for short, one-off utility styling. Complex selectors, responsive overrides and brand-specific presentation stay in CSS so the existing cascade and breakpoints remain explicit.

## Architecture and deployment

Server Components by default; small client components handle menus, forms, CAPTCHA and subtle Framer Motion reveals. Important forms validate with Zod, verify CAPTCHA, store in MongoDB, write a reserved Sheet row and notify both recipients. Pending delivery is saved and retryable with a private status reference. Attachments are private and signature-checked. No secret values belong in NEXT_PUBLIC variables, except the intentionally public CAPTCHA site key and public URL.

Use a Node-compatible host, HTTPS, correct public origin, outbound service access and 120/300 second handler support. Preserve the private brochure. Live service delivery, actual browser challenges, retry scheduling and domain verification require developer configuration. This ZIP is not an already-deployed website.

References: [reCAPTCHA v2](https://developers.google.com/recaptcha/docs/display), [server verification](https://developers.google.com/recaptcha/docs/verify), [Google App Passwords](https://support.google.com/accounts/answer/185833).

# Propack Odisha International Expo — developer handoff

Updated: 12 September 2026. Read this file before deploying the redesigned project.

## Install and run

Use Node.js 24.x and npm. Extract the complete project, run `npm ci`, copy `.env.example` to `.env.local`, then run `npm run dev`. Local preview is http://localhost:3000. No secret values or service accounts are included.

For production: configure environment values first, then run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` and `npm start`. A Node-compatible Next.js host is required; static/PHP-only hosting cannot run the API routes. Keep outbound Atlas, Google HTTPS and Gmail SMTP available. Submission/retry handlers require host limits of 120/300 seconds respectively.

## Brand and content

The baseline ZIP's DM Sans + Manrope fonts, red/cyan/charcoal/white palette, wordmark and industrial imagery are preserved. The new layout is compact; only the homepage has a continuous decorative motion layer, with a pause control and reduced-motion support.

Full name: Propack Odisha International Expo. Short name: Propack Odisha. Sole displayed organizer: OSME, following the owner's instruction. Supplied public contact emails remain `info@oasme.org.in` and `oasme.ctc@gmail.com`; do not invent replacements. Dates: 25–28 February 2027. Venue: Janata Maidan, Bhubaneswar, Odisha. Phones: 70083 41944 / 77518 09433.

## Configure the integrations

| Variable | Purpose |
|---|---|
| SITE_URL | Exact browser origin for API origin checks and private links. Use localhost only in development. |
| NEXT_PUBLIC_SITE_URL | Confirmed public HTTPS origin for SEO, set before build. Match SITE_URL in production. |
| MONGODB_URI | Atlas connection URI, database-scoped user and permitted network. |
| MONGODB_DB_NAME | Database name; legacy MONGODB_DATABASE remains supported. Preserve the existing database when upgrading. |
| GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY / GOOGLE_SHEET_ID | Service account, private key and spreadsheet shared as editor. Enable Sheets API. Escaped newline keys are supported. |
| GOOGLE_SHEET_NAME | Optional prefix for the nine form tabs, e.g. Propack-contact-us. Blank preserves existing tab names. Do not change it after submissions start without migrating rows/counters. |
| GMAIL_USER / GMAIL_APP_PASSWORD | Gmail account and App Password. Default smtp.gmail.com:465. Do not use the normal account password. |
| CONTACT_EMAIL_1 / CONTACT_EMAIL_2 | Both organizer notification recipients. Confirm the actual addresses. |
| NEXT_PUBLIC_RECAPTCHA_SITE_KEY | Google reCAPTCHA v2 checkbox site key, registered for your hostname; available to browser by design. Set before build. |
| RECAPTCHA_SECRET_KEY | Private matching server secret. Never expose it in browser code. |
| TOKEN_SECRET / CRON_SECRET | Separate random strings of at least 32 characters for private tokens and retries. |
| TRUSTED_PROXY_IP_HEADER | Only use a header your hosting edge overwrites and protects; otherwise leave blank. |

Legacy SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASSWORD/SMTP_FROM and EMAIL_TO_1/EMAIL_TO_2 remain compatible. Gmail account/password and CONTACT_EMAIL values take precedence. Leave legacy SMTP_HOST/PORT blank when using Gmail defaults. Gmail account policy must permit App Passwords; enable 2-Step Verification and generate an application password through the account security settings. If unavailable, use an approved SMTP provider through the legacy configuration.

Register reCAPTCHA as **v2 “I'm not a robot” checkbox**, not v3/Enterprise. Include the exact production hostname and a separate development setup as appropriate. Server verification requires a successful response for SITE_URL's hostname with Google-verified token validity. Missing configuration, invalid/expired checks and provider failures do not save a new submission. There is no CAPTCHA bypass flag. Tokens are never stored in the submission document.

Run `node --env-file=.env.local scripts/setup-sheets.mjs` once to create nine tabs. `npm run check:deployment` validates configuration shape and required files without sending data or printing secrets. It does not prove connectivity.

## Delivery and reliability

Frontend validation → CAPTCHA → server validation/verification → MongoDB → Sheets → recipient 1 → recipient 2. MongoDB is authoritative; if notification delivery fails after recording, the UI clearly shows processing and provides a private status link. It does not falsely claim completed delivery or ask the user to create another record. Every email includes form type, original submitted timestamp, source route, fields and private attachment links.

Schedule POST `/api/jobs/retry` every five minutes with `Authorization: Bearer <CRON_SECRET>`. This is not a GET cron. It handles up to three eligible records per call; monitor pending delivery and scale for actual demand. Sheets uses reserved-row retries. SMTP acknowledgements can be ambiguous, so rare duplicate mail is possible.

## Launch acceptance that needs real accounts

1. Complete a real v2 challenge and submit one controlled record for each of the nine forms.
2. Verify the saved Atlas record, correct Sheet row and both Gmail notifications.
3. Verify private brochure, pass, status and attachment access; expired/invalid links must fail.
4. Exercise a downstream outage and retry recovery without duplicate rows.
5. Check public HTTPS origin, domain redirects, host proxy/rate limits and scheduled job authorization.
6. Run Search Console URL inspection and the Rich Results Test on the deployed site, then submit `/sitemap.xml`.

No real Atlas/Sheets/Gmail/reCAPTCHA credentials were supplied; live delivery and hosting are not claimed verified. Local tests cover validation/recovery and mocked CAPTCHA verification; browser tests cover the pages, navigation, responsive layout and unavailable integration response.

## Assets and documents

The ZIP contains optimized public assets and `private/brochure-2023.pdf`. Keep the brochure private; the route trace explicitly includes it. Do not move it into public. It is a clearly labelled 2023 archive with organizer contacts updated, not a 2027 prospectus. Keep it in the host deployment even though private/ is gitignored. Source WordPress uploads, PHP files, caches, dependencies and secrets are excluded.

Approved current brochure, opening hours, entry arrangements, tariffs and organizer retention terms are still required from the owner. No unverified speakers, sponsors, conference schedule or historical gallery was fabricated. External historical websites/search caches cannot be changed by this ZIP.

## Editing map

- Event facts/sectors/services/routes: lib/site.ts
- Navigation and resources: lib/navigation.ts
- Sector applications: lib/sector-details.ts
- FAQs (primary home: visitor page): lib/faqs.ts
- Forms and Zod rules: lib/forms.ts
- Home hero/sections: components/home/
- Page content: components/pages/
- Shared PageHero/CTA/buttons: components/ui.tsx
- Font loading: app/layout.tsx; brand tokens/compact layout: app/globals.css
- SEO: lib/seo.ts, app/sitemap.ts, app/robots.ts

Existing public URLs remain available. /exhibit, /visit and /contact permanently redirect to the established routes. /sectors and /resources contain real source-supported information. See docs/redesign-baseline.md and docs/seo-plan.md for decisions and promotion material. Analytics can attach to data-cta attributes; no tracking service or cookies were added by that hook.

# Redesign QA — 12 September 2026

## Verified locally

- Exact baseline fonts, palette tokens and wordmark treatment preserved against the previous project ZIP.
- Production build and TypeScript compilation passed. ESLint passed after correcting internal navigation links.
- Eleven unit tests passed: form validation, token checks, durable delivery recovery, Gmail/legacy SMTP configuration, tab naming and server CAPTCHA validation.
- Fifty existing Playwright tests passed: all 20 public routes, responsive widths, images, negative API validation, forms, keyboard navigation, reduced motion and private endpoint gates.
- Additional visible Chromium audit: 200 route/viewport combinations across 320, 375, 390, 430, 640, 768, 1024, 1280, 1440 and 1920 pixels; 650 assertions passed. No horizontal overflow or uncaught page errors. Forty axe WCAG A/AA scans across all routes at 390 and 1440 pixels reported zero violations.
- Verified homepage-only motion, pause/resume, reduced motion, compact desktop hero, visitor FAQ and /exhibit, /visit, /contact compatibility redirects.
- Mocked CAPTCHA widget browser fixture passed solve, expiry, retry, reset and error states. Server tests reject missing/oversized tokens, wrong hostname, provider-reported expiry/replay, unsuccessful provider responses and provider outages. These are controlled tests, not live Google verification.
- Screenshots are saved for every public route at desktop/mobile sizes; final homepage and contact previews are included in docs. Following the broad audit, removed duplicate form intro and double CTA padding and limited scroll reveals to selected elements.

Firefox and WebKit also passed 12 representative desktop/mobile page checks each on the final layout. Final screenshots were reviewed for all 20 public routes.

## Remaining external verification

No real reCAPTCHA, Atlas, Google Sheets or Gmail credentials were provided. Actual challenge completion, live storage, both-recipient delivery, real private downloads and retry scheduling must be tested by the deploying developer. No public deployment or outreach occurred. Domain ownership/canonical origin, admission arrangements, hours, current tariffs, 2027 brochure and retention terms need owner configuration/confirmation.

The app deliberately fails closed when verification or integrations are unavailable and does not claim a successful recorded submission. Pending downstream delivery after durable storage is explicitly distinguished from completed notification delivery.

## Content and scope

No unverified sponsors, speakers, conference schedule, floor plan or past-event gallery was invented. Established URLs are preserved; the source supports the added sector and resource pages. The supplied 2023 brochure remains clearly archival and private. No production secrets or legacy WordPress uploads belong in the release archive.


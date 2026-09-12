# Refactor report

## Scope

This refactor reorganizes the existing Next.js App Router project without changing its public routes, brand tokens, fonts, content, breakpoints, layout rules or responsive design. The original stylesheet remains the visual source of truth; retained CSS declarations were moved without changing their values.

## Folder structure

### Before

```text
app/
├── [slug]/page.tsx              # editorial pages + all form pages
├── page.tsx
├── submission-status/
└── view-pass/
components/
├── header.tsx
├── footer.tsx
├── ui.tsx
├── submission-form.tsx
├── recaptcha.tsx
├── pass-view.tsx
├── scroll-effects.tsx
├── visitor-questions.tsx
├── home/
└── pages/
app/globals.css                  # ~2,467 lines
```

### After

```text
app/
├── (site)/                      # explicit editorial routes; URLs unchanged
│   ├── about/
│   ├── about-organizers/
│   ├── exhibitor-details/
│   ├── exhibitors/
│   ├── market-overview/
│   ├── privacy-policy/
│   ├── resources/
│   ├── sectors/
│   └── visitors/
├── (forms)/[slug]/              # shared template for existing form-only slugs
├── page.tsx
├── submission-status/
└── view-pass/
components/
├── layout/                      # Header, Footer
├── shared/                      # UI, page shell, motion primitives
├── forms/                       # form UI + reCAPTCHA
├── pass/
├── home/
└── pages/
styles/
├── base.css
├── animations.css
├── components/
│   ├── actions.css
│   ├── content.css
│   ├── forms.css
│   └── layout.css
└── pages/
    ├── catalog.css
    └── home.css
app/globals.css                  # import order only
```

All 20 existing public routes remain represented. Existing redirects in `next.config.ts` were not changed.

## CSS refactor

`app/globals.css` is now a 9-line stylesheet entry point. Design tokens, reset, typography, global layout primitives and accessibility rules live in `styles/base.css`. Shared header/footer/navigation rules are in `styles/components/layout.css`; buttons, links, labels and CTA rules are in `actions.css`; shared editorial/content patterns are in `content.css`; forms/pass/feedback rules are in `forms.css`. Home-only rules are in `styles/pages/home.css`, while sector/resource catalog rules are in `styles/pages/catalog.css`. CSS keyframes that are better handled by CSS remain in `styles/animations.css`.

A canonical CSS comparison found no unexpected declaration changes: 486 retained rule items match the original values exactly. The 88 removed/replaced items are limited to verified-unused selectors, the old DOM-query reveal animations now replaced by Framer Motion, and the one `resource-list` margin converted to Tailwind (`mb-6`). The original responsive condition set remains unchanged: 1600 min-width; 1100, 1023, 800, 640, 480 and 380 max-width; reduced-motion; and print.

Tailwind remains intentionally limited to short, one-off utilities already present in the project plus the resource-list margin conversion. Complex selectors, pseudo states, brand-specific rules, breakpoint overrides and keyframes remain custom CSS.

## Components and routing

The previous catch-all page mixed editorial content, form rendering, labels, metadata and breadcrumb schema in one file. Editorial pages now have explicit App Router route files under `app/(site)`, while the existing form-only slugs share `app/(forms)/[slug]/page.tsx`. Shared page framing and breadcrumb structured data moved to `components/shared/page-shell.tsx`, and page labels/descriptions moved to `lib/page-config.ts`.

The root component folder was grouped by responsibility: layout, shared UI, forms, pass handling, home and editorial page content. `FormAside` was extracted from the old dynamic route so form pages remain focused on composition.

## Motion

Framer Motion 12.42.2 was added as a pinned dependency. `components/shared/motion.tsx` provides small semantic wrappers (`section`, `div`, `article`, `dl`) so animations do not add layout wrappers. Motion is limited to opacity and small Y transforms, with short durations and one-time viewport reveals. The home hero/page hero use subtle load reveals, participation cards use a small stagger, content sections/CTA reveal on view, and the mobile menu uses a short `AnimatePresence` transition.

The old global `ScrollEffects` component, `IntersectionObserver` DOM queries and the old `rise`/`hero-step` entrance rules were removed. The technical hero line and loading spinner remain CSS animations because CSS is the simpler tool for them. Framer Motion uses `useReducedMotion`, and the existing `prefers-reduced-motion` CSS override is preserved.

## Validation

- Route parity audit: **20 expected / 20 represented; 0 missing; 0 extra**.
- TS/TSX parser audit: **70 files parsed; 0 syntax errors; 0 broken local imports**.
- CSS parser audit: **0 parse errors**.
- CSS canonical comparison: **0 unexpected missing retained rules; 0 unexpected extra rules**.
- Original CSS-backed classes still used by current TSX: **0 styles accidentally dropped**.
- `package.json` / `package-lock.json`: valid JSON and synchronized with pinned Framer Motion + transitive lock entries.
- `npm ci --offline` accepted the lockfile, then stopped at an uncached package. The environment has Node 22.16.0 while the project declares Node >=24 <25, and registry DNS is unavailable here.
- `npm run typecheck`: **environment-blocked** because project dependencies/types are not installed. A separate syntax/import audit passed.
- `npm run lint`: **environment-blocked** (`eslint` unavailable without `npm ci`).
- `npm run build`: **environment-blocked** (`next` unavailable without `npm ci`).

## Manual verification after install

On a Node 24 machine with registry access, run `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, and the existing Playwright suite. Then compare the supplied desktop/mobile baseline screenshots against the running project, paying particular attention to first-load motion, mobile-menu enter/exit, form pages, all hover/focus states and responsive transitions at the existing breakpoints. Live integrations (MongoDB, Sheets, email and reCAPTCHA) still require the project’s deployment credentials as documented in the existing handoff.

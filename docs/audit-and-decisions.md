# Propack Odisha source audit and implementation decisions

## Source of truth

Audited `odishapropack_old_pages_content.md` (23 extracted pages), the supplied redesign brief, and the upload directory's official logos, photography, brochure, industry graphics and legacy plugin files. The source was sanitized as requested to remove the former co-organizer and its contacts. The extraction parser now retains complete multiline page content, restoring exhibitor and visitor profiles. `lib/source-content.json` is a structured extraction. `page-inventory.md` classifies every page.

The user's updates override older material: 25–28 February 2027, Janata Maidan, Bhubaneswar, Odisha; 70083 41944 / 77518 09433. Only OSME organizer emails are retained. Old 2024/2025 dates, mixed third/fourth edition labels and the previous second phone number are not presented as current. The edition number needs organizer confirmation. Zero animation counters, 10,000 visitor marketing claims and prior sponsors are not treated as confirmed 2027 statistics or partnerships.

## Information architecture

Main navigation: The expo, Exhibit, Visit, Exhibitor services, Contact; prominent exhibitor registration CTA. Footer exposes organizers, market overview, brochure, both registrations, service centre, private pass lookup and privacy.

Public content routes retain original slugs. `/home` redirects to `/`. `/view_pass` and the old draft `/retrieve_pass` redirect to `/view-pass`. Misspelled `/fasisca-name` is preserved while its displayed title is corrected. Published clone/test pages and empty draft directory/additional-order pages remain 404. They are not navigation links.

## Content gaps and decisions

- Contact, exhibitor registration, visitor registration and brochure field definitions are absent from the text export. Their forms use practical professional-contact fields and relevant participation requirements. These are implementation decisions, not recovered original fields.
- Power, fascia, six-person badges, directory and stall-design fields are preserved. Duplicate machine weight labels are represented as total weight and optional individual details. Address country selection is replaced by an unrestricted country text field to preserve international coverage without a dated list.
- Added exhibiting company/stall/contact fields to the vendor design form so the request can be matched to an exhibitor.
- The source does not include pass generation or authentication code. A new signed, private registration pass and printable PDF flow replaces the empty route. It makes no unconfirmed admission promise. Lost-link support goes to organizers rather than permitting public searches of personal information.
- The only official event brochure located is `2023/06/Odisha-Propack-Brochure-2023-1.pdf`. It is stored outside public assets and explicitly labeled 2023 archive; former co-organizer branding was removed and organizer contacts updated. Event details remain historical. Supply a 2027 brochure and update copy/filename before offering a current-edition download.
- Historical power tariffs are labeled historical, not quoted as current. Outdated economic projections are preserved as archival context on the market page. The old political endorsement and unexplained superlatives are not current marketing copy. Underlying historical reports were not provided.
- The WordPress privacy boilerplate described comments, Gravatar, user accounts and cookies that this rebuild does not implement. It is replaced with a factual description of the actual submission architecture. Organizer retention terms and legal review remain a launch dependency.

## Asset review

Only selected image files were copied into `public/assets`, converted to WebP and served with Next Image. The entire legacy upload tree is excluded from deployment/version control; it contains plugin caches, logs, PHP and historical exhibitor uploads that should not be public application assets. No legacy executable code is used.

Reviewed official red/cyan/black marks with 2023/2024 and fourth-edition text. The displayed typographic wordmark preserves the colors and name without asserting an unconfirmed edition. Printing hero uses the supplied commercial printing press photo. Packaging photography replaces the ceremony photo that contained former branding. Unused former organizer logos were removed. No current sponsor or attendance assertions are inferred from photographs.

## Design system

Red #d9192b, cyan #008ec5, charcoal #202527, off-white #f5f6f6; explicit muted, border, success, error and warning tokens. DM Sans body and Manrope headings, locally hosted using next/font/local. Font rationale: readable professional body text and restrained geometric display shapes, variable weights without extra families. Official Next documentation consulted: https://nextjs.org/docs/app/getting-started/fonts.

1280px content grid; responsive margins; 96/65px section rhythm; square editorial cards; compact labels; clear dual registration CTAs. Animation is limited to entrance/hover transitions and disabled by reduced-motion preference. Functional pages use a shared form language; exhibitor and visitor content retain separate messaging.

## Delivery semantics

MongoDB is authoritative. A successful response means the validated request was durably recorded, not that every external service has delivered. If delivery fails, the response states that notifications are processing and provides a private status link. Brochure/pass access links are only issued after delivery completes; the brochure handler also enforces this gate. Delivery follows Sheets → first email → second email before the completion response. A protected retry endpoint resumes saved failures without asking users to resubmit. This deliberate reliability improvement avoids losing user requests because an external email service is temporarily unavailable.

Sheets writes use a reserved row and RAW values, preventing formula execution and duplicate rows on retry. SMTP delivery is at-least-once: an ambiguous send acknowledgement can result in duplicate mail after retry; deterministic Message-ID assists deduplication but does not guarantee it. Database identifiers are unique per form/idempotency key. Pass tokens are 180 days; brochure tokens 24 hours; organizer attachment links 7 days. Attachments are private MongoDB binary values, signature-checked PNG/JPEG/PDF, limited to 2 MB each; request body is bounded to 5 MB. No browser credentials.

## External dependencies still required

Atlas URI/database, Google service-account credentials and spreadsheet, SMTP credentials/from address and two recipient addresses, signing secret, retry-job secret and production domain. Opening hours, current admission terms, updated artwork/edition, 2027 brochure and tariffs need organizer input. Live database insertion, sheet delivery and two-recipient email delivery cannot be verified without those credentials. No live email has been sent by this implementation session.



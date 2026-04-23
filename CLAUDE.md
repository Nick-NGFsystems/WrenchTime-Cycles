# WrenchTime Cycles — Project Notes

This file covers WrenchTime-specific details. For universal NGFsystems standards, see `../CLAUDE.md`.

The Next.js app lives in this `wrenchtime-cycles/` directory. Run all commands from here.

---

## What This Project Is

A standalone Next.js 15 client website for a motorcycle service shop. Deployed as its own Vercel project. Content is managed by the client through their NGF portal and fetched from the NGF content API at runtime.

**No template ID needed.** The portal editor auto-detects editable fields by scraping `data-ngf-*` attributes from the live site.

---

## Content Fields — how to add or change them

The portal editor is driven entirely by attributes on HTML elements. There is no separate schema file to maintain. To add a new editable field:

1. Add the field to `lib/ngf.ts` fetch + `getNgfContent()` call in `page.tsx`
2. Render it with `data-ngf-field`, `data-ngf-label`, `data-ngf-type`, and `data-ngf-section` attributes
3. Deploy — the editor sidebar will pick it up automatically on next load

**Current editable sections and their field paths:**

| Section (`data-ngf-section`) | Field paths |
|---|---|
| `Brand` | `brand.businessName`, `brand.tagline`, `brand.primaryColor`, `brand.secondaryColor` |
| `Hero` | `hero.eyebrow`, `hero.headlinePrefix`, `hero.headlineAccent`, `hero.description`, `hero.cta` |
| `How It Works` | `how.title`, `how.steps[]` (title, desc — min 1, max 8) |
| `Services` | `services.title`, `services.items[]` (name, price — min 1, max 16) |
| `Call to Action` | `bottomCta.title`, `bottomCta.description`, `bottomCta.button` |
| `Footer` | `footer.copyright` |

**Repeatable arrays** use a `data-ngf-group` container attribute with `data-ngf-item-fields` JSON to declare sub-fields.

---

## Service Requests (WrenchTime-specific feature)

WrenchTime has its own Neon database for managing motorcycle service requests. This is separate from the NGF content system.

- `prisma/schema.prisma` — `ServiceRequest`, `BookingToken` tables
- `app/api/intake/route.ts` — receives new service request form submissions
- `app/api/booking/[token]/route.ts` — validates booking tokens for approved customers
- `app/intake/page.tsx` — public intake form
- `app/booking/[token]/page.tsx` — booking confirmation for approved requests
- `app/sign-in/`, `app/sign-up/` — Clerk auth for the shop owner

The NGF admin reviews requests from the NGF admin portal and approves/rejects. Approval generates a booking token, sends an email, and gives the customer a booking link.

---

## Environment Variables

```
# WrenchTime's own Neon database (service requests — NOT the NGF database)
DATABASE_URL
DIRECT_URL

# Clerk (shop owner auth only — public pages have no auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin

# NGF content integration
NEXT_PUBLIC_SITE_URL=https://wrenchtimecycles.com
NGF_APP_URL=https://app.ngfsystems.com
WEBSITE_REVALIDATION_SECRET=<must match NGF app env var>
```

---

## Project Structure

```
wrenchtime-cycles/
  app/
    layout.tsx              ← includes NgfEditBridge + ClerkProvider
    page.tsx                ← homepage — fetches NGF content
    globals.css
    intake/page.tsx         ← service request intake form
    booking/[token]/        ← booking confirmation
    sign-in/ sign-up/       ← Clerk auth
    api/
      intake/route.ts
      booking/[token]/
      revalidate/route.ts   ← NGF publish webhook
  components/
    NgfEditBridge.tsx        ← do not remove
    layout/SiteHeader.tsx
    layout/AuthNavActions.tsx
    BookingConfirmButton.tsx
  lib/
    ngf.ts                  ← getNgfContent(), getItems()
    db.ts                   ← Prisma for WrenchTime's own DB
  prisma/schema.prisma
  next.config.ts            ← CSP frame-ancestors for NGF portal
```

---

## Known Gaps / Integration Checklist

Things that are shipped but **not verified end-to-end**, or known rough edges. Skim this before starting a multi-hour session — the last session already audited.

| Area | Status | Notes |
|---|---|---|
| `ServiceRequest.tokenExpires` migration | ⚠️ Unverified | Commit `6d01a45` added the column to `prisma/schema.prisma` and generated `20260423070101_add_token_expires/migration.sql`. The SQL is correct (`ALTER TABLE "ServiceRequest" ADD COLUMN "tokenExpires" TIMESTAMP(3);`) but lands only at deploy time via Vercel's `prisma migrate deploy`. Run `./node_modules/.bin/prisma migrate dev` locally if you need to confirm. |
| Booking middleware | ✅ Public | `middleware.ts` now whitelists `/booking(.*)` + `/api/booking(.*)` + `/api/intake(.*)` so Clerk doesn't challenge customers without accounts. |
| `jobDuration` units | ✅ Fixed | `app/booking/[token]/page.tsx` now renders `day`/`days` (was `hrs` — the admin's value is days). |
| Theme consistency | ⚠️ In progress | Homepage is light (Tailwind `bg-white`, `text-gray-900`). Intake + booking pages were dark (`text-white`, `var(--bg)`, `panel` class). Ported to light to match in commit after `6d01a45`. Legacy dark-theme CSS variables in `globals.css` may still be referenced by other code — audit before removing. |
| Brand color sr-only anchors | ⚠️ Empty | `SiteHeader.tsx` has `<span data-ngf-field="brand.primaryColor" className="sr-only" />` with no inner content, so the editor sidebar shows the Brand color fields as empty. If you want the color swatch to show the live hex in the sidebar, put `{primaryColor}` inside the span (matches pattern used elsewhere). |
| Bridge version | ⚠️ May lag | `components/NgfEditBridge.tsx` should match the latest in `NorthCoveBuilders-Mockup/components/NgfEditBridge.tsx`. Bridge updates are synced by hand; if you change editor contract, propagate to every client site. |
| `<select><option>` editing | ❌ Not supported | Intake form dropdown options (`SERVICES` array, year/make/model suggestions) aren't editable through the NGF portal — the bridge can't intercept native option UI. |

**When finishing a session, add or update an entry here for anything you committed but couldn't verify live.** Saves the next agent the audit-from-scratch round-trip.

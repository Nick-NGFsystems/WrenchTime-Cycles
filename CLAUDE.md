# WrenchTime Cycles — Project Notes

**This file (the repo-root `CLAUDE.md`) is the canonical doc.** If you're reading a file at `wrenchtime-cycles/CLAUDE.md`, it should be a short pointer back here (see commit `<this one>`). A parallel Next.js app copy still lives in the `wrenchtime-cycles/` subdirectory from when the repo used a monorepo layout, but active development happens against the root — `app/`, `components/`, `lib/`, `prisma/`, `middleware.ts`, etc.

For universal NGFsystems standards (bridge contract, data-ngf-* attribute rules, postMessage protocol, security invariants) see the root [`NGF-Systems-app/CLAUDE.md`](https://github.com/Nick-NGFsystems/NGF-Systems-app/blob/main/CLAUDE.md). For the simplest reference implementation of the NGF editor integration (no auth, no external DB, just annotation patterns) see [`NorthCoveBuilders-Mockup/CLAUDE.md`](https://github.com/Nick-NGFsystems/NorthCoveBuilders-Mockup/blob/main/CLAUDE.md).

---

## What This Project Is

A standalone Next.js 15 client website for a motorcycle service shop. Deployed as its own Vercel project. Content is managed by the client through their NGF portal and fetched from the NGF content API at runtime.

**No template ID needed.** The portal editor auto-detects editable fields by scraping `data-ngf-*` attributes from the live site.

---

## Content Fields — how to add or change them

The portal editor is driven entirely by attributes on HTML elements. There is no separate schema file to maintain.

`lib/ngf.ts` returns every field as one flat dot-notation object — **you do not edit it when adding new fields**. It fetches the whole `/api/public/content` response and hands it back unchanged; `getItems()` is only a convenience helper for pulling a specific repeatable array out of that flat map.

To add a new editable field:

1. Read the value in the page where you want it: `const newField = content['section.fieldKey'] || 'Hardcoded fallback'`. Use `||` (not `??`) so stored empty strings fall through to the fallback — see NGF root `CLAUDE.md` for the reasoning.
2. Render it wrapped with `data-ngf-field`, `data-ngf-label`, `data-ngf-type`, and `data-ngf-section` attributes.
3. Deploy — the editor sidebar picks it up automatically on next load (schema is scraped from the live HTML).

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

- `prisma/schema.prisma` — single `ServiceRequest` model. The booking token is stored as fields on that row (`bookingToken String?` + `tokenExpires DateTime?`); there is **no separate `BookingToken` table**.
- `app/api/intake/route.ts` — receives new service request form submissions
- `app/api/booking/[token]/route.ts` — validates booking tokens for approved customers
- `app/intake/page.tsx` — public intake form
- `app/booking/[token]/page.tsx` — booking confirmation page (looks up `ServiceRequest.bookingToken = token`, checks `tokenExpires` hasn't passed)
- `app/sign-in/`, `app/sign-up/` — Clerk auth for the shop owner only

The NGF admin reviews requests from the NGF admin portal and approves/rejects. Approval generates a booking token + expiry, sends an email, and gives the customer a booking link.

### Middleware: public routes for customers without Clerk accounts

Customers never sign up. They receive a tokenized booking link via email (`/booking/<token>`) and confirm from there. `middleware.ts` **must** whitelist:

```ts
createRouteMatcher([
  '/',
  '/sign-in(.*)',          // shop owner sign in
  '/sign-up(.*)',          // shop owner sign up
  '/intake(.*)',           // public intake form (customers)
  '/api/intake(.*)',       // intake submission endpoint
  '/booking(.*)',          // tokenized booking confirmation page
  '/api/booking(.*)',      // booking confirm endpoint
  '/api/revalidate(.*)',   // NGF publish webhook — no auth, shared secret
])
```

If you add any new customer-facing page (or change the middleware matcher), confirm it's public — Clerk will otherwise redirect customers to a sign-in page they have no account for. The fact that `/booking/*` uses **token auth, not Clerk auth** is load-bearing and easy to regress.

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
| Duplicate `wrenchtime-cycles/` subdir | ⚠️ Legacy, drifting | The repo contains a full parallel Next.js app under `wrenchtime-cycles/` that no recent commit has touched — but its `package.json`, `app/`, `components/`, etc. still exist and can confuse tools (editors, AI agents) into reading stale content. A small pointer `wrenchtime-cycles/CLAUDE.md` now lives in git so anyone resolving to that path lands on the root doc. If nothing in production depends on the subdir (verify Vercel project points at the root), delete it entirely in a dedicated commit. |
| `ServiceRequest.tokenExpires` migration | ⚠️ Unverified against live DB | Commit `6d01a45` added the column + `20260423070101_add_token_expires/migration.sql` with `ALTER TABLE "ServiceRequest" ADD COLUMN "tokenExpires" TIMESTAMP(3);`. The SQL lands on Neon **only when Vercel next builds and runs `prisma migrate deploy`**. If you need it before a deploy, run `./node_modules/.bin/prisma migrate deploy` (prod DB) or `migrate dev` (shadow DB) locally. Every new migration has this same deploy-time caveat. |
| Booking middleware | ✅ Public | `middleware.ts` whitelists `/booking(.*)` + `/api/booking(.*)` + `/api/intake(.*)` so Clerk doesn't challenge customers without accounts. Don't regress this — see "Middleware: public routes for customers without Clerk accounts" above. |
| `jobDuration` units | ✅ Fixed | `app/booking/[token]/page.tsx` now renders `day`/`days` (was `hrs` — the admin's value is days). |
| Theme consistency | ✅ Unified to light | Homepage, intake, and booking pages all use Tailwind light theme (`bg-white`, `text-gray-900`, `border-gray-200`). Legacy dark-theme CSS variables (`--bg`, `--text`, `--line`, `--accent`) may still be referenced in `globals.css` — audit and remove any unused ones before shipping again. |
| AuthNavActions "My Booking" link | ✅ Fixed | The link pointed at `/booking` which 404s (the only route is `/booking/[token]`). Customers never sign in anyway — only the shop owner does, landing on `/admin`. Component now shows only a Sign Out button. |
| `/admin` route | ❌ Not built | `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin` but the route doesn't exist yet. Signing in currently lands on a 404. |
| Brand color sr-only anchors | ⚠️ Empty | `SiteHeader.tsx` has `<span data-ngf-field="brand.primaryColor" className="sr-only" />` with no inner content, so the editor sidebar shows the Brand color fields as empty. Put `{primaryColor}` inside the span so the scraper sees the live hex. |
| Bridge version | ⚠️ May lag | `components/NgfEditBridge.tsx` should match the latest in `NorthCoveBuilders-Mockup/components/NgfEditBridge.tsx`. Bridge updates are synced by hand — if you change the editor contract, propagate to every client site. |
| `<select><option>` editing | ❌ Not supported | Intake form dropdown options (`SERVICES` array, year/make/model suggestions) aren't editable through the NGF portal — the bridge can't intercept native option UI. |

**When finishing a session, add or update an entry here for anything you committed but couldn't verify live.** Saves the next agent the audit-from-scratch round-trip.

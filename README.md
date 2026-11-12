# Eco Pintura — "Recién pintado"

Marketing site for **Eco Pintura**, painters in Barcelona — from your hallway to Camp Nou.
Built from the Figma file **Eco Pintura — Website & Launch Storyboard**
(`Uh2rj2cneA2sZxCzE0YQzv`): Direction, System, Mobile 390, Tablet 834, Desktop 1440, Motion, SEO & Copy.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000  (es)  ·  /ca  ·  /en
npm run build && npm run start
```

| Script                                  | What it does                                       |
| --------------------------------------- | -------------------------------------------------- |
| `npm run dev`                           | Dev server (Turbopack)                             |
| `npm run build` / `start`               | Production build / serve                           |
| `npm run lint` · `typecheck` · `format` | ESLint · `tsc --noEmit` · Prettier                 |
| `node scripts/generate-icons.mjs`       | Regenerates the favicon set from the logo's leaf-O |

Environment (set in Vercel / `.env.local`):

```bash
NEXT_PUBLIC_SITE_URL=https://www.your-domain.es   # canonicals, hreflang, sitemap, JSON-LD, OG
RESEND_API_KEY=re_...                              # quote form delivery (without it requests are only logged)
QUOTE_FROM_EMAIL="Eco Pintura <web@ecopintura.es>" # a sender on a domain verified in Resend
QUOTE_TO_EMAIL=hola@ecopintura.es                  # inbox (default)
```

## The idea

The whole site behaves like a freshly painted wall. Three motions, nothing else:

- **Encintar** (tape goes on): tape snaps over the hero photo, lays itself across Camp Nou and the process timeline.
- **Rodillo** (roller pass): hard-edged clip-path reveals; section colour changes are a roller pass with a ragged roller edge (`PaintedSection`), never a fade.
- **Despegar** (tape comes off): the hero tape peels on the first scroll; the contact tapes peel to leave a clean edge.

Signature pieces: the **Long Zoom** (pinned camera pull-back 1:1 → 1:5000), the **fan deck** of services
(drag, swipe, click or arrow keys), the **Obrelier** co-branded site log, the draggable **before/after roller**.

No custom cursor, no count-ups, no blur fade-ups, no gradients in UI, no icon set, radius 0.
`prefers-reduced-motion` gets a complete static version (Long Zoom un-pins into four stacked frames).

## Structure

```
app/[locale]/          home, /servicios, /obras, /contacto, 404 (es · ca · en)
app/api/quote          multipart quote endpoint (zod-validated, honeypot) → email via Resend (photos attached)
components/layout      Nav, MobileMenu, MobileActionBar, Footer, LanguageSwitch
components/sections    Hero, LongZoom, CampNou, FanDeck, ObrelierInsert, Projects, BeforeAfter, Process, Reviews, Faq, Contact, QuoteForm
components/motion      Wipe (hard-edged reveal), PaintedSection (roller pass between colours)
components/ui          Tape, Button (roller hover), TapeLink, Tags
lib/                   motion tokens, site facts, content (photos + deck colours), quote schema
messages/              es.json (default) · ca.json · en.json
assets/photos          STAND-IN photos (see below)
```

Fonts (Google, self-hosted by `next/font`): **Big Shoulders** pinned to its Display optical size, **Big Shoulders Stencil**,
**Schibsted Grotesk**; Syne / Figtree / IBM Plex Mono only inside the Obrelier insert (not preloaded).

## Credits

Site by [Yarel Craft Digital](https://yarelcraft.co.uk) (credited quietly in the footer).

## Before launch — must confirm with Eco Pintura

- [ ] **Camp Nou**: exact role and written OK from the main contractor / club to name the project and show photos. No crests or club marks are used.
- [ ] **Photos**: every image in `assets/photos` is a free-licence Unsplash stand-in. Replace with own photography (shot list in Figma › SEO & Copy). The before/after "before" is the same photo desaturated with a gotelé texture — replace with a real pair.
- [ ] **Contact facts** in `lib/site.ts` come from the shared office (IBRA Gestiones, Carrer de Pereda 86-88, Sant Adrià de Besòs): office +34 934 717 303. **Confirm +34 654 302 219 is on WhatsApp** (all WhatsApp buttons use it). Opening hours are not published — add them to `site.hours` once known.
- [ ] **Promises**: call-back within 24 working hours, fixed quote in 48 h, 3–5 days per flat.
- [ ] **Reviews** in `messages/*.json` are samples — real customers with written consent.
- [ ] **NCS codes** of the six deck colours (ideally from their paint supplier).
- [ ] **Obrelier**: official logo, real client-view screenshots (the phone is an illustrative mock), OK for the "Obra gestionada con Obrelier" badge.
- [ ] **Catalan copy** reviewed by a native speaker. Legal pages (aviso legal, privacidad, cookies) to be written.
- [ ] Resend: verify the sending domain, set the env vars above, and route hola@ecopintura.es.

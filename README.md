# Eco Pintura — Marketing Website

Premium marketing site for **Eco Pintura**, a professional eco-friendly painting company. Built with Next.js 15, React 19, Tailwind CSS, Motion, Lenis, and next-intl.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (Spanish default) or [http://localhost:3000/en](http://localhost:3000/en) (English).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run format` | Prettier |

## i18n

- **Spanish (default):** `/`, `/proyectos`, `/servicios`, `/contacto`
- **English:** `/en`, `/en/proyectos`, etc.
- Copy lives in `messages/es.json` and `messages/en.json`
- Language switcher preserves the current path

## Project structure

```
app/[locale]/     # Pages and layout
components/       # UI, sections, motion, brand
i18n/             # next-intl routing & navigation
lib/              # motion tokens, hooks, utils
messages/         # ES + EN copy
public/           # logo, strokes, OG image
```

## Adding real content

### Images

Replace placeholder gallery blocks in `components/sections/GallerySection.tsx` with `next/image` pointing to files in `public/placeholders/` or your CDN. Before/after slider colors can be swapped for real photos in `BeforeAfterSlider`.

### Quote form email

The API stub is at `app/api/quote/route.ts`. Connect your provider (Resend, SendGrid, etc.) at the marked integration point.

### Logo

SVG wordmark: `public/logo/eco-pintura.svg`. Ink/white variants: `components/brand/Logo.tsx`.

---

## Fill these in

Replace every `{{PLACEHOLDER}}` below across the site, `messages/*.json`, `app/sitemap.ts`, `app/robots.ts`, and `components/seo/JsonLd.tsx`.

| Placeholder | Where used |
|-------------|------------|
| `{{PHONE}}` | Footer, JSON-LD |
| `{{EMAIL}}` | Footer, JSON-LD |
| `{{ADDRESS}}` | Footer, JSON-LD |
| `{{CITY}}` | Footer, testimonials, JSON-LD |
| `{{SERVICE_AREA}}` | FAQ, JSON-LD |
| `{{DOMAIN}}` | sitemap, robots, metadata, JSON-LD |
| `{{COMPANY}}` | Testimonial sample (Laura M.) |
| `{{SOCIAL_INSTAGRAM}}` | Footer, JSON-LD |
| `{{SOCIAL_FACEBOOK}}` | Footer, JSON-LD |
| `{{SOCIAL_LINKEDIN}}` | Footer, JSON-LD |
| `{{STAT_*}}` | Hero trust row — currently inline copy (+500 proyectos · …) |
| `{{PROJECT_IMG_*}}` | Gallery placeholder `aria-label`s |
| `{{TEAM_MEMBER_*}}` / `{{TEAM_NAME_*}}` | About section team row |
| `{{TESTIMONIAL_*}}` | Testimonials marked as sample content |

## Deploy

Vercel-ready. Set `{{DOMAIN}}` in metadata/sitemap before going live.

## Stack

- Next.js App Router · React 19 · TypeScript (strict)
- Tailwind CSS 3.4 · CSS custom properties
- Motion (LazyMotion) · Lenis smooth scroll
- next-intl · react-hook-form · zod
- shadcn-style Radix primitives (Sheet, Accordion)

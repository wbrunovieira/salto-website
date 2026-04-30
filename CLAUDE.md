# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm email        # React Email dev server (previews src/emails/)
```

No test suite is configured.

## Architecture

**Marketing website** for Salto (sales strategy consultancy). Static generation + two API routes. No auth, no CMS, no database.

### Stack
- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (inline theme via CSS variables in `globals.css` — no `tailwind.config.*`)
- **next-intl 4** for i18n
- **Framer Motion** + **GSAP** for animations
- **Lenis** for smooth scroll
- **Resend** + **React Email** for transactional email templates
- **Vercel** for deployment + `@vercel/analytics`

### Routing
All pages live under `src/app/[locale]/`. Every page calls `generateStaticParams()` to pre-render all 4 locales (pt, en, es, it) at build time.

```
src/app/
  layout.tsx              # Near-empty shell (Facebook domain verification metadata only)
  [locale]/
    layout.tsx            # Real layout: providers, header, footer, scripts, JSON-LD
    page.tsx              # Home (single-page site)
    privacidade/page.tsx
  api/contact/route.ts      # Contact form — rate-limited, Resend integration
  api/meta-event/route.ts   # Meta Conversions API server-side relay
  robots.ts / sitemap.ts / og-image.tsx
```

`next.config.ts` wraps the config with `withNextIntl()` from `next-intl/plugin`, which wires up `src/i18n/request.ts` as the request config automatically.

### Middleware
The middleware file is **`src/proxy.ts`** (not `middleware.ts`). It runs `next-intl`'s locale middleware and is the only middleware in the project.

### i18n
Translations split by **locale + namespace**: `messages/<locale>/<namespace>.json`. Never a single file per locale. Config in `src/i18n/`:
- `routing.ts` — locales, defaultLocale (`pt`), cookie
- `navigation.ts` — typed `Link`, `redirect`, `usePathname`, `useRouter`
- `request.ts` — async `loadMessages()` (React cache), merges all namespaces

Namespaces: `common`, `nav`, `hero`, `services`, `process`, `about`, `contact`, `footer`, `cookies`, `stats`.

`request.ts` merges all namespace files into a **single flat object** — so translation keys must be unique across all namespaces or they will silently overwrite each other. In layout code use `getMessages()` from `next-intl/server` (not `loadMessages()` directly — that's an internal cache wrapper inside `request.ts`).

`LocaleDetector` (client component in `[locale]/layout.tsx`) auto-detects browser locale on first visit and persists the choice to `localStorage` key `salto_locale`. Subsequent visits restore the saved locale. The same key name is also used for the locale cookie defined in `routing.ts`.

### Component pattern
Heavy sections are split into a server wrapper + a `*Client.tsx`. The `*Client.tsx` imports the server component via `dynamic(() => import(...), { ssr: false })` and provides a skeleton fallback. This keeps GSAP and Framer Motion out of the SSR bundle. Example: `Hero.tsx` + `HeroClient.tsx`, `ScrollScene.tsx` + `ScrollSceneClient.tsx`.

### Animation rules
Three layers — pick the right one:
- **GSAP + ScrollTrigger**: scroll-linked timelines, scrubbed parallax, staggered entrance on scroll. Always dynamic-imported asynchronously to avoid SSR issues:
  ```ts
  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"), import("gsap/ScrollTrigger"),
  ]);
  ```
  All scroll animations live in `src/components/ScrollScene.tsx`.
- **Framer Motion**: simple entrance animations not tied to scroll (e.g. `WhatsAppFloat`, `CookieBanner`, hero badge/headline stagger). Consistent easing: `[0.22, 1, 0.36, 1]`.
- **CSS `@keyframes`**: header enter animation, hero glow/ring effects defined in `globals.css`.

### Styling
Tailwind v4 has no config file — theme tokens (colors, fonts, spacing) are defined as CSS custom properties inside `src/app/globals.css` under `@theme inline { … }`. Extend the theme there, not in a config file.

Key tokens: `--color-base` (#0e0e0e), `--color-surface` (#141414), `--color-border` (#252525), `--color-accent` (#ff5c00 orange), `--color-accent-hover` (#ff3d00), `--color-text-primary` (#f5f5f5), `--color-text-muted` (#888888). Tailwind utilities: `bg-base`, `bg-surface`, `border-border`, `bg-accent`, `text-text-primary`, `text-text-muted`.

Font is **Montserrat** (weights 400/700/900), loaded via `next/font/google`, exposed as `--font-montserrat` / `font-sans` utility.

### Meta Pixel + Conversions API
Browser pixel (`MetaPixel` component) and server-side `POST /api/meta-event` work together for deduplication. Both fire the same `event_id` so Meta counts them once. `MetaPixel` calls `window.fbq` (injected via `<Script>` in root layout) then immediately POSTs to `/api/meta-event`. The API route forwards to Meta's Graph API via `src/lib/meta-capi.ts`, hashing PII (email, phone) with SHA-256 before sending. Gracefully no-ops if `META_PIXEL_ACCESS_TOKEN` is absent.

### Contact API
`src/app/api/contact/route.ts` — in-memory rate limiting (5 req/IP/hour), honeypot field `_trap` (silent 200 on fill), sends two Resend emails (to Bruno + confirmation to visitor). Gracefully skips email if `RESEND_API_KEY` is absent. On successful submission the client also fires a Meta `Lead` pixel event with the same `leadEventId` for CAPI deduplication.

### Environment variables
| Variable | Required | Default |
|---|---|---|
| `RESEND_API_KEY` | Yes (email) | — |
| `META_PIXEL_ACCESS_TOKEN` | Yes (Meta CAPI) | — |
| `NEXT_PUBLIC_BASE_URL` | No | `https://saltoup.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | `5511982864581` |
| `RESEND_FROM_EMAIL` | No | `contato@saltoup.com` |

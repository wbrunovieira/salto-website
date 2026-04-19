# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

No test suite is configured.

## Architecture

**Marketing website** for Salto (sales strategy consultancy). Static generation + one API route. No auth, no CMS, no database.

### Stack
- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (inline theme via CSS variables in `globals.css` — no `tailwind.config.*`)
- **next-intl 4** for i18n
- **Framer Motion** + **GSAP** for animations
- **Resend** for transactional email
- **Vercel** for deployment + analytics

### Routing
All pages live under `src/app/[locale]/`. Every page calls `generateStaticParams()` to pre-render all 4 locales (pt, en, es, it) at build time.

```
src/app/
  [locale]/
    layout.tsx          # Root layout with locale providers
    page.tsx            # Home (single-page site)
    privacidade/page.tsx
  api/contact/route.ts  # Contact form — rate-limited, Resend integration
  robots.ts / sitemap.ts / og-image.tsx
```

### i18n
Translations split by **locale + namespace**: `messages/<locale>/<namespace>.json`. Never a single file per locale. Config in `src/i18n/`:
- `routing.ts` — locales, defaultLocale (`pt`), cookie
- `navigation.ts` — typed `Link`, `redirect`, `usePathname`, `useRouter`
- `request.ts` — async `loadMessages()` (React cache), merges all namespaces

Namespaces: `common`, `nav`, `hero`, `services`, `process`, `about`, `contact`, `footer`, `cookies`.

### Component pattern
Heavy sections are split into a server wrapper + a `*Client.tsx` for anything needing `"use client"` (animations, state). Example: `Hero.tsx` + `HeroClient.tsx`.

### Environment variables
| Variable | Required | Default |
|---|---|---|
| `RESEND_API_KEY` | Yes (email) | — |
| `NEXT_PUBLIC_BASE_URL` | No | `https://saltoup.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | `5511982864581` |
| `RESEND_FROM_EMAIL` | No | `contato@saltoup.com` |

### Styling notes
Tailwind v4 has no config file — theme tokens (colors, fonts, spacing) are defined as CSS custom properties inside `src/app/globals.css` under `@theme inline { … }`. Extend the theme there, not in a config file.

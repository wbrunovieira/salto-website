# Salto — Design System

> Reference for AI coding agents working on the Salto website. All tokens, patterns, and rules here reflect the actual codebase — not aspirational guidelines.

---

## Brand Personality

**Dark, warm, kinetic.** The palette is near-black with a single high-energy accent (electric orange). Energy comes from motion (glows, rings, typewriter) and contrast, not from color variety. Whitespace is generous; every element earns its place.

Salto is a PME sales consultancy. The aesthetic signals credibility and ambition — not startup-flashy, not corporate-cold.

---

## Color Tokens

All tokens are CSS custom properties defined in `src/app/globals.css` and registered as Tailwind utilities via `@theme inline`.

| Token | Hex | Tailwind utility | Role |
|---|---|---|---|
| `--color-base` | `#0E0E0E` | `bg-base` | Page background |
| `--color-surface` | `#141414` | `bg-surface` | Card / elevated surface |
| `--color-border` | `#252525` | `border-border` | Solid dividers, form inputs |
| `--color-accent` | `#FF5C00` | `bg-accent`, `text-accent` | Brand orange — CTAs, icons, highlights |
| `--color-accent-hover` | `#FF3D00` | `bg-accent-hover`, `text-accent-hover` | Deeper orange for gradients / hover |
| `--color-text-primary` | `#F5F5F5` | `text-text-primary` | Headings, body copy |
| `--color-text-muted` | `#888888` | `text-text-muted` | Supporting text, labels, placeholders |

### Opacity variants (no Tailwind token — write inline)

Dark sections use semi-transparent white instead of `--color-border` to create depth without visual weight:

```
Border resting:  rgba(255,255,255,0.08)   →  border-white/[0.08]
Border hover:    rgba(255,255,255,0.14)   →  hover:border-white/[0.14]
Surface resting: rgba(255,255,255,0.03)   →  bg-white/[0.03]
Surface hover:   rgba(255,255,255,0.06)   →  hover:bg-white/[0.06]
```

Use solid `border-border bg-surface` on light sections (`bg-[#0E0E0E]`). Use `border-white/[0.08] bg-white/[0.03]` on dark-coloured sections (`bg-[#120900]`, `bg-[#3d1a00]`, etc.).

### Section backgrounds

Sections are not all `bg-base`. The page has a warm-to-dark gradient arc:

| Section | Background |
|---|---|
| Hero | Transparent (rings + glow overlay) |
| Services | `#0E0E0E` |
| Stats | `#120900` |
| Process | `linear-gradient(to bottom, #3d1a00 0%, #1f0d00 45%, #0E0E0E 80%)` |
| About / Contact / Footer | `#0E0E0E` |

---

## Typography

**Font:** Montserrat (Google Fonts) — weights 400, 700, 900. No other font in the project.

```css
/* Loaded in src/app/[locale]/layout.tsx */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["Arial Black", "Arial", "sans-serif"],
});
```

Tailwind utility: `font-sans` (maps to `--font-montserrat`).

### Type scale

| Use | Classes |
|---|---|
| Hero headline | `text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-tight md:leading-[0.92] tracking-tight` |
| Section title | `text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-tight` |
| Card title | `text-xl font-black tracking-tight` or `text-base font-bold tracking-tight` |
| Body | `text-base md:text-lg text-text-muted leading-relaxed` |
| Small body | `text-sm text-text-muted leading-relaxed` |
| Badge / label | `text-[11px] font-bold tracking-[3px] uppercase` |
| Tag / pill | `text-[9px] font-bold tracking-[3px] uppercase` or `text-xs font-black tracking-[3px]` |
| Stat value | `text-5xl sm:text-6xl font-black tracking-tight` |

### Gradient text

Accent gradient is applied to section sub-headlines and the hero accent line:

```jsx
className="bg-gradient-to-r from-accent via-[#FF7A28] to-accent-hover bg-clip-text text-transparent"
```

White gradient is used for stat values and white-on-dark headings:

```jsx
className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent"
```

---

## Spacing & Layout

- Max content width: `max-w-5xl` (hero inner), `max-w-6xl` (services / process grids)
- Section horizontal padding: `px-6` on the section, grid inside
- Section vertical rhythm: `pt-32 pb-32` for major sections
- Card padding: `p-7` (services), `p-8` (process)
- Card gap: `gap-5` (services), `gap-6` (process)
- Scroll-offset for anchor links: `scroll-mt-20`

---

## Badges & Labels

Every section opens with a label badge. Consistent pattern:

```jsx
<span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[11px] font-bold tracking-[3px] uppercase text-text-muted border border-border bg-surface/50">
  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 animate-pulse" />
  LABEL TEXT
</span>
```

On dark warm sections (Process), swap to white variant:

```jsx
className="... text-white/70 border border-white/20 bg-white/10"
// dot: bg-white (no animate-pulse)
```

---

## Buttons / CTAs

### Primary CTA (orange gradient)

```jsx
<Link
  href={{ pathname: '/', hash: '#contact' }}
  className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-white overflow-hidden transition-[box-shadow] duration-300 shadow-[rgba(255,92,0,0.15)_0px_0px_0px_1px] hover:shadow-[rgba(255,92,0,0.15)_0px_0px_0px_1px,_0px_12px_32px_rgba(255,92,0,0.4)]"
>
  <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover" />
  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300" />
  <span className="relative">CTA text</span>
</Link>
```

**Key detail:** Use `transition-[box-shadow]` only — never `transition-all` — because GSAP's magnetic effect animates `transform` and CSS `transition-all` would interfere with it.

**Ring shadow pattern:** The resting `shadow-[rgba(255,92,0,0.15)_0px_0px_0px_1px]` is a 1px inset ring that keeps the button visually defined without a solid border. On hover it gains the drop glow.

### Secondary CTA (ghost)

```jsx
<Link
  href={{ pathname: '/', hash: '#services' }}
  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-text-muted border border-border transition-[box-shadow,border-color,color] duration-300 hover:border-accent hover:text-text-primary hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
>
```

### Submit button (form)

```jsx
className="... transition-all duration-300 shadow-[rgba(255,92,0,0.15)_0px_0px_0px_1px] hover:-translate-y-[2px] hover:shadow-[rgba(255,92,0,0.15)_0px_0px_0px_1px,_0px_12px_32px_rgba(255,92,0,0.4)]"
```

---

## Cards

### Dark section card (Services, Process)

```jsx
className="group relative p-7 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden"
```

- Always `rounded-2xl`
- Always `overflow-hidden` (for bottom accent line)
- Bottom accent line on hover (width animates 0 → full):

```jsx
<div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white/40 group-hover:w-full transition-all duration-500 rounded-b-2xl" />
```

### 3D tilt on hover (Services cards)

```jsx
onMouseMove={(e) => {
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width  - 0.5;
  const y = (e.clientY - rect.top)  / rect.height - 0.5;
  gsap.to(el, { rotateX: -y * 10, rotateY: x * 10, transformPerspective: 800, duration: 0.3, ease: "power2.out" });
}}
onMouseLeave={(e) => {
  gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
}}
```

---

## Animation System

Three distinct layers — each has a defined scope. Do not mix.

### 1. GSAP + ScrollTrigger

Scroll-linked timelines, scrubbed parallax, staggered entrance on scroll. Lives exclusively in `src/components/ScrollScene.tsx`. Always dynamic-imported to avoid SSR:

```ts
const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
  import("gsap"), import("gsap/ScrollTrigger"),
]);
```

Hero typewriter animation also uses GSAP (in `Hero.tsx`) — triggers on mount, not scroll.

### 2. Framer Motion

Simple entrance animations not tied to scroll (e.g. `WhatsAppFloat`, `CookieBanner`).  
Consistent easing: `[0.22, 1, 0.36, 1]`.

### 3. CSS `@keyframes` (globals.css)

| Animation | Class | Use |
|---|---|---|
| Header slide-in | `header-animate` | Header enter |
| Logo fade-left | `logo-animate` | Header logo |
| Nav items cascade | `nav-item-animate-1` … `nav-item-animate-5` | Header nav |
| Right slot fade | `right-animate` | Header CTA area |
| Hero glow pulse | (applied inline on `.hero-glow-center`) | Hero ambient glow |
| Concentric rings | `.hero-ring` + `.hero-ring-1` … `.hero-ring-5` | Hero background rings |
| Scroll indicator | `.hero-scroll-line` | Bottom scroll hint |
| Skeleton shimmer | `.skeleton` | Loading skeletons |

### Magnetic CTA (Hero)

Buttons inside `#hero-cta` get a magnetic pull effect via GSAP `mousemove`. Uses `transition-[box-shadow]` on the button so CSS and GSAP transforms don't conflict:

```ts
const onMove = (e: MouseEvent) => {
  const { left, top, width, height } = el.getBoundingClientRect();
  const x = (e.clientX - left - width / 2) * 0.45;
  const y = (e.clientY - top - height / 2) * 0.45;
  gsap.to(el, { x, y, duration: 0.25, ease: "power2.out" });
};
const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
```

---

## Hero Background Effects

```
hero-noise      — SVG fractalNoise at 8% opacity, 128px tile, repeating
hero-glow-center — radial gradient (accent → transparent), blur 90px, animated pulse
hero-glow-corner — radial gradient top-right corner, 7% opacity
hero-ring-{1-5}  — 5 concentric rings at sizes 280/480/700/940/1200px, breathing animation
```

All positioned with `absolute pointer-events-none`.

---

## Form Inputs

```jsx
className="w-full px-4 py-3 rounded-xl bg-base border border-border text-text-primary placeholder-text-muted/60 text-sm focus:outline-none focus:border-accent/50 transition-colors duration-200"
```

- Height: `h-12` / `py-3` → ~48px
- Border-radius: `rounded-xl` (12px)
- Focus state: `border-accent/50` (not full accent — subtle)
- Autofill override in globals.css forces `#0E0E0E` background and `#F5F5F5` text

---

## Icons

All icons are inline SVGs — no icon library. Style: `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `strokeWidth="1.5"`, `strokeLinecap="round"`, `strokeLinejoin="round"`. Size set via `w-` / `h-` on the wrapper `div`.

---

## Section Dividers

Gradient horizontal lines used at section tops/bottoms:

```jsx
// Top divider (warm)
<div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-accent/30 to-transparent pointer-events-none z-20" />

// Full-width 1px divider
<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

// Overlap gradient (hides section seam)
<div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0E0E0E] to-transparent pointer-events-none z-10" />
```

---

## Skeleton Loading

```jsx
className="skeleton"
// CSS: shimmer gradient animation, border-radius 8px
// Use with explicit width/height to prevent CLS
```

---

## Responsive Breakpoints

Tailwind defaults — no custom breakpoints configured:
- `sm`: 640px  
- `md`: 768px  
- `lg`: 1024px  

Grid columns: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (services), `grid-cols-1 md:grid-cols-2` (process).

---

## Do Not

- Add a second typeface — Montserrat only
- Use colors outside the token set without adding a CSS variable in `globals.css`
- Use `transition-all` on elements with GSAP `transform` animations
- Add border-radius other than `rounded-xl` (inputs) or `rounded-2xl` (cards) or `rounded-full` (badges/buttons)
- Use `@keyframes` in component files — all keyframes live in `globals.css`
- Use solid `border-border` on dark warm sections — use `border-white/[0.08]` instead

# KaryaHub — Responsive Design System
> Mobile-first. Most KaryaHub users on mobile are students; UMKM owners also skew mobile.

---

## 1. Breakpoint System

```ts
// tailwind.config.ts screens — matches Tailwind defaults with one addition
screens: {
  'xs': '375px',   // small phones (iPhone SE)
  'sm': '640px',   // large phones, landscape
  'md': '768px',   // tablets, split view
  'lg': '1024px',  // small laptops
  'xl': '1280px',  // desktop
  '2xl': '1536px', // wide desktop
}
```

| Breakpoint | Device Class | Columns | Side Margin | Gutter |
|---|---|---|---|---|
| `xs` 375–639px | Small phone | 4 col | 16px | 12px |
| `sm` 640–767px | Large phone | 4 col | 20px | 16px |
| `md` 768–1023px | Tablet | 8 col | 40px | 20px |
| `lg` 1024–1279px | Small laptop | 12 col | 60px | 24px |
| `xl` 1280–1535px | Desktop | 12 col | 120px | 24px |
| `2xl` 1536px+ | Wide desktop | 12 col | auto (max-w) | 24px |

**Max content width:** `1400px`, centred with `mx-auto`.

---

## 2. Landing Page Responsive Behaviour

### Hero Section
```
Desktop (xl):
┌──────────────────────────────────────────────────────┐
│  [Left 55%] Headline + sub + CTAs                    │
│  [Right 45%] Hero illustration SVG                   │
└──────────────────────────────────────────────────────┘

Tablet (md):
┌──────────────────────────────────────────────────────┐
│  [Left 60%] Headline + sub + CTAs                    │
│  [Right 40%] Illustration (smaller)                  │
└──────────────────────────────────────────────────────┘

Mobile (< md):
┌──────────────────────────────────────────────────────┐
│  Illustration (centred, 240px tall)                  │
│  Headline (h1 size, left-aligned)                    │
│  Sub + CTAs (stacked, full-width)                    │
└──────────────────────────────────────────────────────┘
```

### Stats Row (120+ Peluang Karier, 50+ Perusahaan Mitra, 10K+ Mahasiswa Aktif)
- Desktop: 3 columns inline  
- Mobile: 3 columns, smaller type, centred

### Features Grid (Find Opportunities / Build Skills / Build Portfolio)
- Desktop: 3-col equal  
- Tablet: 3-col equal (smaller cards)  
- Mobile: 1-col stacked

### Career Journey Timeline (1→5 steps)
- Desktop: horizontal 5-step row with connecting line  
- Tablet: horizontal, compressed  
- Mobile: vertical stacked list, left-border line

### Recommendations Carousel
- Desktop: 4 cards visible, no scroll  
- Tablet: 3 cards, edge peek  
- Mobile: 1.2 cards visible, horizontal scroll, snap to card

---

## 3. Dashboard Responsive Behaviour

### Sidebar
```
Desktop (xl):  Fixed sidebar 240px, main content offset left 240px
Laptop (lg):   Collapsible sidebar — collapsed 64px default, expanded on hover/click
Tablet (md):   Sidebar hidden, accessible via hamburger → slides in as overlay (80% width)
Mobile (< md): No sidebar — replaced by bottom tab bar (4 items)
```

### Bento Grid — Dashboard Home
```
Desktop (xl):  4 columns, rows auto
┌──────────┬────────┬────────┬──────────┐
│ Career   │ Active │ Stats  │ Journey  │
│ Score    │ Jobs   │ (2 st) │ Progress │
│ (2 col)  │ (1 col)│        │ (1 col)  │
├──────────┴────────┴────────┴──────────┤
│ Recommendations (4 col full width)    │
└───────────────────────────────────────┘

Tablet (md): 2 columns
┌────────────┬────────────┐
│ Career     │ Active     │
│ Score      │ Jobs       │
├────────────┴────────────┤
│ Stats row (2 col)       │
├─────────────────────────┤
│ Recommendations         │
└─────────────────────────┘

Mobile (< md): 1 column, stacked
Career Score → Quick Stats → Active Jobs → Recommendations
```

### Dashboard Layout (Tailwind Grid)
```tsx
// Bento grid container
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6">
  {/* Career Readiness — spans 2 cols on desktop */}
  <div className="col-span-1 md:col-span-1 xl:col-span-2 row-span-1 xl:row-span-2">
    <CareerScoreCard />
  </div>
  {/* Remaining cells */}
</div>
```

---

## 4. Typography — Responsive Scale

| Token | Mobile | Tablet | Desktop |
|---|---|---|---|
| `text-display` | → `text-h1` (2.5rem) | → 3rem | 3.5rem |
| `text-h1` | 2rem | 2.25rem | 2.5rem |
| `text-h2` | 1.5rem | 1.75rem | 2rem |
| `text-h3` | 1.25rem | 1.375rem | 1.5rem |
| `text-body-lg` | 1rem | 1.0625rem | 1.125rem |

```tsx
// Responsive headline example
<h1 className="text-h1 md:text-[2.25rem] xl:text-display font-extrabold leading-tight">
  Build Your Career,<br />
  <span className="text-lime-500">Not Just Your CV.</span>
</h1>
```

---

## 5. Navigation — Responsive

### Mobile Bottom Tab Bar
```tsx
// src/components/shared/bottom-nav.tsx
// Only rendered on < md screens inside dashboard layout
<nav
  className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-bg-surface border-t border-border-default"
  style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
  aria-label="Mobile navigation"
>
  <ul className="flex h-16">
    {tabs.map(tab => (
      <li key={tab.href} className="flex-1">
        <Link href={tab.href} className={cn(
          'flex flex-col items-center justify-center h-full gap-0.5 text-[10px] font-medium transition-colors',
          isActive ? 'text-lime-500' : 'text-text-muted'
        )}>
          <tab.icon size={22} aria-hidden="true" />
          <span>{tab.label}</span>
        </Link>
      </li>
    ))}
  </ul>
</nav>
```

### Main Content Padding for Bottom Nav
```tsx
// Dashboard layout — add bottom padding on mobile
<main className="pb-0 md:pb-0 pb-20"> {/* 80px = bottom nav height */}
```

---

## 6. Cards — Responsive

| Card Type | Mobile | Tablet | Desktop |
|---|---|---|---|
| Job recommendation card | Full width | 2-col grid | 4-col grid |
| Stats card | 2-col grid (2 per row) | 4-col inline | 4-col inline |
| Profile section | Stacked | Side-by-side | Side-by-side |
| Escrow timeline | Full width vertical | Full width | 560px max-width |

### Horizontal Scroll Cards (Mobile)
```tsx
// Recommendation cards — mobile scroll container
<div className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mx-5 px-5 md:grid md:grid-cols-3 xl:grid-cols-4 md:overflow-visible md:mx-0 md:px-0">
  {jobs.map(job => (
    <div key={job.id} className="snap-start shrink-0 w-[280px] md:w-auto">
      <JobCard job={job} />
    </div>
  ))}
</div>
```

---

## 7. Images — Responsive

```tsx
// Hero illustration — responsive sizing
<div className="relative w-full max-w-[480px] mx-auto md:mx-0 xl:max-w-[560px]">
  <Image
    src="/images/hero-illustration.svg"
    alt=""
    role="presentation"
    width={560}
    height={480}
    className="w-full h-auto"
    priority
  />
</div>
```

---

## 8. Safe Areas (iOS/Android)

```css
/* globals.css — handle notch and home indicator */
:root {
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
}

.navbar-safe { padding-top: var(--safe-top); }
.bottom-nav-safe { padding-bottom: var(--safe-bottom); }
```

---

## 9. Performance Guidelines

- **Images:** Use `next/image` for all raster. Serve WebP. Hero illustration is SVG (no format conversion needed).  
- **Fonts:** `display: swap`. Preload Plus Jakarta Sans 400 and 700 only. Other weights loaded on demand.  
- **Icons:** Tree-shake Lucide — only import used icons (`import { Upload } from 'lucide-react'`).  
- **Animation:** Use `will-change: transform` on animated bento cards, remove after animation ends.  
- **Carousel:** Intersection Observer for lazy-loading off-screen job cards.  
- **Core Web Vitals targets:** LCP < 2.5s, CLS < 0.1, INP < 200ms.

---

## 10. Testing Breakpoints (DevTools)

Test at these exact widths before release:

| Width | Why |
|---|---|
| 375px | iPhone SE — smallest supported |
| 390px | iPhone 14 Pro |
| 414px | iPhone 14 Plus |
| 768px | iPad mini |
| 1024px | iPad Air landscape / small laptop |
| 1280px | Standard desktop |
| 1440px | Common designer canvas size |
| 1920px | Wide monitor — verify max-width clamp |

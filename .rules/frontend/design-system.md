# KaryaHub — Design System
> Single source of truth for all design tokens.  
> All values map directly to Tailwind CSS custom properties in `tailwind.config.ts`.

---

## 1. Colour Tokens

### Base Palette

| Token | Hex | Usage |
|---|---|---|
| `color-navy-950` | `#0D1B33` | Primary brand, headings, navbar bg |
| `color-navy-800` | `#1A3055` | Dark card backgrounds, sidebar |
| `color-navy-600` | `#2C4F7C` | Secondary text on dark surfaces |
| `color-navy-200` | `#C5D3E8` | Dividers on dark surfaces |
| `color-lime-500` | `#A7C416` | **Primary accent** — CTAs, highlights, progress |
| `color-lime-400` | `#BBDA1C` | Hover state of lime elements |
| `color-lime-100` | `#F0F7D0` | Tinted lime surface (skill tags, success bg) |
| `color-bg-base` | `#FAFBFD` | Page background — warm off-white |
| `color-bg-surface` | `#FFFFFF` | Card and panel background |
| `color-bg-subtle` | `#F2F4F8` | Input backgrounds, hover states |
| `color-text-primary` | `#0F172A` | Body text (near-black, not pure black) |
| `color-text-secondary` | `#4B5563` | Supporting text, captions |
| `color-text-muted` | `#9CA3AF` | Placeholder, disabled text |
| `color-text-inverse` | `#FAFBFD` | Text on Navy/dark backgrounds |
| `color-border-default` | `#E4E8EF` | Default card/input borders |
| `color-border-focus` | `#A7C416` | Focus rings |

### Semantic Colours

| Token | Value | Usage |
|---|---|---|
| `color-success` | `#22C55E` | Approved, completed states |
| `color-warning` | `#F59E0B` | Pending, revision requested |
| `color-error` | `#EF4444` | Errors, rejected, failed |
| `color-info` | `#3B82F6` | Info banners, neutral notifications |

### Match Score Semantic

| Score | Background | Text | Token |
|---|---|---|---|
| ≥ 80% | `#A7C416` | `#0D1B33` | `match-high` |
| 60–79% | `#0D1B33` | `#FAFBFD` | `match-mid` |
| < 60% | `#F2F4F8` | `#4B5563` | `match-low` |

---

## 2. Typography

**Primary face:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) — variable, weights 300–800  
**Mono (code/IDs only):** [Geist Mono](https://vercel.com/font) — weight 400 only

```css
/* Import in globals.css */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
```

### Type Scale

| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `text-display` | 56px / 3.5rem | 1.05 | 800 | Landing hero headline |
| `text-h1` | 40px / 2.5rem | 1.1 | 700 | Page titles |
| `text-h2` | 32px / 2rem | 1.15 | 700 | Section headings |
| `text-h3` | 24px / 1.5rem | 1.2 | 600 | Card headings |
| `text-h4` | 20px / 1.25rem | 1.25 | 600 | Sub-section titles |
| `text-body-lg` | 18px / 1.125rem | 1.6 | 400 | Lead paragraphs |
| `text-body` | 16px / 1rem | 1.6 | 400 | Default body text |
| `text-body-sm` | 14px / 0.875rem | 1.5 | 400 | Supporting text |
| `text-caption` | 12px / 0.75rem | 1.4 | 500 | Labels, badges, meta |
| `text-mono` | 13px / 0.8125rem | 1.4 | 400 | IDs, code snippets |

### Type Rules
- **Never** use `text-display` on mobile — scale down to `text-h1`
- **Never** set body text below `text-body-sm` (14px)
- `font-weight: 800` is reserved for display headlines only
- Letter-spacing: `-0.02em` on display + h1, `0` everywhere else

---

## 3. Spacing Scale

Base unit: **8px**. All spacing is a multiple.

```
sp-1  =  4px   (hairline gaps, icon padding)
sp-2  =  8px   (tight internal component spacing)
sp-3  = 12px   (input vertical padding)
sp-4  = 16px   (card internal padding sm)
sp-5  = 20px   (mobile section gutter)
sp-6  = 24px   (card internal padding default)
sp-8  = 32px   (section element gap)
sp-10 = 40px   (tablet side margin)
sp-12 = 48px   (section vertical gap sm)
sp-16 = 64px   (section vertical gap md)
sp-20 = 80px   (section vertical gap lg)
sp-24 = 96px   (desktop hero padding)
```

---

## 4. Border & Radius

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | `6px` | Badges, tags, small pills |
| `radius-md` | `10px` | Buttons, inputs |
| `radius-lg` | `14px` | Default cards |
| `radius-xl` | `20px` | Large dashboard cards, bento cells |
| `radius-2xl` | `28px` | Modal panels |
| `radius-full` | `9999px` | Avatar, toggle, match % pill |
| `border-width-default` | `1px` | All borders |
| `border-width-focus` | `2px` | Focus rings |

### Card Border Style
Default card: `border: 1px solid #E4E8EF` + `border-radius: 14px` + **no shadow**.  
Hover card: `border-color: #C5D3E8` + `box-shadow: 0 4px 16px rgba(13,27,51,0.06)`.  
Active/selected card: `border-color: #A7C416` + `box-shadow: 0 0 0 3px rgba(167,196,22,0.15)`.

> No decorative shadows on static cards. Shadow is a hover affordance only.

---

## 5. Elevation & Shadow

Only three shadow levels. Use sparingly.

| Token | Value | Context |
|---|---|---|
| `shadow-card-hover` | `0 4px 16px rgba(13,27,51,0.06)` | Card hover state |
| `shadow-dropdown` | `0 8px 24px rgba(13,27,51,0.10)` | Dropdowns, popovers |
| `shadow-modal` | `0 20px 60px rgba(13,27,51,0.16)` | Modals, sheets |

---

## 6. Iconography

Library: **Lucide React** (consistent stroke width 1.5px, 24×24 default).  
Colour: Always inherits `currentColor` — never hardcode hex on icons.  
Size variants: `16px` (inline), `20px` (button), `24px` (default), `32px` (feature).  
Active state: Wrap in lime `color-lime-500`, not navy.

---

## 7. Tailwind Config Mapping

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0D1B33',
          800: '#1A3055',
          600: '#2C4F7C',
          200: '#C5D3E8',
        },
        lime: {
          500: '#A7C416',
          400: '#BBDA1C',
          100: '#F0F7D0',
        },
        bg: {
          base: '#FAFBFD',
          surface: '#FFFFFF',
          subtle: '#F2F4F8',
        },
        border: {
          default: '#E4E8EF',
          focus: '#A7C416',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.05', fontWeight: '800' }],
        'h1':      ['2.5rem',  { lineHeight: '1.1',  fontWeight: '700' }],
        'h2':      ['2rem',    { lineHeight: '1.15', fontWeight: '700' }],
        'h3':      ['1.5rem',  { lineHeight: '1.2',  fontWeight: '600' }],
        'h4':      ['1.25rem', { lineHeight: '1.25', fontWeight: '600' }],
        'body-lg': ['1.125rem',{ lineHeight: '1.6',  fontWeight: '400' }],
        'body-sm': ['0.875rem',{ lineHeight: '1.5',  fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.4',  fontWeight: '500' }],
      },
      borderRadius: {
        sm: '6px', md: '10px', lg: '14px',
        xl: '20px', '2xl': '28px',
      },
      boxShadow: {
        'card-hover': '0 4px 16px rgba(13,27,51,0.06)',
        'dropdown':   '0 8px 24px rgba(13,27,51,0.10)',
        'modal':      '0 20px 60px rgba(13,27,51,0.16)',
      },
      spacing: {
        '18': '4.5rem', '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 8. Dark Mode Strategy

KaryaHub does **not** ship dark mode in MVP. The Navy sidebar on dashboards serves as a contained dark surface.  
Post-MVP: implement `class` strategy with `dark:` variants, not `media` strategy.

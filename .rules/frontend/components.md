# KaryaHub — Component Library
> All components are built with shadcn/ui as the base layer, then customised with KaryaHub tokens.  
> File: `src/components/` — see folder structure in architecture docs.

---

## 1. Button

Four variants. One size hierarchy. No icon-only buttons without a tooltip.

### Variants

| Variant | Background | Text | Border | Usage |
|---|---|---|---|---|
| `primary` | `#A7C416` | `#0D1B33` | none | Main CTA, 1 per view |
| `secondary` | `#0D1B33` | `#FAFBFD` | none | Important secondary action |
| `outline` | transparent | `#0D1B33` | `1px #E4E8EF` | Tertiary, cancel |
| `ghost` | transparent | `#4B5563` | none | In-table, inline actions |

### Sizes

| Size | Height | Padding H | Font | Usage |
|---|---|---|---|---|
| `sm` | 32px | 12px | `text-caption 500` | Badge-level, table actions |
| `md` | 40px | 16px | `text-body-sm 600` | Default |
| `lg` | 48px | 24px | `text-body 600` | Hero CTA, modal CTA |

### States
- **Hover:** `primary` → `#BBDA1C`; `secondary` → `#1A3055`; scale `1.015`
- **Active:** scale `0.98`
- **Disabled:** `opacity: 0.4`, cursor `not-allowed`, no hover effects
- **Loading:** Replace label with `<Loader2 className="animate-spin" size={16} />`, width locked

### Code Pattern
```tsx
// src/components/ui/button.tsx — extend cva variants
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-180 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed active:scale-98',
  {
    variants: {
      variant: {
        primary:   'bg-lime-500 text-navy-950 hover:bg-lime-400 hover:scale-[1.015]',
        secondary: 'bg-navy-950 text-bg-base hover:bg-navy-800 hover:scale-[1.015]',
        outline:   'border border-border-default text-navy-950 hover:border-navy-200 hover:bg-bg-subtle',
        ghost:     'text-text-secondary hover:text-text-primary hover:bg-bg-subtle',
      },
      size: {
        sm: 'h-8 px-3 text-caption',
        md: 'h-10 px-4 text-body-sm',
        lg: 'h-12 px-6 text-body',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)
```

---

## 2. Card — Bento Cell

The foundational layout unit. Never nest a card inside a card.

### Variants

| Variant | Style | Usage |
|---|---|---|
| `default` | White bg, `border-default`, `radius-lg` | Standard content |
| `navy` | `navy-950` bg, white text | Sidebar panels, dark callouts |
| `lime-tinted` | `lime-100` bg, `border: 1px lime-500` | Highlighted metrics, CTAs |
| `ghost` | Transparent, `border-default` dashed | Empty states, add-new placeholders |

### Anatomy
```
┌─ Card ──────────────────────────────┐
│  ┌─ CardHeader ─────────────────┐   │  ← optional, 24px padding
│  │  eyebrow (caption)           │   │
│  │  CardTitle (h3/h4)           │   │
│  └──────────────────────────────┘   │
│  ┌─ CardContent ────────────────┐   │  ← 24px padding, 0 top if header
│  │  children                    │   │
│  └──────────────────────────────┘   │
│  ┌─ CardFooter ─────────────────┐   │  ← optional, border-top
│  │  actions                     │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## 3. Badge / Tag

Used for: skill tags, job status, match score, project category.

| Type | Style | Example |
|---|---|---|
| `skill` | `lime-100` bg, `navy-950` text, `radius-sm` | `Next.js` |
| `status-open` | `success` bg tint, success text | `OPEN` |
| `status-progress` | `warning` bg tint, warning text | `IN PROGRESS` |
| `status-done` | `navy-950` bg, white | `COMPLETED` |
| `match-high` | `lime-500` bg, `navy-950` text, bold | `92% Match` |
| `match-mid` | `navy-950` bg, white | `74% Match` |
| `category` | `bg-subtle`, `text-secondary` | `Web Design` |

Font: `text-caption` (12px, weight 500). Padding: `4px 8px`. No uppercase unless `status`.

---

## 4. Input & Form

### Text Input
```
Height: 40px (md), 48px (lg)
Border: 1px solid #E4E8EF, radius-md
Background: #FAFBFD (bg-base)
Padding: 0 16px
Font: text-body-sm, text-primary

Focus: border-color #A7C416, ring 0 0 0 3px rgba(167,196,22,0.18)
Error: border-color #EF4444, ring 0 0 0 3px rgba(239,68,68,0.12)
Disabled: opacity 0.5, bg-subtle, cursor not-allowed
```

### Textarea
Same as input, `min-height: 96px`, `resize: vertical`.

### Select
Custom select with Radix UI. Chevron icon right-side. Options list uses `shadow-dropdown`.

### Form Label
`text-body-sm`, weight `600`, `navy-950`. Always above input. Never placeholder-as-label.

### Error Message
`text-caption`, `color-error`, with `AlertCircle` icon (16px) inline left.

---

## 5. Navigation

### Navbar (Landing)
- Height: 64px, sticky, `bg-bg-surface/90 backdrop-blur-md`
- Logo left, nav links centre, auth CTA right
- Nav links: `text-body-sm 500 text-secondary`, hover → `text-primary`
- Active page: `text-navy-950 font-600` + 2px lime underline bottom

### Sidebar (Dashboard)
- Width: 240px (expanded), 64px (collapsed)
- Background: `navy-950`
- Logo: white version
- Nav items: `text-body-sm text-navy-200`, icon 20px
- Active item: `lime-500` left border (3px) + `text-bg-base` + subtle `navy-800` bg
- Collapse toggle: bottom of sidebar, `ChevronLeft` icon

### Mobile Bottom Nav (< 768px)
4 items max: Dashboard, Opportunities, Projects, Profile.  
Active: lime icon + lime label. Inactive: muted icon, no label.

---

## 6. Career Readiness Ring

Signature data component. Used in: dashboard hero card, profile page, job detail match score.

```tsx
// SVG ring component — stroke-based
// Props: score (0–100), size ('sm'|'md'|'lg'), showLabel
const RADIUS = { sm: 28, md: 44, lg: 60 }
const STROKE = { sm: 4, md: 6, lg: 8 }

// Foreground: stroke="#A7C416"
// Background track: stroke="#E8EBF0"
// strokeDasharray: circumference
// strokeDashoffset: circumference * (1 - score/100)
// animation: transition strokeDashoffset 800ms ease-in-out on mount
```

Centre label: `text-h3 font-700 navy-950` for `md` size. Below: `text-caption muted`.

---

## 7. Notification / Toast

Position: top-right, 24px from edges. Max 3 stacked.

| Type | Left border | Icon |
|---|---|---|
| Success | `color-success` | `CheckCircle` |
| Error | `color-error` | `XCircle` |
| Info | `color-info` | `Info` |
| Warning | `color-warning` | `AlertTriangle` |

Style: `bg-bg-surface`, `shadow-dropdown`, `radius-lg`, 320px wide.  
Duration: 4s auto-dismiss. Progress bar bottom shows remaining time.

---

## 8. Escrow Status Timeline

Visual representation of payment flow state. Lives in `components/escrow/transaction-timeline.tsx`.

```
◉ Payment Created      [timestamp]
│
◉ Funds Held (Escrow)  [timestamp]
│
○ Work in Progress     [status pill]
│
○ Submission Review    [pending]
│
○ Funds Released       [locked]
```

Active step: lime filled circle. Past steps: navy filled. Future: grey empty circle.  
Connector line: 2px, dashed grey → solid navy when complete.

---

## 9. Empty States

Every empty state has three elements: illustration (SVG, 120px), message, and action.

| Context | Message | Action |
|---|---|---|
| No proposals | "No proposals yet" | "Browse open projects →" |
| No notifications | "You're all caught up" | none — positive state |
| No wallet activity | "No transactions yet" | "Find your first project →" |
| ATS not scanned | "Upload your CV to see your score" | "Upload CV" button |
| No UMKM jobs posted | "Post your first project" | "Create Project" button |

Illustration: simple line SVG, 2px stroke, lime accent detail.

---

## 10. Modal / Dialog

- Overlay: `bg-navy-950/40 backdrop-blur-sm`
- Panel: `bg-bg-surface`, `radius-2xl`, `shadow-modal`, max-width 560px
- Close button: top-right `X` icon, `ghost` variant
- Animation: scale `0.95→1.00` + fade, 200ms
- Footer: right-aligned, `gap-3`, cancel (outline) left of confirm (primary)

---

## 11. Skeleton Loader

Use skeleton instead of spinners for content areas. Animate with a subtle shimmer.

```css
/* shimmer animation */
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton {
  background: linear-gradient(90deg, #E4E8EF 25%, #F2F4F8 50%, #E4E8EF 75%);
  background-size: 800px 100%;
  animation: shimmer 1.4s infinite linear;
  border-radius: 6px;
}
```

Skeleton shapes mirror the real content's dimensions exactly.

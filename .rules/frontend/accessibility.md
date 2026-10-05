# KaryaHub — Accessibility Guidelines
> Target: **WCAG 2.1 Level AA** minimum.  
> Audience: Students and UMKM owners — many on mid-range Android devices with assistive tech.

---

## 1. Colour Contrast

All text must meet AA contrast ratios against its background.

| Pair | Ratio | Status |
|---|---|---|
| `#0F172A` on `#FAFBFD` | 17.5 : 1 | ✅ AAA |
| `#0D1B33` on `#A7C416` (button label) | 8.1 : 1 | ✅ AAA |
| `#FAFBFD` on `#0D1B33` (secondary btn) | 17.5 : 1 | ✅ AAA |
| `#4B5563` on `#FAFBFD` | 6.8 : 1 | ✅ AA |
| `#9CA3AF` on `#FAFBFD` | 2.9 : 1 | ⚠️ Fail — only use for decorative/disabled |
| `#A7C416` on `#FAFBFD` | 3.1 : 1 | ⚠️ Fail — never use lime as text colour on white |

**Critical rule:** Lime `#A7C416` must NEVER be used as text colour on white/off-white backgrounds. Use it only as a fill (badge bg, progress ring, button bg, border accent).

### Colour-Blind Considerations
- Match score: always pair colour with percentage number text  
- Status badges: always pair colour with text label — never colour alone  
- Progress bars: always pair with numeric label  

---

## 2. Focus Management

### Visible Focus Ring
All interactive elements must have a visible focus indicator.

```css
/* Global focus style — overrides browser default */
:focus-visible {
  outline: 2px solid #A7C416;
  outline-offset: 3px;
  border-radius: 6px;
}

/* For dark surfaces (sidebar) */
.sidebar :focus-visible {
  outline-color: #BBDA1C;
}
```

Never use `outline: none` without providing an alternative focus indicator.

### Focus Order
1. Skip-to-main-content link (visually hidden until focused, appears top-left)
2. Navbar logo → nav links → auth buttons
3. Main content, left to right, top to bottom
4. Modal traps focus within the overlay; returns to trigger on close

```tsx
// Skip link — first element in <body>
<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-lime-500 focus:text-navy-950 focus:rounded-md focus:font-semibold">
  Skip to main content
</a>
```

---

## 3. Keyboard Navigation

| Element | Keys | Behaviour |
|---|---|---|
| Button / Link | `Enter`, `Space` | Activate |
| Select / Dropdown | `Enter` open, `↑↓` navigate, `Esc` close | |
| Modal | `Esc` close, `Tab` cycle within | Focus trap active |
| Sidebar nav | `Tab` / `Shift+Tab` cycle items | |
| Progress ring | n/a (decorative) | `aria-hidden="true"` |
| Toast | `Esc` dismiss | Focus returns to trigger |
| Career score card | Tab to card | Reads "Career Readiness Score: 72 out of 100" |

---

## 4. ARIA Patterns

### Page Landmark Structure
```html
<header role="banner">         <!-- Navbar -->
<nav aria-label="Main">        <!-- Primary navigation -->
<main id="main-content">       <!-- Page content -->
<aside aria-label="Sidebar">   <!-- Dashboard sidebar -->
<footer role="contentinfo">    <!-- Footer -->
```

### Dashboard Sidebar
```tsx
<nav aria-label="Dashboard navigation">
  <ul role="list">
    <li>
      <a aria-current={isActive ? 'page' : undefined}
         aria-label="Dashboard overview">
        <LayoutDashboard aria-hidden="true" />
        <span>Dashboard</span>
      </a>
    </li>
  </ul>
</nav>
```

### Career Readiness Ring
```tsx
<div
  role="meter"
  aria-valuenow={score}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={`Career readiness score: ${score} out of 100`}
>
  <svg aria-hidden="true">...</svg>
  <span className="sr-only">{score}% career readiness</span>
</div>
```

### Job Card
```tsx
<article aria-label={`${job.title} by ${job.employer.companyName}`}>
  <h3>{job.title}</h3>
  <p aria-label="Budget">{formatRupiah(job.budget)}</p>
  <span aria-label={`Match score: ${job.matchScore}%`}>{job.matchScore}% Match</span>
</article>
```

### Loading States
```tsx
// Skeleton: announce to screen readers
<div role="status" aria-label="Loading projects">
  <span className="sr-only">Loading...</span>
  {/* skeleton elements */}
</div>

// After load, announce with live region
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {loaded && `${jobs.length} projects loaded`}
</div>
```

### Toasts
```tsx
<div
  role="alert"            // for error/warning
  // role="status"        // for success/info
  aria-live="assertive"   // error
  // aria-live="polite"   // success
  aria-atomic="true"
>
```

---

## 5. Images & Icons

- All meaningful images: descriptive `alt` text  
- Decorative images (hero illustration, background SVGs): `alt=""` + `role="presentation"`  
- Icons inside buttons: `aria-hidden="true"` on icon, accessible label on button  
- Company logos: `alt="[Company name] logo"`  
- Avatar images: `alt="[User name]'s profile photo"`

```tsx
// Icon button — correct pattern
<button aria-label="Close notification">
  <X size={16} aria-hidden="true" />
</button>

// Button with icon + text — icon hidden
<button>
  <Upload size={16} aria-hidden="true" />
  Upload CV
</button>
```

---

## 6. Forms

- Every input has an explicit `<label>` with `htmlFor` matching input `id`  
- Never rely on placeholder as the only label  
- Required fields: `aria-required="true"` + visual asterisk with `<span aria-hidden="true">*</span>`  
- Error association: `aria-describedby` linking input to error message  
- Success: `aria-describedby` linking to helper text

```tsx
<div>
  <label htmlFor="email" className="...">
    Email address
    <span aria-hidden="true" className="text-error ml-1">*</span>
  </label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-describedby={error ? "email-error" : "email-hint"}
    aria-invalid={!!error}
  />
  {error && (
    <p id="email-error" role="alert" className="text-caption text-error">
      <AlertCircle size={12} aria-hidden="true" /> {error}
    </p>
  )}
</div>
```

---

## 7. Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Keep opacity transitions — they're safe */
  .fade-transition {
    transition: opacity 200ms ease !important;
  }
}
```

Progress ring: when reduced motion, render at final value with no animation.

---

## 8. Touch & Mobile

- Minimum touch target: **44×44px** (WCAG 2.5.5)  
- Nav items: minimum height 48px on mobile  
- Bottom sheet handles: 48px grab area  
- Swipeable cards: provide button alternative for all swipe actions  
- Font size: never below 14px on mobile (system zoom still applies)

---

## 9. Audit Checklist (pre-release)

Run before each release:

- [ ] `axe-core` or `@axe-core/react` zero critical violations  
- [ ] `eslint-plugin-jsx-a11y` zero warnings  
- [ ] Tab through entire page — every interactive element reachable  
- [ ] Screen reader test (VoiceOver on Safari, TalkBack on Android)  
- [ ] Zoom to 200% — no content lost or overlapping  
- [ ] Keyboard-only form completion — login, post job, submit proposal  
- [ ] Colour contrast check on new components — use Stark or Colour Contrast Analyser  
- [ ] All images have alt text — no empty alt on meaningful images  

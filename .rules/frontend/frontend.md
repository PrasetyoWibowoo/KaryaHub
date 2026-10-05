# KaryaHub — Frontend Design Rules
> Version 1.0 · Modern Career / Gen Z-Professional  
> Concept stack: **Minimalist · Bento · Editorial · SaaS · Gen Z**

---

## 1. Design Philosophy

KaryaHub speaks to Gen Z students and young professionals who are sharp, confident, and done with corporate fluff. Every UI decision should feel like it was made by someone who cares deeply about craft — not by a committee filling a template.

**Three guiding tensions this design resolves:**

| Tension | Resolution |
|---|---|
| Serious career platform vs. youthful energy | Deep Navy authority + Lime accent vitality |
| Feature-rich SaaS vs. minimalist aesthetic | Bento grid: information density without clutter |
| Editorial confidence vs. friendly approachability | Plus Jakarta Sans: geometric but warm |

**Single memorable element rule:** The lime `#A7C416` accent is the one bold move. Everything else — backgrounds, cards, type — stays disciplined around it. Never add a second accent colour.

---

## 2. Voice & Tone

- **Confident, not arrogant.** "Your career starts here" not "We are the best platform."  
- **Friendly, not casual.** Sentence case everywhere. No slang, no em-dashes as decoration.  
- **Direct.** CTAs say exactly what happens: "Explore Projects" not "Get Started Today."  
- **Human.** Write from the student's perspective. "Find work that fits your skill" not "Our AI matches you."

**Sentence case always.** ALL CAPS only for badge labels (`OPEN`, `NEW`, skill tags) — never for headings or body.

---

## 3. Layout System

### Grid
```
Desktop (≥1280px) : 12-column, 80px gutter, 120px side margin
Tablet  (768–1279) : 8-column,  24px gutter, 40px side margin
Mobile  (< 768px)  : 4-column,  16px gutter, 20px side margin
```

### Bento Principle
Bento grid is the primary layout language for dashboards and feature sections.  
Cards snap to a **8px base unit**. All spacing is a multiple of 8.

```
┌──────────────────────────┬────────────┐
│  2×2 Hero / Career Score │  1×2 Stat  │
├──────────┬───────────────┤            │
│ 1×1 Quick│  1×2 Activity │            │
│  Action  │   Feed        ├────────────┤
├──────────┴───────────────┤  1×1 CTA   │
│     3×1 Recommendations  │            │
└──────────────────────────┴────────────┘
```

- Large cards (2×2, 3×1): primary metrics and action flows  
- Medium cards (1×2): secondary context and lists  
- Small cards (1×1): quick stats or shortcuts  

### Editorial Sections (Landing)
Landing page alternates between **full-bleed editorial moments** and **contained content**.  
Odd sections: left-heavy, right illustration. Even sections: right-heavy, left illustration.  
Never centre-align a paragraph of body text on desktop.

---

## 4. Motion

Subtle and purposeful. One orchestrated moment per page, not scattered effects.

| Context | Motion | Duration | Easing |
|---|---|---|---|
| Page load hero | Fade-up (12px Y) | 400ms | `cubic-bezier(0.22,1,0.36,1)` |
| Card hover | Scale 1.00→1.015 + shadow lift | 180ms | `ease-out` |
| Progress ring fill | Stroke-dashoffset sweep | 800ms | `ease-in-out` |
| Badge appear | Scale 0.8→1 + fade | 200ms | `spring` |
| Sidebar expand | Width animate | 250ms | `ease-out` |
| Toast notification | Slide-in from right (24px) | 220ms | `ease-out` |

`@media (prefers-reduced-motion: reduce)` — disable all transforms, keep opacity fades only.

Never animate every card on scroll. Animate the **section entry once** (landing) or **data arrival** (dashboard).

---

## 5. Illustration & Photography

### Illustration Style
- **Line weight:** 2px, rounded caps  
- **Fill:** Flat, no gradients on characters  
- **Characters:** Gender-neutral, racially diverse, simplified faces  
- **Colour palette:** Navy body/clothing, Lime highlights, Off-white skin tones  
- **Context:** Always show activity (working, presenting, building) — never just standing

### Photography
- Used sparingly: UMKM partner logos, user avatars only  
- Always circular crop for avatars  
- Company logos: grayscale on light sections, white on dark sections  
- No stock photo hero imagery — use SVG illustration instead

### SVG Hero Asset
The main CTA SVG (person holding MacBook) lives at `public/images/hero-illustration.svg`.  
Rules for modifications:
- Do not add gradients to the character  
- Lime accent appears only on the MacBook screen glow and one clothing detail  
- Character faces: simple geometric, no photorealism

---

## 6. Data Visualisation

Progress-oriented. All data tells a story about growth.

- **Career Readiness Ring:** Stroke-based SVG circle. Foreground = Lime. Background track = `#E8EBF0`.  
- **Skill bars:** Horizontal, height 6px, rounded. Filled = Navy. Empty = `#E8EBF0`.  
- **Match percentage badge:** Filled pill, colour-coded: ≥80% Lime bg + Navy text, 60–79% Navy bg + white, <60% Muted bg.  
- **Activity feed:** Left-border timeline, 2px Navy line, circular dot markers.  
- Never use pie/donut charts — they are hard to read at small sizes and carry no directional meaning.

---

## 7. Content Rules

- Max line length: **68 characters** (desktop), **52 characters** (mobile)  
- Headings never break mid-phrase on mobile — use `word-break: keep-all` for Indonesian  
- Empty states: always include an action. "No projects yet. Browse open projects →"  
- Error messages: explain what happened + how to fix. Never just "Something went wrong."  
- Numeric formatting: `Rp 750.000` (dot as thousands separator, Indonesian standard)

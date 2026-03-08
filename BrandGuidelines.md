# IRONFORGE GYM — Brand Guidelines

> *"No shortcuts. No excuses. Just iron, sweat, and the relentless pursuit of your best self."*

---

## Table of Contents

1. [Brand Identity](#1-brand-identity)
2. [Color Palette](#2-color-palette)
3. [Typography](#3-typography)
4. [Logo & Naming](#4-logo--naming)
5. [Voice & Tone](#5-voice--tone)
6. [Layout & Spacing](#6-layout--spacing)
7. [UI Components](#7-ui-components)
8. [Motion & Animation](#8-motion--animation)
9. [Iconography & Imagery](#9-iconography--imagery)
10. [Do's & Don'ts](#10-dos--donts)

---

## 1. Brand Identity

**IronForge** is a premium, dark-aesthetic gym brand built for people who are serious about training. The brand communicates intensity, discipline, and transformation — it does not cater to the casual or uncommitted.

### Brand Pillars

- **Intensity** — Bold visuals, strong typography, high-contrast design
- **Authenticity** — No fluff, no filler — direct, honest language
- **Transformation** — The brand exists to push members past their limits
- **Community** — Elite, tight-knit, achievement-driven culture

### Target Audience

- Age 18–45, fitness-motivated individuals
- Intermediate to advanced gym-goers
- Athletes, competitors, and serious beginners looking to commit
- Urban-dwelling, design-aware consumers

---

## 2. Color Palette

The IronForge palette is built on near-blacks and a signature combat red. The palette should feel raw, powerful, and uncompromising.

### Primary Colors

| Name | Hex | Usage |
|---|---|---|
| **Forge Black** | `#0a0a0a` | Primary background |
| **Dark Surface** | `#111111` | Section backgrounds |
| **Card Surface** | `#161616` | Cards, panels, input fields |
| **Combat Red** | `#e8192c` | Primary accent, CTAs, highlights |
| **Red Dim** | `#9b0f1c` | Borders on featured elements, hover states |

### Secondary Colors

| Name | Hex | Usage |
|---|---|---|
| **Bone White** | `#f0ede8` | Primary text |
| **Light Grey** | `#c5c2bc` | Body text, secondary content |
| **Mid Grey** | `#888880` | Labels, captions, placeholder text |
| **Border** | `#2a2a2a` | Dividers, card borders, input outlines |

### Color Usage Rules

- **Never** use pure white (`#ffffff`) — always use Bone White (`#f0ede8`) for warmth
- **Never** use the red as a background for large areas — reserve it for accents, CTAs, and the marquee strip
- Maintain a minimum contrast ratio of **4.5:1** for all body text against backgrounds
- Red on black is the hero combination — use it intentionally, not liberally

---

## 3. Typography

IronForge uses a two-font system: one for display impact, one for readability.

### Font Stack

| Role | Font | Fallback |
|---|---|---|
| **Display / Headlines** | Bebas Neue | Impact, sans-serif |
| **UI / Subheadings / Labels** | Barlow Condensed | Arial Narrow, sans-serif |
| **Body / Paragraphs** | Barlow | Arial, sans-serif |

All fonts are sourced from Google Fonts.

```
https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@300;400;600;700&family=Barlow:wght@300;400;500&display=swap
```

### Type Scale

| Element | Font | Size | Weight | Letter Spacing |
|---|---|---|---|---|
| Hero Title | Bebas Neue | clamp(5rem, 9vw, 9rem) | 400 | 0.02em |
| Section Title | Bebas Neue | clamp(3rem, 5vw, 5rem) | 400 | 0.02em |
| Card Heading | Barlow Condensed | 1.3rem | 700 | 0.05em |
| Section Tag | Barlow Condensed | 0.75rem | 600 | 0.3em |
| Nav Links | Barlow Condensed | 0.85rem | 600 | 0.15em |
| Body Text | Barlow | 0.9–1rem | 300–400 | normal |
| Labels / Captions | Barlow Condensed | 0.7–0.8rem | 600 | 0.15–0.2em |

### Typography Rules

- Section tags always appear in **UPPERCASE** with `//` prefix: `// Section Name`
- All caps for navigation links, labels, button text, and badges
- Hero line-height: **0.92** — tight stacking is intentional
- Body line-height: **1.7** — generous for readability against dark backgrounds
- Never mix Bebas Neue with italic styling — it has no italic variant

---

## 4. Logo & Naming

### Logotype

The IronForge logo is a wordmark — **IRON** in Bone White + **FORGE** in Combat Red, set in Bebas Neue at 2–2.5rem, letter-spacing 0.1em.

```
IRON[FORGE]
  ↑     ↑
White  Red
```

### Naming Conventions

- Always written as: **IronForge** (camel case, one word)
- In display/all-caps contexts: **IRONFORGE**
- Never: "Iron Forge", "iron forge", "IRON forge", or "Ironforge"
- Tagline: **"Forge Your Legacy"**

### Clear Space

Maintain a minimum clear space equal to the cap-height of the "I" on all sides of the logotype. Never crowd the logo with other elements.

### Logo Don'ts

- Do not recolor the logo outside of approved palette
- Do not stretch or distort the wordmark
- Do not place on busy photographic backgrounds without a dark overlay
- Do not use a font other than Bebas Neue for the wordmark

---

## 5. Voice & Tone

IronForge speaks like a seasoned coach — direct, motivating, and no-nonsense. It respects the intelligence of its audience.

### Voice Characteristics

- **Direct** — Short sentences. Active verbs. No filler words.
- **Confident** — Never hedges. States facts and outcomes clearly.
- **Motivating** — Pushes, challenges, and believes in the reader.
- **Gritty** — Raw language is OK. Polished corporate-speak is not.

### Tone Examples

| Context | Do | Don't |
|---|---|---|
| CTA Button | "Start Today" / "Join Elite" / "Go Titan" | "Sign Up Now!" / "Get Started Today!" |
| Hero Subtitle | "No shortcuts. No excuses." | "We offer a wide variety of fitness programs..." |
| Trainer Bio | "12 years competing at national level." | "Marcus is passionate about helping clients reach their goals." |
| Section Tag | `// Inside the Forge` | "Our Amazing Facility" |
| Pricing Intro | "No Hidden Costs" | "Affordable Plans for Everyone" |

### Punctuation & Style

- Use em dashes (—) for pauses and emphasis, not hyphens
- Periods after short declarative statements, even in lists
- Avoid exclamation marks — intensity comes from word choice, not punctuation
- Numbers under 10 can be written as numerals for impact: "3 plans", "4 trainers"

---

## 6. Layout & Spacing

### Grid System

- **Desktop:** Full-width layout with `4rem` (64px) horizontal padding
- **Hero:** 2-column grid (60/40 split) — text left, graphic right
- **Content sections:** Single column with constrained max-width or multi-column grids
- **Cards:** CSS Grid with `1px` gaps (border effect, not white-space gaps)

### Section Structure

Every content section follows this hierarchy:

```
[Section Tag]      ← 0.75rem, uppercase, red, with // prefix
[Section Title]    ← Bebas Neue, large, 2-line max
[Content Grid]     ← Appropriate layout for content type
```

### Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `xs` | 0.5rem | Tight internal spacing |
| `sm` | 1rem | Component internals |
| `md` | 1.5–2rem | Between related elements |
| `lg` | 3rem | Between sections components |
| `xl` | 4–6rem | Section padding (vertical) |

### Diagonal Dividers

Use `clip-path: polygon(0 0, 100% 40%, 100% 100%, 0 100%)` to create angled transitions between alternating dark sections. This adds visual flow without borders.

---

## 7. UI Components

### Buttons

**Primary CTA**
- Background: `#e8192c`
- Text: Bone White, Barlow Condensed, 0.9rem, 700 weight, 0.2em letter-spacing, uppercase
- Padding: `1rem 2.5rem`
- No border radius — sharp corners only
- Hover: lighten to `#ff1f34`, translateY(-2px)

**Ghost / Secondary**
- No background, no border
- Color: Mid Grey, transitions to Bone White on hover
- Trailing arrow `→` animates right on hover
- Font: Barlow Condensed, uppercase

**Nav CTA**
- Same as Primary but with `0.6rem 1.5rem` padding (compact)
- Sits inside the navigation bar

### Cards

All cards share these properties:
- Background: `#161616`
- No border radius
- `1px` gap borders between grid items (not individual card borders)
- Left accent bar (3px red) appears on hover via `::before` pseudo-element
- Transition: `background 0.3s`, `border-color 0.3s`

### Form Elements

- Background: `#161616` (matches cards)
- Border: `1px solid #2a2a2a`
- Focus border: `1px solid #e8192c`
- No border radius
- Font: Barlow, 0.9rem
- Labels: Barlow Condensed, 0.75rem, uppercase, 0.2em spacing, Mid Grey
- No `<form>` wrapper required — use event handlers

### Section Tags

Pattern: `// SECTION NAME`

```css
font-family: 'Barlow Condensed';
font-size: 0.75rem;
font-weight: 600;
letter-spacing: 0.3em;
text-transform: uppercase;
color: #e8192c;
```

The `//` prefix is added via CSS `::before` content at 50% opacity.

### Marquee Strip

- Background: Combat Red (`#e8192c`)
- Text: Bebas Neue, 1.2rem, 0.15em spacing, near-white
- Infinite horizontal scroll, 20s duration
- Items separated by `✦` at 50% opacity
- Content duplicated for seamless loop

---

## 8. Motion & Animation

### Principles

- Motion should feel **heavy and deliberate** — not bouncy or playful
- Use `ease` (not `ease-in-out` or `spring`) for most transitions
- Staggered entry animations create more impact than simultaneous reveals

### Page Load Animations

Hero elements animate in sequentially using `fadeUp`:

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

| Element | Delay |
|---|---|
| Section tag | 0.2s |
| Hero title | 0.4s |
| Hero subtitle | 0.6s |
| CTA buttons | 0.8s |
| Stats bar | 1.0s |

### Scroll Reveal

All below-fold content uses an `IntersectionObserver` with:
- `threshold: 0.1`
- `opacity: 0 → 1`, `translateY(30px → 0)`
- `transition: 0.7s ease`
- Stagger delay classes: `.reveal-delay-1` through `.reveal-delay-4` (0.1s increments)

### Hover States

| Component | Effect |
|---|---|
| Gallery items | `scale(1.05)` on inner image |
| Trainer cards | Bottom border animates from 0 to 100% width |
| Class cards | Left red bar slides from 0 to 100% height |
| Pricing buttons | Background fills red |
| Testimonial cards | Left border changes from grey to red |

### Custom Cursor

- Small red dot (12px) tracks mouse position directly
- Larger ring (36px) follows with `0.12` lerp factor for lag effect
- Uses `mix-blend-mode: difference` on the dot
- Scales up on interactive element hover

### Pulsing Animation

Used on the map pin:

```css
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 6px rgba(232,25,44,0.2), 0 0 0 12px rgba(232,25,44,0.1); }
  50%       { box-shadow: 0 0 0 10px rgba(232,25,44,0.15), 0 0 0 20px rgba(232,25,44,0.05); }
}
```

Duration: 2s, infinite.

---

## 9. Iconography & Imagery

### Photography Style

- **Tone:** Dark, moody, high-contrast — not bright studio lighting
- **Color grading:** Shadows crushed to black, highlights warm/neutral
- **Subjects:** Action shots, sweat, effort, real athletes (not stock-model poses)
- **Avoid:** Smiling gym selfies, overly polished or generic fitness imagery

### Placeholder / Gradient Panels

When photography is unavailable, use directional gradients built on the palette:

```css
/* Warm (weights/power) */
background: linear-gradient(135deg, #1a0a0b 0%, #0d0d0d 100%);

/* Cool (cardio/endurance) */
background: linear-gradient(135deg, #050d1a 0%, #1a1a1a 100%);

/* Neutral dark */
background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
```

### Background Textures

Subtle grid overlays reinforce the industrial aesthetic:

```css
background:
  repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(232,25,44,0.03) 61px),
  repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(232,25,44,0.03) 61px);
```

### Large Background Text

Decorative oversized text (e.g., "FIT", "FIND US") uses:
- Font: Bebas Neue
- Color: `rgba(232,25,44,0.025)` — barely visible
- Position: Absolute, behind all content
- `pointer-events: none`, `user-select: none`

### Icons / Emoji

Use emoji sparingly for contact info icons only (📍🕐📞✉️). In production, replace with an SVG icon system (Lucide, Phosphor, or custom).

---

## 10. Do's & Don'ts

### Design

| Do | Don't |
|---|---|
| Use sharp, square corners on all components | Use border-radius on cards, buttons, or inputs |
| Keep the red accent intentional and sparse | Paint everything red — it loses its impact |
| Use `gap: 1px` to create border-like grid separators | Add visible borders around every element |
| Let negative space breathe in dark sections | Fill every pixel — the darkness is part of the brand |
| Use Bebas Neue only for display/titles | Use it for body text or long-form copy |

### Brand & Tone

| Do | Don't |
|---|---|
| Write in short, punchy sentences | Write long, corporate paragraphs |
| Use the tagline "Forge Your Legacy" consistently | Invent new taglines per campaign without approval |
| Name the brand "IronForge" (one word, camel case) | Write "Iron Forge", "iron forge", or "IRONFORGE" inconsistently |
| Let results and numbers do the talking ("12K+ Members") | Make vague promises ("the best gym in town") |

### Color

| Do | Don't |
|---|---|
| Use Bone White (`#f0ede8`) for primary text | Use pure `#ffffff` |
| Reserve Combat Red for CTAs and section tags | Use red as a background color for large sections |
| Maintain dark card surfaces against dark backgrounds | Use white or light cards — they break the aesthetic |

---

*Brand Guidelines v1.0 — IronForge Gym*
*Last updated: March 2026*

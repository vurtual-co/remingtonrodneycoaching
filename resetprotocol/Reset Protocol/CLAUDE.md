# The Reset Protocol — Claude.md

## The Vision

This is not a coaching website. It is not a crypto website.
It is the first moment of the reset itself.

Someone lands here burnt out, moving fast, disconnected from what they actually want.
By the time they reach the CTA they should already feel different than when they arrived.

**The scroll is a meditation. Build it that way.**

Every decision — spacing, timing, color, copy weight — should serve one outcome:
slowing the nervous system down enough to hear something true.

---

## The Feeling

**References to hold in mind while building:**

- The light on water at 5am before anyone else is awake
- Standing at altitude and feeling genuinely small for the first time in months
- That specific exhale when you finally stop pretending everything is fine
- A product so considered it makes you trust the person who made it

**Not:**
- A Web3 project with dark mode
- A coaching brand with an aesthetic
- Anything that feels like it was designed to convert

---

## Brand

### Colors
```css
:root {
  --obsidian:    #0D0D0D;   /* Background — dominates every surface */
  --carbon:      #111111;   /* Cards, inset sections */
  --rule:        #1C1C1C;   /* Dividers — barely visible */
  --white:       #FFFFFF;   /* Primary text, logo */
  --smoke:       #888888;   /* Secondary text, labels, captions */
  --ash:         #444444;   /* Tertiary — barely there */

  --teal:        #277570;   /* Slate Teal — the accent. Use sparingly. */
  --teal-deep:   #1A4F4C;   /* Hover darken, borders */
  --teal-glow:   rgba(39, 117, 112, 0.08);  /* Subtle section tints */
  --teal-mid:    rgba(39, 117, 112, 0.4);   /* Hover states */
}
```

**The teal rule:** One or two words per section maximum. Dividers. Hover states.
The moment it appears more than twice in a section it loses everything that makes it work.

### Typography
```css
:root {
  --font: 'PP Neue Montreal', 'Inter', 'Helvetica Neue', Arial, sans-serif;

  --text-hero:   clamp(52px, 9vw, 120px);
  --text-h1:     clamp(36px, 5vw, 72px);
  --text-h2:     clamp(24px, 3vw, 40px);
  --text-body:   clamp(15px, 1.8vw, 18px);
  --text-small:  13px;
  --text-micro:  11px;

  --tracking-wide:    0.08em;
  --tracking-widest:  0.2em;
  --leading-tight:    1.05;
  --leading-body:     1.75;
}
```

**Type rules:**
- All headings: `text-transform: uppercase`
- Never italic. Never underline in navigation.
- Wide tracking on every heading — this is non-negotiable
- Font weight: 700 headlines / 400 body / 500 for UI labels

### Logo
The logomark is an SVG toggle: white circle left, black crescent gap, white pill right.
File: `../assets/logo/logo.png` (also available as SVG)
White on black only. Never scaled below 32px height. Never on a non-black surface.

---

## Animation Philosophy

This is where the brand lives. Get this right.

**Core principle: every animation should feel like breathing, not performing.**

```css
/* The only timing you need */
--ease-slow:   cubic-bezier(0.16, 1, 0.3, 1);   /* Scroll reveals */
--ease-mid:    cubic-bezier(0.4, 0, 0.2, 1);     /* Hover transitions */
--ease-gentle: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Subtle floats */

--duration-reveal: 1.2s;
--duration-hover:  0.4s;
--duration-micro:  0.2s;
```

### Scroll Reveals
Every section element fades in on scroll. No exceptions. No instant appearances.

```javascript
// Standard reveal — use this everywhere
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // fire once only
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity var(--duration-reveal) var(--ease-slow),
              transform var(--duration-reveal) var(--ease-slow);
}
[data-reveal].visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger children with data-delay="1", "2", "3" */
[data-delay="1"] { transition-delay: 150ms; }
[data-delay="2"] { transition-delay: 300ms; }
[data-delay="3"] { transition-delay: 450ms; }
[data-delay="4"] { transition-delay: 600ms; }
```

### Allowed Premium Animations
These are on. Use them with intention.

**Parallax depth** — hero background elements move at 0.3× scroll speed
```javascript
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  heroBg.style.transform = `translateY(${y * 0.3}px)`;
});
```

**Floating elements** — slow, organic vertical drift for the logo mark or accent shapes
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}
.float { animation: float 6s var(--ease-gentle) infinite; }
```

**Cursor — custom crosshair**
```css
body { cursor: none; }
/* Render a small teal dot that follows the cursor */
/* 12px circle, #277570, 0.6s lag behind actual position */
```

**Horizontal ticker** — logo bar, infinite scroll, pauses on hover
```css
@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.ticker-track {
  animation: ticker 30s linear infinite;
  display: flex;
  width: max-content;
  gap: 80px;
  align-items: center;
}
.ticker-track:hover { animation-play-state: paused; }
.ticker-wrapper {
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
}
```

**Text character reveals** — hero headline only. Each character fades in sequentially.
```javascript
// Split headline into spans, stagger opacity 0→1 per character
// Total duration: ~1.8s across all characters
// Delay: 800ms after page load
```

**Teal line draw** — thin horizontal accent lines animate width from 0 → final width on reveal
```css
.accent-line {
  width: 0;
  height: 1px;
  background: var(--teal);
  transition: width 1.4s var(--ease-slow);
}
.accent-line.visible { width: 60px; }
```

**Section background tint** — when the "The Reality" section enters the viewport,
a very subtle `--teal-glow` wash fades in behind the text over 2s. Barely visible. Felt not seen.

### Off. These Never Happen.
- No bounce or spring easing
- No rotate transforms on text
- No scale-up reveals (translateY only)
- No looping background animations behind body copy
- No particle systems
- No cursor trail effects (the custom cursor is enough)
- No aggressive section transitions

---

## Layout

```css
/* Sections */
section {
  min-height: 100vh;
  padding: clamp(64px, 10vw, 128px) clamp(24px, 6vw, 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Max content width */
.container { max-width: 1200px; margin: 0 auto; width: 100%; }
.container--narrow { max-width: 800px; }
.container--text   { max-width: 680px; }
```

**Spacing philosophy:**
If it feels like there's too much space — add more.
The whitespace is load-bearing. It creates the slow-down.

---

## Nature & Texture

This brand lives at the intersection of Web3 precision and natural stillness.
Don't be afraid to suggest that texture.

**Allowed:**
- Very subtle CSS grain overlay on hero (noise SVG, 3–5% opacity)
- Faint teal horizontal rule lines as section dividers (1px, #1C1C1C)
- The ocean or mountain in the background of the coach photo section — let the environment breathe

**Keep it invisible:** The texture should be felt subconsciously. If someone notices it,
it's too strong.

```css
/* Grain overlay — hero section only */
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* noise SVG */
  opacity: 0.04;
  pointer-events: none;
  z-index: 1;
}
```

---

## Sections & Copy

### 01 — NAV
Fixed. Transparent on load. On scroll: `background: rgba(13,13,13,0.92)`, `backdrop-filter: blur(12px)`.

Logo left. CTA button right: `APPLY` — teal border, teal text, hover fills teal.
Nav disappears on scroll down, reappears on scroll up (scroll-direction detection).

### 02 — HERO
Full screen. Centered. Staggered character-by-character headline reveal.

```
Label:    // PERFORMANCE RESET
Headline: WEB3 DOESN'T HAVE
          AN OFF SWITCH.
          YOU NEED ONE.          — "ONE." in teal

Sub:      This industry runs 24/7 and rewards you for keeping up.
          Nobody talks about the cost.

Buttons:  [APPLY FOR THE RESET]  [THE PROTOCOL →]
```

Scroll indicator: thin teal vertical line, 48px, pulsing opacity.

### 03 — TICKER
`// PART OF THE JOURNEY`
Infinite logo scroll. 12 brands. White SVGs. Mask fade edges.

### 04 — THE REALITY
Full screen. Max-width 720px. Each line reveals independently.

```
The market does not care that it is 3am.
Telegram does not care that you have not eaten.
Your investors do not care that you are running on empty.

[400ms pause]

But somewhere between the momentum and the milestones,
something got lost.

[Smaller, muted:]
You are not stuck. You are not failing.
You are just moving so fast you can't hear yourself anymore.
```

### 05 — THE FOUNDER
Two column. Photo left (full bleed, no border-radius). Story right.
Credentials below story as a definition-list style block.

```
// THE FOUNDER
REMINGTON LANGSTON RODNEY

[Story — see copy doc]

DOMAIN          Web3 Recruitment & Ecosystem Building
BACKGROUND      18 Years Competitive Athletics · $10M+ Revenue
CONFERENCES     ETH Denver · ETH CC
PERFORMED FOR   Coinbase · Polkadot · Galaxy · Near Foundation
PODCAST         2 Years · Dragonfly, Optimism, OpenSea, Blockworks
```

### 06 — THE PROTOCOL
Three rows. Number in teal. Title in white. Body in smoke.
Outcome tag at end of each row: small, uppercase, teal.

```
PHASE_01  THE AUDIT       → NERVOUS SYSTEM RESTORED
PHASE_02  THE CLARITY     → BLIND SPOTS IDENTIFIED
PHASE_03  THE INSTALL     → SUSTAINABLE EXECUTION INSTALLED

Price: $1,500 · Private 1:1 · 3 Weeks
```

### 07 — FIELD DATA (Testimonials)
Pull quote hero. Three cards below.
Cards: `background: #111111`, 1px `#1C1C1C` border, no border-radius.
Opening quotation mark in teal at 48px.

```
Featured: "The only regret you will have is not working with him sooner."
          — SOPHIA · FOUNDER

Hugh · Max · Nilo (see copy doc for full quotes)
```

### 08 — APPLY CTA
Full screen. Centered.

```
// WORK WITH REMINGTON

YOU DO NOT NEED
ANOTHER FRAMEWORK.
You need a reset.

[APPLY FOR THE RESET]

$1,500 · Limited spots · Private 1:1
3-Month Program available. $4,500.
```

### 09 — FOOTER
```
THE RESET PROTOCOL © 2026        theresetprotocol.xyz        BALI, INDONESIA
```
One line. Thin teal rule above.

---

## Assets

```
../assets/
  logo/
    logo.png           — Main logomark (use in nav + hero)
    logo.svg           — Vector version
  images/
    remi-hero.jpg      — Hero section photo
    remi-coach.jpg     — Founder section photo
  logos/               — Brand partner logos (white SVGs for ticker)
    coinbase.svg
    polkadot.svg
    galaxy.svg
    near.svg
    dragonfly.svg
    opensea.svg
    electric-capital.svg
    blockworks.svg
    gauntlet.svg
    eth-denver.svg
    ethcc.svg
    soho-house.svg
```

---

## Tech

- Single `index.html` — styles in `<head>`, scripts before `</body>`
- Vanilla JS only. No jQuery. No frameworks.
- Google Fonts: `Inter` as fallback until PP Neue Montreal is licensed
- IntersectionObserver for all scroll reveals
- CSS custom properties for everything
- Semantic HTML throughout
- All images need `alt` text
- Vercel-ready on completion — no build step required

---

## The Standard

Before shipping any section, ask:

1. **Does this slow someone down?** If the element creates urgency or busyness — remove it.
2. **Does every word earn its place?** If a sentence could be cut without losing meaning — cut it.
3. **Would this exist on a premium site in a different industry?** Apple. Aesop. A high-end retreat brand. If it would look cheap there, it looks cheap here.
4. **Is the teal doing too much?** If it appears more than twice in a section, pull it back.
5. **Does this hold up at 375px?** Mobile is where most people will feel it first.

The goal is not a website that looks good.
The goal is a website that makes someone stop, exhale, and think:
*"This person understands something I haven't been able to say out loud."*

Build toward that.

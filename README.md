# Hemsagar ❤️ Archana — Our Forever

> *"Two souls. One promise. One forever."*  
> *Blessed by love, family and Sri Krishna.*

An immersive, cinematic, luxury digital keepsake and proposal website crafted specifically by **Hemsagar** for **Archana**. Designed with Vrindavan temple gold, Krishna emerald, peacock teal, and warm ivory aesthetics, featuring scroll-driven storytelling, tactile micro-interactions, procedural Krishna bansuri flute synthesis, and an emotional proposal climax.

---

## 🦚 Narrative Sequence & Features

The experience is structured across 15 curated emotional moments:

1. **Section 0 — Minimal Monogram Loader**: Lightweight `H ♥ A` gold ring loader that vanishes immediately once the hero asset is ready (no artificial delays).
2. **Section 1 — Cinematic Entrance**: Atmospheric emerald opening screen with Archana's illuminated portrait, dedicated message ("I made something only for you"), and an entrance gesture initiating audio and View Transitions.
3. **Section 2 — Hero**: High-priority couple portrait, Vrindavan light aura, subtle desktop pointer parallax, and line-level typography reveals.
4. **Section 3 — Quiet Transition**: A reflective breathing space before the love letter ("Some stories begin loudly. Ours simply felt right.").
5. **Section 4 — Love Letter & The Promise**: The emotional center of the website featuring line-by-line reveals of the sacred promise ("I promise to respect you, stand beside you, listen to you, protect our peace, and keep choosing you. Not only on the day we marry, but on every day that follows."), accompanied by subtle background dimming, warm gold aura, and an intimate audio/particle softening micro-interaction.
6. **Section 5 — Two Portraits (Editorial Split)**: Visual side-by-side editorial perspective featuring Hemsagar (left) and Archana (right), connected by a central golden bridge.
7. **Section 6 — Our Story**: Cinematic vertical milestone timeline with glowing nodes and progressive scroll illumination.
8. **Section 7 — Editorial Photo Story & Lightbox**: Asymmetric magazine-style photography story with an accessible, keyboard-trapped modal dialog, touch swipe navigation, and View Transitions.
9. **Section 8 — Constellation Map**: 5-node interactive star constellation with glowing SVG orbits, touch ripples, and single-note audio synthesis on active node change only.
10. **Section 9 — Tactile Scratch Reveal**: Gold-foil scratch card using Pointer Events (`touch-action: none`) with downscaled 40×20 throttled pixel ratio analysis that smoothly auto-reveals at 60%.
11. **Section 10 — Three Promises**: 3-column editorial cards (Respect, Partnership, Peace) with progressive hover elevation and glow.
12. **Section 11 — Heartbeat Sensor**: Pointer-captured interactive button with concentric pulsing rings and a 2.5-second holding threshold revealing our shared truth.
13. **Section 12 — Wedding Date / Countdown**: Dual-state engine displaying an elegant status ("Our date is still being written. But my decision already is.") or a live 1Hz tabular countdown when a date is configured.
14. **Section 13 — Pre-Finale Silence**: A deep, dark quiet pause before the question.
15. **Section 14 — Final Proposal Question**: The sacred question with two genuine choices:
    - **YES ❤️**: Triggers the Level 4 emotional climax (300ms darkness, expanding golden light bloom, D-major harmonic chord, celebratory rose petals & gold dust shower, and couple blessing "Radhe Radhe 🦚").
    - **FIRST, GIVE ME A HUG 😄**: Responds with warmth ("Deal. 🤍 Now come back when you're ready.") while leaving YES available.
16. **Section 15 — Final Keepsake**: A print-friendly editorial certificate of promise signed with love.

---

## 📁 Directory Structure

```text
/
├── index.html                  # Semantic, accessible HTML entry point
├── _headers                    # Cloudflare Pages edge cache headers
├── assets/
│   ├── images/
│   │   ├── couple.webp         # Hero couple portrait (optimized WebP)
│   │   ├── couple.png          # High-res fallback
│   │   ├── archana.webp        # Archana individual portrait (optimized WebP)
│   │   ├── archana.jpg         # High-res fallback
│   │   ├── hemsagar.webp       # Hemsagar individual portrait (optimized WebP)
│   │   └── hemsagar.jpg        # High-res fallback
│   └── og/
│       └── og-image.jpg        # 1200x630 dedicated social sharing preview
├── css/
│   ├── tokens.css              # Design tokens (colors, fonts, radii, shadows)
│   ├── base.css                # Base reset, typography, selectable copy
│   ├── layout.css              # Grid & flex structural layouts for all 15 sections
│   ├── components.css          # Buttons, audio pill, scratch, heartbeat, modals
│   ├── motion.css              # 4-tier motion system, scroll animations, reduced-motion
│   └── responsive.css          # Device-agnostic rules, safe areas, 44px touch targets
├── js/
│   ├── config.js               # Central story content, dates, and motion profiles
│   ├── audio.js                # Single AudioContext, Krishna bansuri flute, chimes
│   ├── particles.js            # Centralized canvas particle pool (ambient & climax)
│   ├── motion.js               # Parallax Lerp controller, View Transitions, IO reveals
│   ├── gallery.js              # Accessible modal dialog, swipe gestures, focus trapping
│   ├── constellation.js        # 5-node star map with stateful activeNode tracking
│   ├── scratch.js              # Pointer-event scratch canvas with throttled ratio check
│   ├── proposal.js             # Heartbeat hold sensor, wedding countdown, climax
│   └── app.js                  # Main bootstrapper, lifecycle, and visibility pausing
└── README.md
```

---

## 🛠️ Customization & Editing

All personal details, dates, and milestones are managed centrally in `js/config.js`:

### 1. Setting the Wedding Date
Open `js/config.js`:
```javascript
// Leave null for the "Our date is still being written" status:
weddingDate: null,

// Or set an ISO 8601 timestamp to automatically activate the live countdown:
weddingDate: "2027-02-14T09:30:00+05:30",
```

### 2. Editing Milestones & Promises
In `js/config.js`, modify the `milestones` or `promises` arrays with custom dates, titles, and stories.

### 3. Replacing Photographs
Place optimized WebP images (with PNG/JPG fallbacks) in `assets/images/`:
- `couple.webp`: Main hero and keepsake couple portrait (1:1 aspect ratio recommended).
- `archana.webp`: Archana's portrait for Entrance and Section 5 Split.
- `hemsagar.webp`: Hemsagar's portrait for Section 5 Split.

---

## 🎵 Audio Architecture

- **Engine**: Pure Web Audio API synthesis (0 external audio files needed for deployment reliability).
- **Ambient Scale**: Indian classical **Raag Bhupali** pentatonic scale (D4, E4, F#4, A4, B4, D5) evoking serenity and devotion.
- **Micro-Interactions**: Sweet entrance chime, constellation node bell, resonant 50Hz heartbeat pulse, and D-Major celebration chord.
- **Controls**: Real accessible `<button>` floating at top right with `aria-pressed` and equalizing wave animation.
- **Lifecycle**: Single managed `AudioContext` initiated only after user gesture. Automatically suspends when the tab is hidden (`document.hidden`).

---

## ⚡ Performance & Motion Engineering

- **No Framework Bloat**: Pure modern Vanilla HTML5, CSS3, and ES Modules.
- **60 FPS on Android**: Hardware-accelerated `transform` and `opacity` only. No heavy scroll calculations.
- **IntersectionObserver**: Off-screen components and expensive loops remain inactive until approaching viewport.
- **Central Particle Pool**: Single canvas instance with mobile-capped particle budgets (24 on mobile, 65 on desktop) and clamped DPR (max 2).
- **Reduced Motion Support**: Full `@media (prefers-reduced-motion: reduce)` rules disable parallax, particle drift, and long animations while keeping elegant fade transitions intact.

---

## ♿ Accessibility (a11y)

- All interactive controls are native `<button>` or `<a>` elements with a minimum 44×44px touch target.
- Modals implement `role="dialog"`, `aria-modal="true"`, focus trapping, and `Escape` key dismissal.
- Full keyboard navigation support with visible `:focus-visible` gold rings.
- User selection is preserved for all romantic copy and love letters (no global `user-select: none`).

---

## 🚀 Deployment

### Option A: GitHub Pages
1. Push this repository to GitHub on the `main` branch.
2. In GitHub, go to **Settings** > **Pages**.
3. Under **Build and deployment**, select **GitHub Actions** (the included `.github/workflows/static.yml` handles deployment automatically) or **Deploy from a branch** (`main` / root).
4. Live site will be available at:
   `https://hemsagar00.github.io/hemsagar_archana_forever/`

### Option B: Cloudflare Pages
1. Log in to Cloudflare Dashboard > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select `hemsagar_archana_forever`.
3. Set **Build command** to blank (none needed for static sites) and **Build output directory** to `/`.
4. Deploy! Cloudflare Pages will automatically respect `_headers` for immutable asset caching.

---

## 🔒 Privacy & Metadata Notice

- **Repository Visibility**: If this repository is **Public**, photographs and assets within `assets/images/` can be accessed directly. To ensure personal privacy for Hemsagar and Archana, set the repository visibility to **Private** on GitHub.
- **Search Engine Indexing**: `index.html` includes `<meta name="robots" content="noindex, nofollow">` to prevent public search engines from cataloging the site. Note that `noindex` does not encrypt assets on an open URL; hosting on a private domain or unguessable link is recommended for exclusive personal use.
- **Asset Privacy**: Derivatives in `assets/images/` have all EXIF camera and GPS metadata stripped during optimization.

---

*Made with love, respect, and devotion by Hemsagar for Archana • Radhe Radhe 🦚*

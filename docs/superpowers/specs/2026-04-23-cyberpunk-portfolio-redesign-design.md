# Cyberpunk Portfolio Redesign — Design Spec

**Date:** 2026-04-23
**Author:** Maddox Krape (w/ Claude)
**Status:** Draft → pending user approval
**Target domain:** maddoxk.github.io (GitHub Pages)

---

## 1. Goals

Rebuild `maddoxk.github.io` as a **cyberpunk/neon-grid portfolio** that looks futuristic, feels mesmerizing on first load, and preserves every piece of existing content. The site should make a visitor's first reaction "whoa" — through a 3D Tron grid with AI-vs-AI lightcycles playing in the background, glitch text, terminal-style UI, and scroll-driven animations.

**Non-goals:**
- Blog/CMS — not needed
- Backend/auth — static export only
- i18n — English only
- SEO optimization beyond basic meta tags

---

## 2. Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | **Vite 5 + React 18 + TypeScript** | Fast HMR, trivial static build for GitHub Pages |
| Routing | **react-router-dom v6** (HashRouter) | HashRouter avoids GitHub Pages 404 issues for SPA routes |
| 3D | **three.js + @react-three/fiber + @react-three/drei** | Declarative 3D; the Tron grid lives here |
| Styling | **Tailwind CSS v4** | Fast neon theming via custom design tokens |
| Animation | **Framer Motion** + **GSAP + ScrollTrigger** | FM for UI transitions, GSAP for scroll timelines |
| Smooth scroll | **lenis** | Silky scroll; hooks into GSAP ScrollTrigger |
| Charts (COVID page) | **chart.js + react-chartjs-2** | Port existing COVID visualization |
| Icons | **lucide-react** + **@iconify/react** | Line icons match the cyber aesthetic |
| Fonts | **JetBrains Mono** (UI/terminal) + **Orbitron** (display) | Self-host via `@fontsource/jetbrains-mono` and `@fontsource/orbitron` |
| Deployment | **GitHub Pages** via `gh-pages` branch | Commit `dist/` output on publish |

**Bundle budget:** target ≤ 400 KB gzip for initial load (r3f + three lazy-loaded after hero).

---

## 3. Design System

### Color tokens (CSS variables in `src/styles/tokens.css`)

```css
--bg-void:        #04060b;   /* near-black navy */
--bg-deep:        #0a0f1e;   /* panel background */
--bg-grid:        #0f1630;   /* grid plane */
--fg-primary:     #e6f1ff;   /* primary text */
--fg-muted:       #7a8aa8;   /* secondary text */
--neon-cyan:      #00f0ff;   /* primary accent */
--neon-magenta:   #ff2bd6;   /* secondary accent */
--neon-violet:    #9d00ff;   /* tertiary accent */
--neon-amber:     #ffb300;   /* warning/highlight */
--glow-cyan:      0 0 12px #00f0ff, 0 0 32px #00f0ff66;
--glow-magenta:   0 0 12px #ff2bd6, 0 0 32px #ff2bd666;
--scanline:       rgba(0, 240, 255, 0.03);
```

### Typography

- **Display (h1, hero):** Orbitron 700, wide tracking, UPPERCASE
- **UI headings:** JetBrains Mono 600
- **Body:** JetBrains Mono 400, 15px base
- **Line-height:** 1.5 body, 1.1 display

### Motion

- **Defaults:** 200 ms ease-out for small UI, 600 ms cubic-bezier(0.22, 1, 0.36, 1) for reveals
- **Respect `prefers-reduced-motion`** — fallback to static grid + disable glitch/scramble effects

---

## 4. Signature Features

### 4.1 Tron Grid Hero Scene (`<TronGridScene />`)

**Location:** `src/scenes/TronGridScene/`

**Composition:**
- Full-viewport r3f canvas, fixed behind content (z-index -1), lazy-loaded
- Infinite neon grid floor (shader-based perspective grid, scrolls toward camera)
- Horizon fog + bloom post-processing (@react-three/postprocessing)
- **2 AI lightcycles** (represented as glowing trail ribbons — no actual bike mesh required)
  - Cyan AI vs Magenta AI
  - Each cycle has `{ position, direction, trail: Vector3[] }`
  - AI logic: choose turn direction that (a) won't collide with any trail within next `N` steps (lookahead), (b) otherwise random
  - Collision ends round → 2s fade → respawn on opposite corners
  - Run as `useFrame` loop at fixed tick rate (20 Hz) regardless of FPS
- Parallax camera sway based on scroll position + mouse

**Performance:**
- Grid is a single plane with fragment shader (not per-line geometry)
- Trails are `MeshLine` or tube geometry, max 300 segments each
- Pause rendering when tab hidden (`document.visibilityState`)
- Disable postprocessing on low-end devices (detected via `navigator.hardwareConcurrency < 4`)

### 4.2 Terminal Boot Intro (`<BootSequence />`)

First load (per `sessionStorage` flag) shows a ~1.6s overlay:
```
> ESTABLISHING SECURE CONNECTION...
> IDENTITY: MADDOX_KRAPE
> LOADING PORTFOLIO.sys
> [████████████████] 100%
> READY
```
Fades out into main site. Skippable via click/key. Never shows again in session.

### 4.3 Glitch Hero Text

- Name renders with SVG + CSS `feTurbulence` displacement, or layered text with RGB channel split
- On mount: scramble-in animation (random chars → resolves)
- On hover: brief re-glitch
- Library: custom 40-line hook + CSS (no external dep needed)

### 4.4 Scanlines + CRT Overlay

Fixed-position `<div>` with CSS repeating-linear-gradient + subtle vertical flicker animation. Optional vignette. Toggleable via settings (persisted).

### 4.5 Custom Cursor

Two elements: small dot + trailing ring. Ring scales 2× over `data-cursor="hover"` targets; color-shifts to magenta on interactive elements.

### 4.6 Project Cards

- `react-parallax-tilt` for 3D hover tilt (max 10°)
- CSS cyber-bracket corners (`⌐`, `¬`, `L`, `J` via positioned divs)
- Neon glow on hover (`box-shadow` with `--neon-cyan`)
- On click: expanding-rect page transition to project detail

### 4.7 Stats HUD (About page)

Terminal-styled panel with animated counters:
```
> YEARS_CODING ............. [███████░░░] 7+
> AP_CS_SCORE .............. [██████████] 5/5
> CHESS_ELO ................ [████████░░] 1600+
```
Counters tween from 0 to target on in-view (GSAP + Intersection Observer).

### 4.8 Page Transitions

- Route changes trigger a full-viewport "scan sweep" overlay (GSAP): horizontal neon line sweeps top → bottom, old page masks out, new page masks in
- ~700ms total
- Back/forward navigation plays reverse direction

### 4.9 Scroll-Triggered Reveals

- Headings: split-text letter stagger (50ms per char)
- Paragraphs: fade + 20px slide-up
- Code blocks: typewriter reveal (optional, only on first view per session)
- All keyed off GSAP ScrollTrigger with 20% viewport threshold

---

## 5. Information Architecture

```
/                           Home
  ├── Hero (TronGrid + glitch name + cycling tagline)
  ├── About preview (short bio + "Learn more" → /about)
  ├── Stats HUD (counters)
  ├── Projects grid (6 cards)
  ├── Skills constellation (tech icons in glowing grid)
  └── Contact strip (GitHub, LinkedIn, email) — anchor #contact, no separate route

/about                      About Me
  ├── Expanded bio
  ├── Timeline (software journey)
  ├── Full stats HUD
  └── What I'm working on now

/projects                   Projects Index
  └── Filterable grid (All | Simulation | Algorithms | Data Viz)

/projects/gravity           Gravity Simulation
/projects/elevator          Elevator Simulation
/projects/huffman           Huffman Compression
/projects/hashes            Hashes
/projects/covid             COVID-19 Dashboard (live Chart.js viz)
/projects/search            Search Algorithms (placeholder/coming-soon)
```

### Nav

- **Desktop:** fixed top bar, translucent glass background. Links: `HOME / ABOUT / PROJECTS / CONTACT`. Active link has underline glow.
- **Mobile:** hamburger opens full-screen overlay menu with large links, slides in.

---

## 6. Project Page Content (ported + preserved)

All existing content from current HTML files is ported verbatim into React components. Key preserved elements:

### 6.1 Gravity Simulation
- Intro: "Coding the Universe"
- 3 classes list: UniverseState, UniverseManager, CelestialBody
- Newton's Law equation image (`/assets/gravity_equation.svg`)
- Original Java code block (`for (CelestialBody other : allBodies)`)
- Two GIFs: `finalv1.gif` (binary pair/circumbinary system) + `gravsimulato.gif` (final version w/ controls)
  - **Optimization:** serve `v1gravsim.mp4` and `gravsimulato.mp4` via `<video>` tags (smaller than GIFs)
- Key takeaways list
- GitHub link: `https://github.com/maddoxk/UniverseSimulator`

### 6.2 Elevator Simulation
- Intro: ADEN course, time-driven + event-driven simulation
- FSM definition + Wikipedia blockquote
- FSM diagram: `elevatorfsm-removebg-preview.png`
- States list: STOP, BOARD, OFFLOAD, OPENDOOR, CLOSEDOOR, MOVE 1 FLOOR
- Tick phases nested list
- Embed/link the 4 PDFs (Design Docs v1/v2/v3 + Analysis) with styled iframe or download cards
- 4k timelapse video (use `4k Elevator Timelapse.mp4`)

### 6.3 Huffman Compression
- History section (David A. Huffman, 1952)
- "How does compression work?" section
- Implementation Part 1: Encoding (7-step list) + `Huffman_huff_demo.gif`
- Two Java code blocks (`generateWeights`, `buildHuffmanTree`) with syntax highlighting
- Implementation Part 2: Decoding (5-step list)
- Key takeaways (7 items)
- GitHub link: `https://github.com/maddoxk/`

### 6.4 Hashes
- Description paragraph
- Hash implementation paragraphs (linear probing, quadratic probing, linked list, cuckoo)
- Reflection paragraphs
- Link to `ADEN- Hashes Analysis.pdf`

### 6.5 COVID-19 Dashboard
- Port to `react-chartjs-2`
- Worldwide Data panel (line/bar chart)
- Country Data panel with country selector, Add/Remove/Change Type buttons
- Modal for raw data with flag + stats
- Learn More link to ECDC
- **Data source:** needs live API or static snapshot — see Section 9

### 6.6 Search Algorithms (new)
- Placeholder page with animated "TRANSMISSION INCOMING" cyber frame
- Teaser text describing what's coming (binary search, BFS/DFS, A*, etc.)
- Clean page that doesn't feel broken

---

## 7. Component Architecture

```
src/
├── main.tsx                         # entry
├── App.tsx                          # router + global providers
├── router.tsx                       # routes config
├── styles/
│   ├── globals.css
│   ├── tokens.css
│   └── tailwind.css
├── scenes/
│   └── TronGridScene/
│       ├── index.tsx               # <Canvas> wrapper
│       ├── GridFloor.tsx           # shader grid plane
│       ├── Lightcycle.tsx          # AI cycle + trail
│       ├── useLightcycleAI.ts      # AI movement logic
│       └── shaders/
│           ├── grid.frag.glsl
│           └── grid.vert.glsl
├── components/
│   ├── layout/
│   │   ├── Layout.tsx              # nav + footer + cursor + scanlines
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   └── CustomCursor.tsx
│   ├── fx/
│   │   ├── GlitchText.tsx
│   │   ├── ScrambleText.tsx
│   │   ├── Scanlines.tsx
│   │   ├── BootSequence.tsx
│   │   ├── PageTransition.tsx
│   │   └── ScanSweep.tsx
│   ├── ui/
│   │   ├── CyberCard.tsx           # bracketed corners + tilt
│   │   ├── NeonButton.tsx
│   │   ├── TerminalPanel.tsx
│   │   ├── StatsHUD.tsx
│   │   └── SectionHeading.tsx
│   └── project/
│       ├── ProjectCard.tsx
│       ├── ProjectHero.tsx         # header for project detail pages
│       ├── CodeBlock.tsx           # Prism syntax highlight
│       └── MediaEmbed.tsx          # handles gif/mp4/pdf
├── pages/
│   ├── Home.tsx                    # includes #contact anchor section
│   ├── About.tsx
│   ├── Projects.tsx
│   └── projects/
│       ├── Gravity.tsx
│       ├── Elevator.tsx
│       ├── Huffman.tsx
│       ├── Hashes.tsx
│       ├── Covid.tsx
│       └── Search.tsx
├── hooks/
│   ├── useLenis.ts
│   ├── useSmoothScroll.ts
│   ├── useInView.ts
│   └── useReducedMotion.ts
├── data/
│   ├── projects.ts                 # project metadata
│   ├── skills.ts
│   └── stats.ts
└── lib/
    ├── motion.ts                   # shared FM variants
    └── gsap.ts                     # gsap + ScrollTrigger registration
```

---

## 8. Asset Migration Plan

**Keep in place:**
- `images/` and `videos/` directories stay — referenced from new React app via `/images/...` paths
- Old HTML files (`index.html`, `*.html`) are **replaced** by the Vite build output
- `assets/css/`, `assets/js/`, `assets/sass/` — delete after verification (legacy HTML5 UP)
- `covid19-status/` folder — superseded by `/projects/covid` React route; delete after verification

**Optimize:**
- Prefer `.mp4` over heavy `.gif` files (huge wins: 45MB→8MB for elevator, 33MB→?MB for gravity). Use `<video autoplay muted loop playsinline>`.
- Add lazy-loading (`loading="lazy"`) to non-hero media
- Generate WebP copies via build script (optional, stretch goal)

**PDFs:**
- Serve directly from `/images/*.pdf`
- Embed via styled "document card" with preview thumbnail + download button, not raw `<embed>`

---

## 9. COVID-19 Data Sourcing

The original page fetched live data (based on country selector + async update buttons in the source). Reasonable API choice: `disease.sh` (free, no auth, CORS-enabled, global COVID stats). Options:

**A. Live API (disease.sh)** — fetch at page load, always current. Preferred.
**B. Static snapshot** — bundle a JSON of data as of 2026-04-23. Safer, never breaks, but stale.
**C. Remove country-selector, keep only worldwide chart with static data** — simplest.

**Decision:** Start with **A** (disease.sh free public API, no auth needed). Fallback to cached JSON on fetch failure with a clear "data as of X" notice.

---

## 10. Build & Deploy

### Build
- `vite build` produces `dist/` with hashed assets
- Tailwind JIT strips unused CSS → small bundle
- Code-split: TronGridScene lazy-loaded (`React.lazy`), each project page lazy-loaded

### Deploy to GitHub Pages
Two options; pick at implementation time:

**A. Action-based (recommended):** GitHub Actions workflow builds on push to `main` and publishes `dist/` to `gh-pages` branch.
**B. Manual `gh-pages` npm script:** `npm run deploy` runs build + `gh-pages -d dist`.

**HashRouter** is required (SPA routes would 404 on hard refresh with BrowserRouter on Pages). URLs become `maddoxk.github.io/#/projects/gravity`. Acceptable trade-off.

### Root structure after migration

```
/                          # repo root = GitHub Pages source
├── .github/workflows/deploy.yml   # CI build → gh-pages
├── src/                   # React source
├── public/
│   ├── images/            # MIGRATED from old images/
│   ├── videos/            # MIGRATED from old videos/
│   └── favicon.png
├── index.html             # Vite entry (replaces old index.html)
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── LICENSE.txt            # preserved
└── README.md              # new
```

---

## 11. Accessibility

- Keyboard nav for all interactive elements
- Focus-visible rings (neon outline)
- `prefers-reduced-motion`: disables lightcycles (static grid), glitch, scramble, scanlines
- Color contrast: body text ≥ 7:1 against `--bg-void` (WCAG AAA)
- Alt text on all images (port existing where present; add where missing)
- Skip-to-content link

---

## 12. Testing

- **Type-check:** `tsc --noEmit` in CI
- **Lint:** ESLint + `eslint-plugin-react-hooks`
- **Visual smoke test:** manual checklist after build — home hero renders, grid animates, each project route loads, COVID charts render, PDFs link works, page transitions play
- **Lighthouse target:** 85+ Performance on desktop, 90+ Accessibility

No unit tests — this is a portfolio site; visual correctness is the bar, and unit tests don't verify that.

---

## 13. Out of Scope (Future Ideas)

- Interactive terminal easter egg (type `help`, `about`, `cat /etc/passwd` for jokes)
- Resume/CV PDF download button
- Blog / writeups section
- Sound design (boot beep, hover clicks) — too easy to get wrong
- Per-project sub-navigation (prev/next project arrows)

---

## 14. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| r3f bundle too heavy | Lazy-load scene; gzip budget tracked |
| GIFs still huge on project pages | Convert to mp4, serve `<video>` with `poster` |
| GitHub Pages SPA routing | Use HashRouter |
| COVID API rate limits / downtime | Cached fallback JSON |
| Glitch/animation epilepsy concerns | Respect `prefers-reduced-motion` rigorously |
| Scope creep (adding features mid-build) | Stick to this spec; future ideas go to section 13 |

---

## 15. Success Criteria

1. `npm run dev` opens a site where the hero Tron grid is rendering with 2 AI lightcycles visibly dueling
2. All 6 project pages render with their original content intact (text, code, images, GIFs/videos, PDFs, GitHub links)
3. All navigation links work end-to-end (no dead `about.html` / `projects.html`)
4. Page transitions play cleanly between routes
5. Site deploys to GitHub Pages and loads correctly at `https://maddoxk.github.io`
6. Lighthouse Performance ≥ 85 on desktop, Accessibility ≥ 90
7. First-visit "wow" reaction: subjective, but the hero + boot sequence should feel unlike any typical portfolio

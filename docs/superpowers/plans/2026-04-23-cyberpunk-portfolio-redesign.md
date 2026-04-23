# Cyberpunk Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `maddoxk.github.io` as a cyberpunk/neon-grid React portfolio with a Tron-grid 3D hero (AI-vs-AI lightcycles), terminal boot intro, glitch text, and all existing project content preserved.

**Architecture:** Vite + React 18 + TypeScript SPA with HashRouter for GitHub Pages compatibility. Global layout wraps all routes. Tron grid scene is a fixed-position r3f canvas behind content. Pages are lazy-loaded. Tailwind v4 + CSS tokens drive theming. GSAP/Framer Motion handle animations.

**Tech Stack:** Vite 5, React 18, TypeScript, react-router-dom (HashRouter), @react-three/fiber, @react-three/drei, @react-three/postprocessing, three, Tailwind CSS v4, Framer Motion, GSAP + ScrollTrigger, lenis, chart.js + react-chartjs-2, @fontsource/jetbrains-mono, @fontsource/orbitron, react-parallax-tilt, lucide-react.

**Reference spec:** `docs/superpowers/specs/2026-04-23-cyberpunk-portfolio-redesign-design.md`

**Note on testing:** This is a visual portfolio site. Per spec §12, there are no unit tests — verification is "dev server loads + renders correctly + build succeeds." Each task has a verify step using `npm run dev` / `npm run build` instead of `vitest`.

---

## Phase Overview

1. **Phase 1:** Project scaffolding (Vite app, archive old files)
2. **Phase 2:** Design system (tokens, fonts, Tailwind)
3. **Phase 3:** Router + placeholder pages
4. **Phase 4:** Layout shell (nav, footer)
5. **Phase 5:** Asset migration
6. **Phase 6:** Tron grid hero scene
7. **Phase 7:** Global FX (glitch, scanlines, cursor, boot)
8. **Phase 8:** Home page content
9. **Phase 9:** About page
10. **Phase 10:** Projects index
11. **Phase 11:** Project detail pages (×6)
12. **Phase 12:** Page transitions + polish
13. **Phase 13:** Build + GitHub Pages deploy

---

## Phase 1: Project Scaffolding

### Task 1.1: Archive old site files

**Files:**
- Create: `legacy/` directory (move old HTML and assets here, preserved but out of the way)

- [ ] **Step 1:** Create `legacy/` and move all old files into it

```bash
mkdir -p legacy
mv index.html elevator-simulation.html elevator-simulation.html gravity-simulation.html hashes.html huffman-compression.html generic.html elements.html covid19-status assets legacy/ 2>/dev/null || true
# images/ and videos/ will be migrated in Phase 5, leave in place for now
```

- [ ] **Step 2:** Verify old files moved

Run: `ls legacy/`
Expected: Contains `index.html`, `*.html` files, `covid19-status/`, `assets/`

- [ ] **Step 3:** Commit

```bash
git add -A
git commit -m "chore: archive legacy HTML5 UP site to legacy/"
```

### Task 1.2: Initialize Vite + React + TypeScript project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`, `.gitignore`

- [ ] **Step 1:** Create `package.json`

```json
{
  "name": "maddoxk-portfolio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

- [ ] **Step 2:** Install runtime dependencies

```bash
npm install react react-dom react-router-dom three @react-three/fiber @react-three/drei @react-three/postprocessing framer-motion gsap lenis chart.js react-chartjs-2 react-parallax-tilt lucide-react clsx @fontsource/jetbrains-mono @fontsource/orbitron
```

- [ ] **Step 3:** Install dev dependencies

```bash
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom @types/three tailwindcss @tailwindcss/vite autoprefixer postcss gh-pages
```

- [ ] **Step 4:** Create `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          gsap: ['gsap'],
          charts: ['chart.js', 'react-chartjs-2'],
        },
      },
    },
  },
})
```

- [ ] **Step 5:** Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 6:** Create `tsconfig.node.json`

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 7:** Create `index.html` (Vite entry)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/fav.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Maddox Krape // Portfolio</title>
    <meta name="description" content="Maddox Krape — developer, problem solver. Projects in simulation, algorithms, and data visualization." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 8:** Create `src/main.tsx`

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 9:** Create `src/App.tsx` (minimal placeholder)

```tsx
export default function App() {
  return (
    <div style={{ color: '#00f0ff', fontFamily: 'monospace', padding: 32 }}>
      <h1>&gt; MADDOX_KRAPE.sys</h1>
      <p>Scaffolding online.</p>
    </div>
  )
}
```

- [ ] **Step 10:** Create `src/vite-env.d.ts`

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 11:** Create `src/styles/globals.css` (placeholder — fleshed out in Phase 2)

```css
@import "tailwindcss";

body {
  margin: 0;
  background: #04060b;
  color: #e6f1ff;
}
```

- [ ] **Step 12:** Create/update `.gitignore`

```
node_modules
dist
.DS_Store
*.local
.vite
```

- [ ] **Step 13:** Verify dev server starts

Run: `npm run dev`
Expected: Dev server starts, visiting `http://localhost:5173/` shows "MADDOX_KRAPE.sys" on dark background

- [ ] **Step 14:** Verify build works

Run: `npm run build`
Expected: `dist/` directory created, no errors

- [ ] **Step 15:** Commit

```bash
git add .
git commit -m "feat: scaffold Vite + React + TypeScript app"
```

---

## Phase 2: Design System

### Task 2.1: Design tokens

**Files:** Create `src/styles/tokens.css`

- [ ] **Step 1:** Create `src/styles/tokens.css`

```css
:root {
  --bg-void: #04060b;
  --bg-deep: #0a0f1e;
  --bg-grid: #0f1630;
  --bg-panel: rgba(10, 15, 30, 0.6);
  --border-panel: rgba(0, 240, 255, 0.2);

  --fg-primary: #e6f1ff;
  --fg-muted: #7a8aa8;
  --fg-dim: #4a5a78;

  --neon-cyan: #00f0ff;
  --neon-magenta: #ff2bd6;
  --neon-violet: #9d00ff;
  --neon-amber: #ffb300;
  --neon-green: #00ff9d;

  --glow-cyan-sm: 0 0 8px #00f0ff, 0 0 20px rgba(0, 240, 255, 0.4);
  --glow-cyan-md: 0 0 12px #00f0ff, 0 0 32px rgba(0, 240, 255, 0.4);
  --glow-cyan-lg: 0 0 20px #00f0ff, 0 0 60px rgba(0, 240, 255, 0.5);
  --glow-magenta-sm: 0 0 8px #ff2bd6, 0 0 20px rgba(255, 43, 214, 0.4);
  --glow-magenta-md: 0 0 12px #ff2bd6, 0 0 32px rgba(255, 43, 214, 0.4);

  --font-display: 'Orbitron', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  --ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
}
```

- [ ] **Step 2:** Import tokens from globals.css. Update `src/styles/globals.css`:

```css
@import "tailwindcss";
@import "./tokens.css";
@import "@fontsource/jetbrains-mono/400.css";
@import "@fontsource/jetbrains-mono/500.css";
@import "@fontsource/jetbrains-mono/600.css";
@import "@fontsource/jetbrains-mono/700.css";
@import "@fontsource/orbitron/500.css";
@import "@fontsource/orbitron/700.css";
@import "@fontsource/orbitron/900.css";

@theme {
  --color-void: var(--bg-void);
  --color-deep: var(--bg-deep);
  --color-panel: var(--bg-panel);
  --color-fg: var(--fg-primary);
  --color-muted: var(--fg-muted);
  --color-cyan-neon: var(--neon-cyan);
  --color-magenta-neon: var(--neon-magenta);
  --color-violet-neon: var(--neon-violet);
  --color-amber-neon: var(--neon-amber);
  --font-display: var(--font-display);
  --font-mono: var(--font-mono);
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  background: var(--bg-void);
  color: var(--fg-primary);
  font-family: var(--font-mono);
  font-size: 15px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

body { overflow-x: hidden; }

h1, h2, h3 {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.1;
  margin: 0;
}

a { color: var(--neon-cyan); text-decoration: none; }
a:hover { text-shadow: var(--glow-cyan-sm); }

::selection { background: var(--neon-cyan); color: var(--bg-void); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3:** Update `src/App.tsx` to test tokens

```tsx
export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-4xl text-cyan-neon mb-4" style={{ textShadow: 'var(--glow-cyan-md)' }}>
        MADDOX_KRAPE.sys
      </h1>
      <p className="text-muted font-mono">Design tokens online.</p>
      <p className="text-magenta-neon mt-2">// magenta accent</p>
    </div>
  )
}
```

- [ ] **Step 4:** Verify in browser

Run: `npm run dev`
Expected: Orbitron display font on h1, cyan glow, JetBrains Mono body, dark background

- [ ] **Step 5:** Commit

```bash
git add src/styles src/App.tsx
git commit -m "feat: add cyberpunk design tokens and global styles"
```

### Task 2.2: Global utility classes for neon effects

**Files:** Modify `src/styles/globals.css` to add `.glow-cyan`, `.glow-magenta`, `.panel`, `.scanline-bg`, `.cyber-border` utilities

- [ ] **Step 1:** Append to `src/styles/globals.css`:

```css
@layer utilities {
  .glow-cyan { text-shadow: var(--glow-cyan-md); }
  .glow-magenta { text-shadow: var(--glow-magenta-md); }
  .glow-cyan-box { box-shadow: var(--glow-cyan-md); }
  .glow-magenta-box { box-shadow: var(--glow-magenta-md); }

  .panel {
    background: var(--bg-panel);
    border: 1px solid var(--border-panel);
    backdrop-filter: blur(12px);
  }

  .cyber-border {
    position: relative;
    border: 1px solid var(--neon-cyan);
  }
  .cyber-border::before,
  .cyber-border::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: var(--neon-cyan);
    border-style: solid;
  }
  .cyber-border::before {
    top: -2px; left: -2px;
    border-width: 2px 0 0 2px;
  }
  .cyber-border::after {
    bottom: -2px; right: -2px;
    border-width: 0 2px 2px 0;
  }

  .scanline-bg {
    background-image: repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 2px,
      rgba(0, 240, 255, 0.03) 2px,
      rgba(0, 240, 255, 0.03) 3px
    );
  }

  .text-gradient-cyber {
    background: linear-gradient(135deg, var(--neon-cyan) 0%, var(--neon-magenta) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}
```

- [ ] **Step 2:** Verify build

Run: `npm run build`
Expected: No errors

- [ ] **Step 3:** Commit

```bash
git add src/styles/globals.css
git commit -m "feat: add neon utility classes"
```

---

## Phase 3: Router + Placeholder Pages

### Task 3.1: Create router with placeholder pages

**Files:**
- Create: `src/router.tsx`, `src/pages/Home.tsx`, `src/pages/About.tsx`, `src/pages/Projects.tsx`, `src/pages/NotFound.tsx`, `src/pages/projects/Gravity.tsx`, `src/pages/projects/Elevator.tsx`, `src/pages/projects/Huffman.tsx`, `src/pages/projects/Hashes.tsx`, `src/pages/projects/Covid.tsx`, `src/pages/projects/Search.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1:** Create each placeholder page with minimal content. Example `src/pages/Home.tsx`:

```tsx
export default function Home() {
  return (
    <section className="p-8">
      <h1 className="text-5xl glow-cyan">MADDOX_KRAPE</h1>
      <p className="text-muted mt-4">// home placeholder</p>
    </section>
  )
}
```

Create the same structure for `About.tsx`, `Projects.tsx`, `NotFound.tsx`, and each `projects/*.tsx` file — replace the h1 text and placeholder comment with the page name (e.g. `ABOUT`, `PROJECTS`, `GRAVITY_SIMULATION`, etc.). NotFound uses "404 // SIGNAL LOST".

- [ ] **Step 2:** Create `src/router.tsx`

```tsx
import { HashRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Gravity = lazy(() => import('./pages/projects/Gravity'))
const Elevator = lazy(() => import('./pages/projects/Elevator'))
const Huffman = lazy(() => import('./pages/projects/Huffman'))
const Hashes = lazy(() => import('./pages/projects/Hashes'))
const Covid = lazy(() => import('./pages/projects/Covid'))
const Search = lazy(() => import('./pages/projects/Search'))

function Fallback() {
  return <div className="p-8 text-cyan-neon">&gt; LOADING...</div>
}

export default function Router() {
  return (
    <HashRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/gravity" element={<Gravity />} />
          <Route path="/projects/elevator" element={<Elevator />} />
          <Route path="/projects/huffman" element={<Huffman />} />
          <Route path="/projects/hashes" element={<Hashes />} />
          <Route path="/projects/covid" element={<Covid />} />
          <Route path="/projects/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
```

- [ ] **Step 3:** Update `src/App.tsx`

```tsx
import Router from './router'

export default function App() {
  return <Router />
}
```

- [ ] **Step 4:** Verify all routes load

Run: `npm run dev`
Expected: Visiting `/#/`, `/#/about`, `/#/projects`, `/#/projects/gravity`, etc. each shows its placeholder.

- [ ] **Step 5:** Commit

```bash
git add src/
git commit -m "feat: add HashRouter and placeholder pages for all routes"
```

---

## Phase 4: Layout Shell

### Task 4.1: Create Layout with Nav and Footer

**Files:**
- Create: `src/components/layout/Layout.tsx`, `src/components/layout/Nav.tsx`, `src/components/layout/Footer.tsx`
- Modify: `src/router.tsx` (wrap routes in Layout)

- [ ] **Step 1:** Create `src/components/layout/Nav.tsx`

```tsx
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'HOME' },
  { to: '/about', label: 'ABOUT' },
  { to: '/projects', label: 'PROJECTS' },
  { to: '/#contact', label: 'CONTACT' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 panel border-b border-t-0 border-l-0 border-r-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="font-display font-bold text-xl tracking-widest glow-cyan">
          MADDOX_K
        </NavLink>
        <nav className="hidden md:flex gap-8 font-mono text-sm">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative py-1 transition-colors ${
                  isActive ? 'text-cyan-neon glow-cyan' : 'text-fg hover:text-cyan-neon'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="md:hidden text-cyan-neon"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden panel border-t border-[var(--border-panel)]">
          <nav className="flex flex-col p-6 gap-4 font-mono">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'text-cyan-neon glow-cyan' : 'text-fg'
                }
              >
                &gt; {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2:** Create `src/components/layout/Footer.tsx`

```tsx
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-panel)] mt-24 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-sm text-muted">
        <div>&copy; {new Date().getFullYear()} MADDOX_K // ALL SYSTEMS NOMINAL</div>
        <div className="flex gap-4">
          <a href="https://github.com/maddoxk" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-cyan-neon">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-cyan-neon">
            <Linkedin size={18} />
          </a>
          <a href="mailto:maddox.krape@gmail.com" aria-label="Email" className="hover:text-cyan-neon">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3:** Create `src/components/layout/Layout.tsx`

```tsx
import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 4:** Update `src/router.tsx` — wrap routes in Layout

```tsx
import { HashRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/layout/Layout'

// ... existing lazy imports ...

export default function Router() {
  return (
    <HashRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/gravity" element={<Gravity />} />
            <Route path="/projects/elevator" element={<Elevator />} />
            <Route path="/projects/huffman" element={<Huffman />} />
            <Route path="/projects/hashes" element={<Hashes />} />
            <Route path="/projects/covid" element={<Covid />} />
            <Route path="/projects/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
```

- [ ] **Step 5:** Verify layout

Run: `npm run dev`
Expected: Every route now has fixed top nav + footer. Nav links work. Mobile hamburger works at narrow widths.

- [ ] **Step 6:** Commit

```bash
git add src/
git commit -m "feat: add nav + footer layout shell"
```

---

## Phase 5: Asset Migration

### Task 5.1: Move images and videos to public/

**Files:**
- Move: `images/*` → `public/images/*`
- Move: `videos/*` → `public/videos/*`
- Create: `public/favicon.png` (copy from `public/images/fav.png` if it exists, else use profile.jpg)

- [ ] **Step 1:** Move assets

```bash
mkdir -p public
mv images public/images
mv videos public/videos
```

- [ ] **Step 2:** Add favicon (reuse existing or create a minimal one)

```bash
# If a fav.png exists, copy it; otherwise use profile
cp public/images/profile.JPG public/favicon.png 2>/dev/null || true
```

- [ ] **Step 3:** Delete pic01.jpg through pic08.jpg (HTML5 UP template leftovers, unused)

```bash
rm -f public/images/pic01.jpg public/images/pic02.jpg public/images/pic03.jpg public/images/pic04.jpg public/images/pic05.jpg public/images/pic06.jpg public/images/pic07.jpg public/images/pic08.jpg public/images/bg.jpg
```

- [ ] **Step 4:** Verify asset paths work

Run: `npm run dev`
Then in browser, visit `http://localhost:5173/images/profile.JPG` — should render image.

- [ ] **Step 5:** Commit

```bash
git add -A
git commit -m "chore: migrate images and videos to public/"
```

---

## Phase 6: Tron Grid Hero Scene

### Task 6.1: Scene skeleton and grid floor

**Files:**
- Create: `src/scenes/TronGridScene/index.tsx`, `src/scenes/TronGridScene/GridFloor.tsx`

- [ ] **Step 1:** Create `src/scenes/TronGridScene/GridFloor.tsx`

```tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function GridFloor() {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[200, 200, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        transparent
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('#00f0ff') },
          uLineWidth: { value: 0.02 },
          uGridSize: { value: 2.0 },
          uScrollSpeed: { value: 2.0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vWorldPosition;
          void main() {
            vUv = uv;
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vWorldPosition = wp.xyz;
            gl_Position = projectionMatrix * viewMatrix * wp;
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor;
          uniform float uLineWidth;
          uniform float uGridSize;
          uniform float uScrollSpeed;
          varying vec3 vWorldPosition;

          float gridLine(float coord, float size, float width) {
            float line = abs(fract(coord / size - 0.5) - 0.5) / fwidth(coord / size);
            return 1.0 - min(line, 1.0);
          }

          void main() {
            float scrollZ = vWorldPosition.z + uTime * uScrollSpeed;
            float gx = gridLine(vWorldPosition.x, uGridSize, uLineWidth);
            float gz = gridLine(scrollZ, uGridSize, uLineWidth);
            float grid = max(gx, gz);

            // distance fade
            float dist = length(vWorldPosition.xz);
            float fade = 1.0 - smoothstep(10.0, 60.0, dist);

            vec3 col = uColor * grid * fade;
            float alpha = grid * fade;
            gl_FragColor = vec4(col, alpha);
          }
        `}
      />
    </mesh>
  )
}
```

- [ ] **Step 2:** Create `src/scenes/TronGridScene/index.tsx`

```tsx
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import GridFloor from './GridFloor'

export default function TronGridScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 3, 8], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#04060b']} />
        <fog attach="fog" args={['#04060b', 15, 60]} />
        <ambientLight intensity={0.2} />
        <GridFloor />
        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
```

- [ ] **Step 3:** Mount scene in Layout. Modify `src/components/layout/Layout.tsx`:

```tsx
import { Outlet } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Nav from './Nav'
import Footer from './Footer'

const TronGridScene = lazy(() => import('../../scenes/TronGridScene'))

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Suspense fallback={null}>
        <TronGridScene />
      </Suspense>
      <Nav />
      <main className="flex-1 pt-20 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 4:** Verify grid renders

Run: `npm run dev`
Expected: Scrolling neon cyan grid floor visible behind page content. Grid scrolls toward camera.

- [ ] **Step 5:** Commit

```bash
git add src/
git commit -m "feat: add Tron grid floor scene with shader and bloom"
```

### Task 6.2: Lightcycle AI logic

**Files:**
- Create: `src/scenes/TronGridScene/useLightcycleAI.ts`, `src/scenes/TronGridScene/Lightcycle.tsx`

- [ ] **Step 1:** Create `src/scenes/TronGridScene/useLightcycleAI.ts`

```ts
import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'

export type Dir = 'N' | 'S' | 'E' | 'W'
const DIR_VEC: Record<Dir, [number, number]> = {
  N: [0, -1], S: [0, 1], E: [1, 0], W: [-1, 0],
}
const TURN_LEFT: Record<Dir, Dir> = { N: 'W', W: 'S', S: 'E', E: 'N' }
const TURN_RIGHT: Record<Dir, Dir> = { N: 'E', E: 'S', S: 'W', W: 'N' }

export type CycleState = {
  id: 'cyan' | 'magenta'
  pos: THREE.Vector3
  dir: Dir
  trail: THREE.Vector3[]
  alive: boolean
}

const ARENA = 40 // half-extent
const TICK_MS = 80
const MAX_TRAIL = 300

function spawnCycle(id: CycleState['id'], seed: number): CycleState {
  // Spawn in opposite corners
  const x = id === 'cyan' ? -ARENA * 0.6 : ARENA * 0.6
  const z = id === 'cyan' ? -ARENA * 0.6 : ARENA * 0.6
  const dir: Dir = id === 'cyan' ? 'S' : 'N'
  const pos = new THREE.Vector3(x, 0, z)
  return { id, pos: pos.clone(), dir, trail: [pos.clone()], alive: true }
}

function occupied(x: number, z: number, cycles: CycleState[]): boolean {
  if (Math.abs(x) > ARENA || Math.abs(z) > ARENA) return true
  for (const c of cycles) {
    for (const t of c.trail) {
      if (Math.abs(t.x - x) < 0.5 && Math.abs(t.z - z) < 0.5) return true
    }
  }
  return false
}

function chooseDir(c: CycleState, cycles: CycleState[]): Dir {
  const forward = c.dir
  const left = TURN_LEFT[c.dir]
  const right = TURN_RIGHT[c.dir]
  const options: Dir[] = [forward, left, right]
  const safe = options.filter(d => {
    const [dx, dz] = DIR_VEC[d]
    return !occupied(c.pos.x + dx, c.pos.z + dz, cycles)
  })
  if (safe.length === 0) return forward // doomed
  // prefer forward 60%, random safe 40%
  if (safe.includes(forward) && Math.random() < 0.6) return forward
  return safe[Math.floor(Math.random() * safe.length)]
}

export function useLightcycleAI() {
  const [cycles, setCycles] = useState<CycleState[]>([
    spawnCycle('cyan', 1),
    spawnCycle('magenta', 2),
  ])
  const cyclesRef = useRef(cycles)
  cyclesRef.current = cycles

  const reset = useCallback(() => {
    setTimeout(() => {
      setCycles([spawnCycle('cyan', Math.random()), spawnCycle('magenta', Math.random())])
    }, 1500)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCycles(prev => {
        const next = prev.map(c => {
          if (!c.alive) return c
          const dir = chooseDir(c, prev)
          const [dx, dz] = DIR_VEC[dir]
          const newX = c.pos.x + dx
          const newZ = c.pos.z + dz
          if (occupied(newX, newZ, prev)) {
            return { ...c, alive: false }
          }
          const newPos = new THREE.Vector3(newX, 0, newZ)
          const trail = [...c.trail, newPos]
          if (trail.length > MAX_TRAIL) trail.shift()
          return { ...c, pos: newPos, dir, trail }
        })
        if (next.every(c => !c.alive)) {
          // both dead, or round over — schedule reset
          setTimeout(() => setCycles([
            spawnCycle('cyan', Math.random()),
            spawnCycle('magenta', Math.random()),
          ]), 1500)
        }
        return next
      })
    }, TICK_MS)
    return () => clearInterval(interval)
  }, [])

  return cycles
}
```

- [ ] **Step 2:** Create `src/scenes/TronGridScene/Lightcycle.tsx`

```tsx
import { useMemo } from 'react'
import * as THREE from 'three'
import type { CycleState } from './useLightcycleAI'

export default function Lightcycle({ cycle }: { cycle: CycleState }) {
  const color = cycle.id === 'cyan' ? '#00f0ff' : '#ff2bd6'
  const points = useMemo(() => cycle.trail.map(p => new THREE.Vector3(p.x, 0.05, p.z)), [cycle.trail])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points)
    return g
  }, [points])

  // head marker
  const head = cycle.trail[cycle.trail.length - 1]

  return (
    <group>
      <line>
        <primitive attach="geometry" object={geometry} />
        <lineBasicMaterial color={color} linewidth={2} transparent opacity={cycle.alive ? 1 : 0.3} />
      </line>
      {/* Glow wall quads along trail */}
      {points.slice(0, -1).map((p, i) => {
        const next = points[i + 1]
        const dx = next.x - p.x
        const dz = next.z - p.z
        const len = Math.sqrt(dx * dx + dz * dz)
        if (len === 0) return null
        const angle = Math.atan2(dz, dx)
        const mx = (p.x + next.x) / 2
        const mz = (p.z + next.z) / 2
        return (
          <mesh key={i} position={[mx, 0.5, mz]} rotation={[0, -angle, 0]}>
            <planeGeometry args={[len, 1]} />
            <meshBasicMaterial color={color} transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
        )
      })}
      {cycle.alive && head && (
        <mesh position={[head.x, 0.3, head.z]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshBasicMaterial color={color} />
        </mesh>
      )}
    </group>
  )
}
```

- [ ] **Step 3:** Integrate into scene. Modify `src/scenes/TronGridScene/index.tsx`:

```tsx
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import GridFloor from './GridFloor'
import Lightcycle from './Lightcycle'
import { useLightcycleAI } from './useLightcycleAI'

function Cycles() {
  const cycles = useLightcycleAI()
  return <>{cycles.map(c => <Lightcycle key={c.id} cycle={c} />)}</>
}

export default function TronGridScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 6, 12], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#04060b']} />
        <fog attach="fog" args={['#04060b', 20, 80]} />
        <ambientLight intensity={0.2} />
        <GridFloor />
        <Cycles />
        <EffectComposer>
          <Bloom intensity={1.5} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
```

- [ ] **Step 4:** Verify lightcycles

Run: `npm run dev`
Expected: Two lightcycles (cyan + magenta) move in real time across the grid, leaving glowing wall trails, turning to avoid collision. When they crash, they respawn after ~1.5s.

- [ ] **Step 5:** Commit

```bash
git add src/
git commit -m "feat: add AI lightcycles with avoidance logic and trail walls"
```

### Task 6.3: Performance guards (reduced motion + tab visibility)

**Files:**
- Create: `src/hooks/useReducedMotion.ts`, `src/hooks/usePageVisible.ts`
- Modify: `src/scenes/TronGridScene/index.tsx`

- [ ] **Step 1:** Create `src/hooks/useReducedMotion.ts`

```ts
import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}
```

- [ ] **Step 2:** Create `src/hooks/usePageVisible.ts`

```ts
import { useEffect, useState } from 'react'

export function usePageVisible() {
  const [visible, setVisible] = useState(() =>
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true,
  )
  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])
  return visible
}
```

- [ ] **Step 3:** Update `src/scenes/TronGridScene/index.tsx` to respect both

```tsx
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import GridFloor from './GridFloor'
import Lightcycle from './Lightcycle'
import { useLightcycleAI } from './useLightcycleAI'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePageVisible } from '@/hooks/usePageVisible'

function Cycles() {
  const cycles = useLightcycleAI()
  return <>{cycles.map(c => <Lightcycle key={c.id} cycle={c} />)}</>
}

export default function TronGridScene() {
  const reduced = useReducedMotion()
  const visible = usePageVisible()
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 2]}
        camera={{ position: [0, 6, 12], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#04060b']} />
        <fog attach="fog" args={['#04060b', 20, 80]} />
        <ambientLight intensity={0.2} />
        <GridFloor />
        {!reduced && <Cycles />}
        <EffectComposer>
          <Bloom intensity={1.5} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
```

- [ ] **Step 4:** Verify

Run: `npm run dev`
Expected: Site still renders grid. Enable "Reduce Motion" in OS → reload → cycles should not appear. Switch browser tab → render pauses.

- [ ] **Step 5:** Commit

```bash
git add src/
git commit -m "feat: pause scene when tab hidden and respect reduced motion"
```

---

## Phase 7: Global FX

### Task 7.1: Scanlines overlay

**Files:** Create `src/components/fx/Scanlines.tsx`, modify `src/components/layout/Layout.tsx`

- [ ] **Step 1:** Create `src/components/fx/Scanlines.tsx`

```tsx
export default function Scanlines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0, 240, 255, 0.04) 2px, rgba(0, 240, 255, 0.04) 3px)',
        mixBlendMode: 'screen',
      }}
    />
  )
}
```

- [ ] **Step 2:** Mount in Layout. Add to `Layout.tsx`:

```tsx
import Scanlines from '../fx/Scanlines'
// ...
<Scanlines />
```

Place before `<Nav />`.

- [ ] **Step 3:** Verify: subtle horizontal scanlines visible everywhere. Not overwhelming.

- [ ] **Step 4:** Commit

```bash
git add src/
git commit -m "feat: add CRT scanlines overlay"
```

### Task 7.2: Custom cursor

**Files:** Create `src/components/layout/CustomCursor.tsx`, modify `Layout.tsx`

- [ ] **Step 1:** Create `src/components/layout/CustomCursor.tsx`

```tsx
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    let rx = 0, ry = 0
    const onMove = (e: MouseEvent) => {
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`
      }
      const target = e.target as HTMLElement
      setHover(!!target.closest('a, button, [data-cursor="hover"]'))
      // smooth ring follow
      requestAnimationFrame(() => {
        rx += (e.clientX - rx) * 0.2
        ry += (e.clientY - ry) * 0.2
        if (ring.current) {
          ring.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`
        }
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[200]"
        style={{ background: 'var(--neon-cyan)', boxShadow: 'var(--glow-cyan-sm)' }}
      />
      <div
        ref={ring}
        aria-hidden
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[199] transition-[width,height,border-color] duration-200"
        style={{
          border: `1px solid ${hover ? 'var(--neon-magenta)' : 'var(--neon-cyan)'}`,
          transform: hover ? 'scale(1.6)' : undefined,
        }}
      />
    </>
  )
}
```

- [ ] **Step 2:** Hide native cursor globally. Append to `src/styles/globals.css`:

```css
@media (pointer: fine) {
  html, body, * { cursor: none !important; }
}
```

- [ ] **Step 3:** Mount in Layout. Add `<CustomCursor />` to `Layout.tsx`.

- [ ] **Step 4:** Verify: cyan dot + ring follow mouse. Ring turns magenta + enlarges over links/buttons. Touch devices still work (native cursor).

- [ ] **Step 5:** Commit

```bash
git add src/
git commit -m "feat: add custom magnetic cursor"
```

### Task 7.3: Glitch text component

**Files:** Create `src/components/fx/GlitchText.tsx`

- [ ] **Step 1:** Create `src/components/fx/GlitchText.tsx`

```tsx
import { useEffect, useState } from 'react'

export default function GlitchText({
  text,
  className = '',
  as: Tag = 'span',
}: {
  text: string
  className?: string
  as?: 'span' | 'h1' | 'h2' | 'h3'
}) {
  const [display, setDisplay] = useState('')
  useEffect(() => {
    const chars = '!<>-_\\/[]{}—=+*^?#________'
    let frame = 0
    const len = text.length
    const iv = setInterval(() => {
      let out = ''
      for (let i = 0; i < len; i++) {
        if (i < frame) out += text[i]
        else out += chars[Math.floor(Math.random() * chars.length)]
      }
      setDisplay(out)
      frame++
      if (frame > len) {
        clearInterval(iv)
        setDisplay(text)
      }
    }, 40)
    return () => clearInterval(iv)
  }, [text])

  return (
    <Tag className={`relative inline-block ${className}`} aria-label={text}>
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ color: 'var(--neon-magenta)', transform: 'translate(-2px, 0)', mixBlendMode: 'screen' }}
      >
        {display}
      </span>
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ color: 'var(--neon-cyan)', transform: 'translate(2px, 0)', mixBlendMode: 'screen' }}
      >
        {display}
      </span>
      <span className="relative">{display}</span>
    </Tag>
  )
}
```

- [ ] **Step 2:** Verify by temporarily using `<GlitchText text="HELLO WORLD" />` in Home page. See scramble-to-reveal with RGB split.

- [ ] **Step 3:** Commit

```bash
git add src/
git commit -m "feat: add GlitchText component with RGB split and scramble"
```

### Task 7.4: Boot sequence

**Files:** Create `src/components/fx/BootSequence.tsx`, modify `src/App.tsx`

- [ ] **Step 1:** Create `src/components/fx/BootSequence.tsx`

```tsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  '> ESTABLISHING SECURE CONNECTION...',
  '> IDENTITY: MADDOX_KRAPE',
  '> LOADING PORTFOLIO.sys',
  '> [################] 100%',
  '> READY',
]

export default function BootSequence() {
  const seen = typeof window !== 'undefined' && sessionStorage.getItem('booted') === '1'
  const [visible, setVisible] = useState(!seen)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!visible) return
    const timers: number[] = []
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShown(i + 1), i * 280))
    })
    timers.push(
      window.setTimeout(() => {
        sessionStorage.setItem('booted', '1')
        setVisible(false)
      }, LINES.length * 280 + 400),
    )
    return () => timers.forEach(clearTimeout)
  }, [visible])

  useEffect(() => {
    if (!visible) return
    const skip = () => setVisible(false)
    window.addEventListener('click', skip)
    window.addEventListener('keydown', skip)
    return () => {
      window.removeEventListener('click', skip)
      window.removeEventListener('keydown', skip)
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[var(--bg-void)]"
        >
          <div className="font-mono text-cyan-neon text-lg md:text-xl max-w-2xl px-8 w-full">
            {LINES.slice(0, shown).map((l, i) => (
              <div key={i} className="mb-2" style={{ textShadow: 'var(--glow-cyan-sm)' }}>
                {l}
              </div>
            ))}
            <div className="inline-block w-3 h-5 bg-cyan-neon animate-pulse" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2:** Mount in App. Update `src/App.tsx`:

```tsx
import Router from './router'
import BootSequence from './components/fx/BootSequence'

export default function App() {
  return (
    <>
      <BootSequence />
      <Router />
    </>
  )
}
```

- [ ] **Step 3:** Verify: first visit in session shows boot lines, fades out. Refresh → no boot (already seen). Open new tab/incognito → boot plays again.

- [ ] **Step 4:** Commit

```bash
git add src/
git commit -m "feat: add terminal boot sequence on first session visit"
```

---

## Phase 8: Home Page

### Task 8.1: Data files

**Files:** Create `src/data/projects.ts`, `src/data/skills.ts`, `src/data/stats.ts`

- [ ] **Step 1:** Create `src/data/projects.ts`

```ts
export type ProjectCategory = 'simulation' | 'algorithm' | 'dataviz'

export type Project = {
  slug: string
  title: string
  tagline: string
  category: ProjectCategory
  thumb: string
  href: string
  accent: 'cyan' | 'magenta' | 'violet' | 'amber'
}

export const PROJECTS: Project[] = [
  {
    slug: 'gravity',
    title: 'Gravity Simulator',
    tagline: 'AP Computer Science final — Newton\'s law of universal gravitation in a 3D engine.',
    category: 'simulation',
    thumb: '/images/gravsim.jpg',
    href: '/projects/gravity',
    accent: 'cyan',
  },
  {
    slug: 'elevator',
    title: 'Elevator Simulation',
    tagline: 'Finite state machine modeling elevators with collaborative design iteration.',
    category: 'simulation',
    thumb: '/images/elevatorfsm.jpg',
    href: '/projects/elevator',
    accent: 'magenta',
  },
  {
    slug: 'huffman',
    title: 'Huffman Compression',
    tagline: 'Lossless data compression via variable-length prefix codes and binary trees.',
    category: 'algorithm',
    thumb: '/images/huffman-tree.png',
    href: '/projects/huffman',
    accent: 'violet',
  },
  {
    slug: 'hashes',
    title: 'Hashes',
    tagline: 'Hash table collision strategies: linear/quadratic probing, chaining, cuckoo.',
    category: 'algorithm',
    thumb: '/images/hashes.jpg',
    href: '/projects/hashes',
    accent: 'amber',
  },
  {
    slug: 'covid',
    title: 'COVID-19 Dashboard',
    tagline: 'Live worldwide + per-country data visualization with interactive charts.',
    category: 'dataviz',
    thumb: '/images/covid_graph.png',
    href: '/projects/covid',
    accent: 'cyan',
  },
  {
    slug: 'search',
    title: 'Search Algorithms',
    tagline: 'Visualizations of classic search algorithms — transmission incoming.',
    category: 'algorithm',
    thumb: '',
    href: '/projects/search',
    accent: 'magenta',
  },
]
```

- [ ] **Step 2:** Create `src/data/stats.ts`

```ts
export const STATS = [
  { label: 'YEARS_CODING', value: 7, suffix: '+', fill: 0.7 },
  { label: 'AP_CS_SCORE', value: 5, suffix: '/5', fill: 1.0 },
  { label: 'CHESS_ELO', value: 1600, suffix: '+', fill: 0.8 },
]
```

- [ ] **Step 3:** Create `src/data/skills.ts`

```ts
export const SKILLS = [
  { name: 'Java', group: 'lang' },
  { name: 'Python', group: 'lang' },
  { name: 'TypeScript', group: 'lang' },
  { name: 'JavaScript', group: 'lang' },
  { name: 'C++', group: 'lang' },
  { name: 'React', group: 'framework' },
  { name: 'Three.js', group: 'framework' },
  { name: 'Node.js', group: 'framework' },
  { name: 'Git', group: 'tool' },
  { name: 'Linux', group: 'tool' },
  { name: 'Docker', group: 'tool' },
  { name: 'PostgreSQL', group: 'tool' },
]
```

- [ ] **Step 4:** Commit

```bash
git add src/data
git commit -m "feat: add project, stats, and skills data"
```

### Task 8.2: SectionHeading and NeonButton components

**Files:** Create `src/components/ui/SectionHeading.tsx`, `src/components/ui/NeonButton.tsx`

- [ ] **Step 1:** Create `src/components/ui/SectionHeading.tsx`

```tsx
export default function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="font-mono text-xs tracking-widest text-cyan-neon mb-2">
        &gt; {eyebrow}
      </div>
      <h2 className="font-display text-3xl md:text-5xl text-fg" style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.2)' }}>
        {title}
      </h2>
      <div className="mt-3 h-px bg-gradient-to-r from-cyan-neon via-magenta-neon to-transparent w-48" />
    </div>
  )
}
```

- [ ] **Step 2:** Create `src/components/ui/NeonButton.tsx`

```tsx
import { Link } from 'react-router-dom'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: 'cyan' | 'magenta'
}

export default function NeonButton({ children, to, href, onClick, variant = 'cyan' }: Props) {
  const color = variant === 'cyan' ? 'var(--neon-cyan)' : 'var(--neon-magenta)'
  const base = (
    <span
      className="inline-flex items-center gap-2 px-5 py-2 font-mono text-sm tracking-widest uppercase cyber-border transition-all hover:scale-105"
      style={{ color, borderColor: color }}
    >
      {children}
    </span>
  )
  if (to) return <Link to={to}>{base}</Link>
  if (href) return <a href={href} target="_blank" rel="noreferrer">{base}</a>
  return <button onClick={onClick}>{base}</button>
}
```

- [ ] **Step 3:** Commit

```bash
git add src/components/ui
git commit -m "feat: add SectionHeading and NeonButton components"
```

### Task 8.3: ProjectCard component

**Files:** Create `src/components/project/ProjectCard.tsx`

- [ ] **Step 1:** Create `src/components/project/ProjectCard.tsx`

```tsx
import { Link } from 'react-router-dom'
import Tilt from 'react-parallax-tilt'
import type { Project } from '@/data/projects'
import { ArrowUpRight } from 'lucide-react'

const ACCENT: Record<Project['accent'], string> = {
  cyan: 'var(--neon-cyan)',
  magenta: 'var(--neon-magenta)',
  violet: 'var(--neon-violet)',
  amber: 'var(--neon-amber)',
}

export default function ProjectCard({ project }: { project: Project }) {
  const color = ACCENT[project.accent]
  return (
    <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable glareMaxOpacity={0.1} scale={1.02} transitionSpeed={1500}>
      <Link
        to={project.href}
        data-cursor="hover"
        className="group relative block panel cyber-border overflow-hidden h-full"
        style={{ borderColor: color }}
      >
        <div className="relative aspect-video overflow-hidden bg-deep">
          {project.thumb ? (
            <img
              src={project.thumb}
              alt=""
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-sm" style={{ color }}>
              &gt; NO_SIGNAL
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-void)] via-transparent to-transparent" />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-display text-lg tracking-wider" style={{ color }}>
              {project.title}
            </h3>
            <ArrowUpRight size={18} style={{ color }} className="flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-muted text-sm">{project.tagline}</p>
          <div className="mt-4 font-mono text-[10px] tracking-widest opacity-60" style={{ color }}>
            // {project.category.toUpperCase()}
          </div>
        </div>
      </Link>
    </Tilt>
  )
}
```

- [ ] **Step 2:** Commit

```bash
git add src/components/project
git commit -m "feat: add ProjectCard with tilt and cyber corners"
```

### Task 8.4: StatsHUD component

**Files:** Create `src/components/ui/StatsHUD.tsx`

- [ ] **Step 1:** Create `src/components/ui/StatsHUD.tsx`

```tsx
import { useEffect, useRef, useState } from 'react'
import { STATS } from '@/data/stats'

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true)
        io.disconnect()
      }
    }, { threshold: 0.3 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return { ref, inView }
}

function Counter({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])
  return <>{n.toLocaleString()}</>
}

export default function StatsHUD() {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className="panel cyber-border p-6 font-mono text-sm">
      <div className="text-xs text-cyan-neon tracking-widest mb-4">&gt; STATS.db</div>
      <ul className="space-y-3">
        {STATS.map(s => (
          <li key={s.label} className="grid grid-cols-[160px_1fr_auto] gap-4 items-center">
            <span className="text-muted">&gt; {s.label}</span>
            <div className="h-2 bg-deep overflow-hidden relative">
              <div
                className="h-full transition-[width] duration-1000 ease-out"
                style={{
                  width: inView ? `${s.fill * 100}%` : '0%',
                  background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))',
                  boxShadow: 'var(--glow-cyan-sm)',
                }}
              />
            </div>
            <span className="text-cyan-neon tabular-nums">
              {inView ? <Counter value={s.value} /> : '0'}{s.suffix}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 2:** Commit

```bash
git add src/components/ui/StatsHUD.tsx
git commit -m "feat: add StatsHUD with animated counters and progress bars"
```

### Task 8.5: Assemble Home page

**Files:** Replace `src/pages/Home.tsx`

- [ ] **Step 1:** Replace `src/pages/Home.tsx`

```tsx
import { useEffect, useState } from 'react'
import GlitchText from '@/components/fx/GlitchText'
import SectionHeading from '@/components/ui/SectionHeading'
import NeonButton from '@/components/ui/NeonButton'
import ProjectCard from '@/components/project/ProjectCard'
import StatsHUD from '@/components/ui/StatsHUD'
import { PROJECTS } from '@/data/projects'
import { SKILLS } from '@/data/skills'
import { Github, Linkedin, Mail } from 'lucide-react'

const TAGLINES = ['PROBLEM_SOLVER', 'DEVELOPER', 'STUDENT', 'DEBUGGER', 'COLLABORATOR']

function CyclingTagline() {
  const [i, setI] = useState(0)
  const [txt, setTxt] = useState('')
  const [phase, setPhase] = useState<'typing' | 'holding' | 'erasing'>('typing')

  useEffect(() => {
    const target = TAGLINES[i]
    if (phase === 'typing') {
      if (txt.length < target.length) {
        const t = setTimeout(() => setTxt(target.slice(0, txt.length + 1)), 70)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('erasing'), 1400)
        return () => clearTimeout(t)
      }
    }
    if (phase === 'erasing') {
      if (txt.length > 0) {
        const t = setTimeout(() => setTxt(txt.slice(0, -1)), 35)
        return () => clearTimeout(t)
      } else {
        setPhase('typing')
        setI((i + 1) % TAGLINES.length)
      }
    }
  }, [txt, phase, i])

  return (
    <span className="text-cyan-neon font-mono">
      {txt}
      <span className="inline-block w-2 h-5 bg-cyan-neon ml-1 animate-pulse" />
    </span>
  )
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[85vh] flex flex-col justify-center px-6 max-w-7xl mx-auto">
        <div className="font-mono text-xs tracking-widest text-cyan-neon mb-4">
          &gt; INITIALIZING_IDENTITY
        </div>
        <h1 className="font-display text-5xl md:text-8xl mb-6" style={{ textShadow: 'var(--glow-cyan-md)' }}>
          <GlitchText text="MADDOX KRAPE" as="span" />
        </h1>
        <div className="text-xl md:text-2xl mb-8">
          &gt; ROLE: <CyclingTagline />
        </div>
        <p className="max-w-2xl text-muted text-lg mb-10">
          Digital portfolio. Years of software engineering across simulation, algorithms,
          and data visualization. Always looking for the next interesting problem.
        </p>
        <div className="flex flex-wrap gap-4">
          <NeonButton to="/projects">&gt; VIEW_PROJECTS</NeonButton>
          <NeonButton to="/about" variant="magenta">&gt; ABOUT_ME</NeonButton>
        </div>
      </section>

      {/* About preview */}
      <section className="px-6 max-w-7xl mx-auto py-24">
        <SectionHeading eyebrow="PROFILE.dat" title="Who I Am" />
        <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
          <div className="relative">
            <img
              src="/images/profile.JPG"
              alt="Maddox Krape"
              className="w-48 h-48 object-cover cyber-border"
              style={{ borderColor: 'var(--neon-cyan)' }}
            />
          </div>
          <div>
            <p className="text-lg mb-4">
              Hey — I'm a developer and problem solver with a passion for creating solutions.
              Years of experience in software engineering across a variety of projects.
            </p>
            <p className="text-muted mb-6">
              I love brainstorming and solving complex problems, and I have a knack for finding
              innovative solutions. Constantly looking for new challenges and interesting opportunities.
            </p>
            <NeonButton to="/about">&gt; READ_MORE</NeonButton>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 max-w-7xl mx-auto py-16">
        <SectionHeading eyebrow="ACHIEVEMENTS.log" title="Stats" />
        <StatsHUD />
      </section>

      {/* Projects */}
      <section className="px-6 max-w-7xl mx-auto py-24">
        <SectionHeading eyebrow="PROJECTS.dir" title="Featured Work" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map(p => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 max-w-7xl mx-auto py-24">
        <SectionHeading eyebrow="STACK.sys" title="Tech Stack" />
        <div className="flex flex-wrap gap-3">
          {SKILLS.map(s => (
            <span key={s.name} className="panel px-4 py-2 font-mono text-sm text-cyan-neon border border-[var(--border-panel)]">
              {s.name}
            </span>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 max-w-7xl mx-auto py-24">
        <SectionHeading eyebrow="ESTABLISH_CONNECTION" title="Contact" />
        <div className="panel cyber-border p-8">
          <p className="text-lg mb-6">
            Want to work together, ask a question, or just say hi? Reach out.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://github.com/maddoxk" target="_blank" rel="noreferrer"
               className="flex items-center gap-2 text-cyan-neon hover:glow-cyan transition-all">
              <Github size={18} /> github.com/maddoxk
            </a>
            <a href="mailto:maddox.krape@gmail.com"
               className="flex items-center gap-2 text-cyan-neon hover:glow-cyan transition-all">
              <Mail size={18} /> maddox.krape@gmail.com
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2:** Verify home page

Run: `npm run dev`
Expected: Full home page with all sections visible, Tron grid behind, glitch name, cycling tagline, cards tilt on hover, stats count up when scrolled into view.

- [ ] **Step 3:** Commit

```bash
git add src/
git commit -m "feat: assemble home page with hero, about, stats, projects, skills, contact"
```

---

## Phase 9: About Page

### Task 9.1: About page content

**Files:** Replace `src/pages/About.tsx`

- [ ] **Step 1:** Replace `src/pages/About.tsx`

```tsx
import SectionHeading from '@/components/ui/SectionHeading'
import StatsHUD from '@/components/ui/StatsHUD'
import NeonButton from '@/components/ui/NeonButton'
import GlitchText from '@/components/fx/GlitchText'

const TIMELINE = [
  { year: '7+ yrs ago', title: 'First lines of code', body: 'Started tinkering and never stopped.' },
  { year: 'High school', title: 'AP Computer Science A', body: 'Earned a perfect 5/5 on the exam.' },
  { year: 'Ongoing', title: 'Simulation & algorithms', body: 'Built gravity simulators, FSM-driven elevators, Huffman compressors, and hash table experiments.' },
  { year: 'Now', title: 'Exploring the web in 3D', body: 'Bringing cyberpunk aesthetics and real-time 3D to the browser.' },
]

export default function About() {
  return (
    <div className="px-6 max-w-5xl mx-auto py-16">
      <div className="font-mono text-xs tracking-widest text-cyan-neon mb-4">
        &gt; IDENTITY.file
      </div>
      <h1 className="font-display text-4xl md:text-6xl mb-10">
        <GlitchText text="ABOUT ME" as="span" />
      </h1>

      <section className="grid md:grid-cols-[240px_1fr] gap-10 items-start mb-20">
        <img
          src="/images/profile.JPG"
          alt="Maddox Krape"
          className="w-60 h-60 object-cover cyber-border"
          style={{ borderColor: 'var(--neon-cyan)' }}
        />
        <div className="space-y-4 text-lg">
          <p>
            I'm a developer and problem solver with a passion for creating solutions. I have
            years of experience in software engineering and have worked on a variety of projects.
          </p>
          <p className="text-muted">
            I love to brainstorm and solve complex problems, and I have a knack for finding
            innovative solutions. I am constantly looking for new challenges and am always on
            the lookout for interesting opportunities.
          </p>
          <p className="text-muted">
            My projects span simulation (gravity, elevators), classic algorithms (Huffman
            compression, hash tables, search), and data visualization (COVID-19 dashboards).
            When I'm not coding, I play chess (1600+ ELO and climbing).
          </p>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeading eyebrow="ACHIEVEMENTS.log" title="By The Numbers" />
        <StatsHUD />
      </section>

      <section className="mb-20">
        <SectionHeading eyebrow="TIMELINE.log" title="Journey" />
        <ol className="relative border-l border-[var(--border-panel)] pl-8 space-y-8">
          {TIMELINE.map((t, i) => (
            <li key={i} className="relative">
              <div
                className="absolute -left-10 top-1 w-3 h-3 rounded-full"
                style={{ background: 'var(--neon-cyan)', boxShadow: 'var(--glow-cyan-sm)' }}
              />
              <div className="font-mono text-xs tracking-widest text-cyan-neon mb-1">
                &gt; {t.year}
              </div>
              <h3 className="font-display text-xl mb-2">{t.title}</h3>
              <p className="text-muted">{t.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionHeading eyebrow="NOW.sys" title="What I'm Working On" />
        <div className="panel cyber-border p-6">
          <p className="text-lg mb-4">
            Currently focused on this cyberpunk portfolio rebuild: Three.js shaders, AI behaviors
            (see the lightcycles behind this text), and modern React patterns.
          </p>
          <NeonButton to="/projects">&gt; BROWSE_PROJECTS</NeonButton>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2:** Verify About page renders

- [ ] **Step 3:** Commit

```bash
git add src/pages/About.tsx
git commit -m "feat: build about page with bio, stats, timeline"
```

---

## Phase 10: Projects Index

### Task 10.1: Projects index with filter

**Files:** Replace `src/pages/Projects.tsx`

- [ ] **Step 1:** Replace `src/pages/Projects.tsx`

```tsx
import { useState } from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import ProjectCard from '@/components/project/ProjectCard'
import GlitchText from '@/components/fx/GlitchText'
import { PROJECTS, type ProjectCategory } from '@/data/projects'

type Filter = 'all' | ProjectCategory
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'simulation', label: 'SIMULATION' },
  { key: 'algorithm', label: 'ALGORITHMS' },
  { key: 'dataviz', label: 'DATA_VIZ' },
]

export default function Projects() {
  const [f, setF] = useState<Filter>('all')
  const items = f === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === f)
  return (
    <div className="px-6 max-w-7xl mx-auto py-16">
      <div className="font-mono text-xs tracking-widest text-cyan-neon mb-4">
        &gt; PROJECTS.dir
      </div>
      <h1 className="font-display text-4xl md:text-6xl mb-10">
        <GlitchText text="ARCHIVE" as="span" />
      </h1>

      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map(x => {
          const active = f === x.key
          return (
            <button
              key={x.key}
              data-cursor="hover"
              onClick={() => setF(x.key)}
              className={`px-4 py-2 font-mono text-sm tracking-widest transition-all border ${
                active
                  ? 'text-cyan-neon border-cyan-neon glow-cyan'
                  : 'text-muted border-[var(--border-panel)] hover:text-cyan-neon hover:border-cyan-neon'
              }`}
              style={active ? { boxShadow: 'var(--glow-cyan-sm)' } : undefined}
            >
              {x.label}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(p => <ProjectCard key={p.slug} project={p} />)}
      </div>

      {items.length === 0 && (
        <div className="text-muted font-mono mt-10">&gt; NO_RECORDS_FOUND</div>
      )}
    </div>
  )
}
```

- [ ] **Step 2:** Verify filter works. Click filter buttons → grid updates.

- [ ] **Step 3:** Commit

```bash
git add src/pages/Projects.tsx
git commit -m "feat: add projects index with category filter"
```

---

## Phase 11: Project Detail Pages

### Task 11.1: ProjectHero, CodeBlock, MediaEmbed shared components

**Files:** Create `src/components/project/ProjectHero.tsx`, `src/components/project/CodeBlock.tsx`, `src/components/project/MediaEmbed.tsx`

- [ ] **Step 1:** Create `src/components/project/ProjectHero.tsx`

```tsx
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import GlitchText from '../fx/GlitchText'

export default function ProjectHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <header className="px-6 max-w-5xl mx-auto py-16 border-b border-[var(--border-panel)]">
      <Link to="/projects" className="inline-flex items-center gap-2 text-muted hover:text-cyan-neon font-mono text-sm mb-8 transition-colors">
        <ArrowLeft size={16} /> BACK_TO_ARCHIVE
      </Link>
      <div className="font-mono text-xs tracking-widest text-cyan-neon mb-4">
        &gt; {eyebrow}
      </div>
      <h1 className="font-display text-4xl md:text-6xl mb-4">
        <GlitchText text={title} as="span" />
      </h1>
      <p className="text-muted text-lg">{subtitle}</p>
    </header>
  )
}
```

- [ ] **Step 2:** Create `src/components/project/CodeBlock.tsx`

```tsx
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CodeBlock({ code, lang = 'java' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <div className="relative my-6 panel cyber-border" style={{ borderColor: 'var(--neon-cyan)' }}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-panel)] font-mono text-xs">
        <span className="text-cyan-neon">// {lang}</span>
        <button
          data-cursor="hover"
          onClick={onCopy}
          className="flex items-center gap-1 text-muted hover:text-cyan-neon transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-sm leading-relaxed text-fg">
        <code>{code}</code>
      </pre>
    </div>
  )
}
```

- [ ] **Step 3:** Create `src/components/project/MediaEmbed.tsx`

```tsx
type Props = {
  src: string
  type?: 'image' | 'video' | 'pdf'
  caption?: string
  alt?: string
  width?: string
}

export default function MediaEmbed({ src, type = 'image', caption, alt = '', width = '100%' }: Props) {
  return (
    <figure className="my-8" style={{ width }}>
      <div className="panel cyber-border overflow-hidden" style={{ borderColor: 'var(--neon-cyan)' }}>
        {type === 'image' && (
          <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
        )}
        {type === 'video' && (
          <video src={src} autoPlay muted loop playsInline className="w-full h-auto block" />
        )}
        {type === 'pdf' && (
          <div className="p-6 flex flex-col gap-3">
            <div className="font-mono text-sm text-cyan-neon">&gt; DOCUMENT.pdf</div>
            <div className="text-muted text-sm truncate">{src.split('/').pop()}</div>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="self-start inline-flex items-center gap-2 px-4 py-2 border border-cyan-neon text-cyan-neon font-mono text-xs tracking-widest hover:glow-cyan transition-all"
            >
              &gt; OPEN_DOCUMENT
            </a>
          </div>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-muted text-sm font-mono">// {caption}</figcaption>}
    </figure>
  )
}
```

- [ ] **Step 4:** Commit

```bash
git add src/components/project
git commit -m "feat: add ProjectHero, CodeBlock, and MediaEmbed"
```

### Task 11.2: Gravity Simulation page

**Files:** Replace `src/pages/projects/Gravity.tsx`

- [ ] **Step 1:** Replace `src/pages/projects/Gravity.tsx`

```tsx
import ProjectHero from '@/components/project/ProjectHero'
import CodeBlock from '@/components/project/CodeBlock'
import MediaEmbed from '@/components/project/MediaEmbed'
import NeonButton from '@/components/ui/NeonButton'

const GRAVITY_CODE = `for (CelestialBody other : allBodies) {
    if (other != this) {
        Vector3f direction = other.getGeometry().getLocalTranslation().subtract(this.getGeometry().getLocalTranslation());
        Vector3f force = direction.mult(UniverseState.G * other.getMass() / direction.lengthSquared()); // Newton's Law of Universal Gravitation
        Vector3f acceleration = force.divide(this.getMass());
        this.currentVelocity = this.currentVelocity.add(acceleration.mult(timeStep));
    }
}`

export default function Gravity() {
  return (
    <>
      <ProjectHero
        eyebrow="SIMULATION // AP_CS_FINAL"
        title="GRAVITY SIMULATION"
        subtitle="Coding the Universe with Newton's Law of Universal Gravitation."
      />
      <article className="px-6 max-w-4xl mx-auto py-12 prose-cyber">
        <h2 className="font-display text-2xl text-cyan-neon mt-10 mb-4">Coding the Universe</h2>
        <p className="text-lg mb-4">
          For this simulation, I used <b>3 main classes</b> to achieve a functional and logically
          sound simulation.
        </p>

        <h3 className="font-display text-xl text-magenta-neon mt-8 mb-3">Classes</h3>
        <ul className="space-y-4 mb-6">
          <li>
            <div className="text-cyan-neon font-mono mb-1">&gt; UniverseState</div>
            <p className="text-muted">
              Since this simulation was technically built inside a game engine, we need a class to
              take care of the current state of the universe — camera, windows, GUI, time,
              gravitational constant, etc.
            </p>
          </li>
          <li>
            <div className="text-cyan-neon font-mono mb-1">&gt; UniverseManager</div>
            <p className="text-muted">
              Computes and updates the state of the universe. It also stores the ArrayLists of
              celestial bodies and updates them.
            </p>
          </li>
          <li>
            <div className="text-cyan-neon font-mono mb-1">&gt; CelestialBody</li>
            <p className="text-muted">
              The most essential class. Used as an object to store a body's mass, velocity, and
              geometry.
            </p>
          </li>
        </ul>

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">Simulating Gravity</h2>
        <p className="mb-4">
          Simulating a universe with gravity can be done using one formula: Newton's law of universal
          gravitation.
        </p>
        <MediaEmbed src="/images/gravity_equation.svg" alt="Newton's Law of Universal Gravitation" width="340px" />
        <p className="mb-4">
          Converting this formula into code can be quite simple. I iterate through the ArrayList of
          celestial bodies and calculate the total effect of gravitational pull from each body on
          each other:
        </p>
        <CodeBlock code={GRAVITY_CODE} lang="java" />

        <h3 className="font-display text-xl text-magenta-neon mt-12 mb-3">Deep Dive</h3>
        <MediaEmbed
          src="/videos/v1gravsim.mp4"
          type="video"
          caption="First instance — 3 bodies with similar mass but different starting positions and velocities forming a circumbinary system (two bodies dance together; a third orbits them)."
        />
        <p className="mb-6">
          Here is the first example of me getting gravity to work. There are initially 3 bodies with
          similar mass but different starting positions and velocity. Tweaking numbers produced two
          bodies that dance together as a binary pair with a third body orbiting them — a
          "circumbinary system" that's pretty cool to watch.
        </p>
        <p className="mb-6">
          If you'd like to create your own, I highly recommend it — this taught me multiple valuable
          lessons in my software engineering journey. Try experimenting with different starting
          positions, velocities, and masses for the bodies. Adjust the gravitational constant to see
          how it affects motion. Simulate more complex scenarios, such as a system of multiple
          planets orbiting a star, or a galaxy with multiple stars.
        </p>
        <MediaEmbed
          src="/videos/gravsimulato.mp4"
          type="video"
          caption="Final version with controls for time, gravity, camera, and custom celestial body creation."
        />
        <p className="mb-10">
          As you continue to develop a gravity simulator, research the latest advances in celestial
          mechanics. Overall, building this was a fun and educational experience — it shows how
          difficult it is to get planets to orbit.
        </p>

        <h3 className="font-display text-xl text-magenta-neon mt-12 mb-3">Key Takeaways</h3>
        <ul className="space-y-2 text-muted mb-10">
          <li>&gt; Using object-oriented programming to store and manage data as objects</li>
          <li>&gt; Fundamental physics applied in astrophysics</li>
          <li>&gt; Working with 3D mathematics — vectors and how to manipulate them</li>
        </ul>

        <NeonButton href="https://github.com/maddoxk/UniverseSimulator">
          &gt; VIEW_ON_GITHUB
        </NeonButton>
      </article>
    </>
  )
}
```

- [ ] **Step 2:** Verify page. Note: fix a JSX typo where `</li>` was written as `</p>` in the CelestialBody list item — ensure the opening `<div>` and closing `</div>` + `</li>` match.

**Corrected list item (use this):**
```tsx
<li>
  <div className="text-cyan-neon font-mono mb-1">&gt; CelestialBody</div>
  <p className="text-muted">
    The most essential class. Used as an object to store a body's mass, velocity, and geometry.
  </p>
</li>
```

- [ ] **Step 3:** Commit

```bash
git add src/pages/projects/Gravity.tsx
git commit -m "feat: build gravity simulation detail page"
```

### Task 11.3: Elevator Simulation page

**Files:** Replace `src/pages/projects/Elevator.tsx`

- [ ] **Step 1:** Replace `src/pages/projects/Elevator.tsx`

```tsx
import ProjectHero from '@/components/project/ProjectHero'
import MediaEmbed from '@/components/project/MediaEmbed'

export default function Elevator() {
  return (
    <>
      <ProjectHero
        eyebrow="SIMULATION // A.D.E.N"
        title="ELEVATOR SIMULATION"
        subtitle="Implementing finite state machines and collaborative programming."
      />
      <article className="px-6 max-w-4xl mx-auto py-12">
        <h2 className="font-display text-2xl text-cyan-neon mt-10 mb-4">Introduction</h2>
        <p className="text-lg mb-4">
          Elevator Simulation is a group project from the course A.D.E.N. (Advanced Data Structures,
          Embedded Systems, and Networking). It's a time-driven and event-driven simulation. The
          elevator's functionality is modeled using a finite state machine, and passengers arrive at
          specified times with intended destinations — just like they would in a real building.
        </p>

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">Programming Deep-Dive</h2>
        <p className="mb-4">
          An elevator is a finite state machine — no randomness, fixed number of states.
        </p>
        <blockquote className="panel cyber-border p-6 my-6 italic text-muted" style={{ borderColor: 'var(--neon-magenta)' }}>
          "Finite-state machine (FSM), or finite-state automaton, is a mathematical model of
          computation. It is an abstract machine that can be in exactly one of a finite number of
          states at any given time."
          <footer className="text-xs mt-3 not-italic">— wikipedia.com</footer>
        </blockquote>
        <p className="mb-6">Here is the FSM diagram for the elevator simulation:</p>
        <MediaEmbed src="/images/elevatorfsm-removebg-preview.png" alt="Elevator FSM diagram" />

        <h3 className="font-display text-xl text-magenta-neon mt-10 mb-3">States</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-8">
          {['STOP', 'BOARD', 'OFFLOAD', 'OPENDOOR', 'CLOSEDOOR', 'MOVE_1_FLOOR'].map(s => (
            <div key={s} className="panel p-3 text-center font-mono text-sm text-cyan-neon border border-[var(--border-panel)]">
              {s}
            </div>
          ))}
        </div>

        <h3 className="font-display text-xl text-magenta-neon mt-10 mb-3">Each Tick Has 3 Phases</h3>
        <ol className="space-y-3 mb-6">
          <li>&gt; Check for the arrival of new passengers</li>
          <li>&gt; Execute the state and determine the next state</li>
          <li>&gt; Update the GUI if there are changes</li>
        </ol>
        <p className="text-muted mb-6">
          Executing the state has 2 sub-phases: (1) performing state actions — actions occur in the
          Elevator, Floor, and Building classes; (2) determining the next state — requires
          information from the Elevator, CallManager, and Building classes. We recommend building a
          document for each state that defines the action(s) and where they take place, plus the
          decision criteria for each possible next state and where it comes from.
        </p>

        <h3 className="font-display text-xl text-magenta-neon mt-10 mb-3">Design Stages</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <MediaEmbed src="/images/holyC - Elevator Simulation Design Document, v1.pdf" type="pdf" />
          <MediaEmbed src="/images/holyC - Elevator Simulation Design Document, v2.pdf" type="pdf" />
          <MediaEmbed src="/images/holyC - Elevator Simulation Design Document, v3 (1).pdf" type="pdf" />
        </div>

        <h3 className="font-display text-xl text-magenta-neon mt-10 mb-3">Analysis</h3>
        <MediaEmbed src="/images/holyC - Elevator Analysis.pdf" type="pdf" />

        <h3 className="font-display text-xl text-magenta-neon mt-10 mb-3">4K Timelapse</h3>
        <MediaEmbed src="/videos/4k Elevator Timelapse.mp4" type="video" caption="Note: file path contains spaces — served from public/videos/." />
      </article>
    </>
  )
}
```

- [ ] **Step 2:** Move the timelapse. If `4k Elevator Timelapse.mp4` lives in `public/images/` (from old site), move it:

```bash
mv "public/images/4k Elevator Timelapse.mp4" "public/videos/4k Elevator Timelapse.mp4" 2>/dev/null || true
mv "public/images/4k Elevator Timelapse.gif" "public/videos/4k Elevator Timelapse.gif" 2>/dev/null || true
```

The `%20` URL-encoding is handled by the browser automatically when you set `src="/videos/4k Elevator Timelapse.mp4"` but for safety, rename with underscores:

```bash
mv "public/videos/4k Elevator Timelapse.mp4" "public/videos/4k_elevator_timelapse.mp4" 2>/dev/null || true
```

Then update the MediaEmbed src to `/videos/4k_elevator_timelapse.mp4`.

- [ ] **Step 3:** Verify

- [ ] **Step 4:** Commit

```bash
git add -A
git commit -m "feat: build elevator simulation detail page"
```

### Task 11.4: Huffman Compression page

**Files:** Replace `src/pages/projects/Huffman.tsx`

- [ ] **Step 1:** Replace `src/pages/projects/Huffman.tsx` with the full content port. Full page code:

```tsx
import ProjectHero from '@/components/project/ProjectHero'
import CodeBlock from '@/components/project/CodeBlock'
import MediaEmbed from '@/components/project/MediaEmbed'
import NeonButton from '@/components/ui/NeonButton'

const WEIGHTS_CODE = `void generateWeights(String infName) {
    // Open the input file
    File inf = fio.getFileHandle(infName);
    int status = fio.getFileStatus(inf, true);

    // Make sure file is readable
    if(readErrorCheck(status)) return;

    // reset weights
    initWeights();
    BufferedReader br = fio.openBufferedReader(inf);
    int c = 0;
    try {
        // Read the input file one character at a time until EOF
        while ((c = br.read()) != -1) {
            try {
                weights[c]++;
            } catch (ArrayIndexOutOfBoundsException e) {
                // Ignore the character if it is not in the ASCII range
            }
        }
        // Increment the count for the EOF character
        weights[0]++;
        br.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
    outf = fio.getFileHandle(infName + ".csv");
    saveWeightsToFile(outf.getName());
}`

const TREE_CODE = `/**
 * Builds the huffman tree. Make sure to:
 * 1) initialize root to null (cleanup any prior conversions)
 * 2) re-initialize the encodeMap
 * 3) initialize the queue
 * 4) build the tree:
 *    while the queue is not empty:
 *       pop the head of the queue into the left HuffmanTreeNode.
 *       if the queue is empty - set root = left, and return;
 *       pop the head of the queue into the right HuffmanTreeNode
 *       create a new non-leaf HuffmanTreeNode whose children are left and right,
 *       and whose weight is the sum of the weight of the left and right children
 *       add the new node back to the queue.
 */
void buildHuffmanTree(boolean minimize) {

    HuffmanTreeNode left, right;

    root = null;

    encodeMap = new String[NUM_ASCII];

    initializeHuffmanQueue(minimize);

    while (!queue.isEmpty()) {
        left = queue.poll();
        if (queue.isEmpty()) {
            root = left;
            return;
        }
        right = queue.poll();
        queue.add(new HuffmanTreeNode(left.getWeight() + right.getWeight(), left, right));
    }
}`

export default function Huffman() {
  return (
    <>
      <ProjectHero
        eyebrow="ALGORITHM // COMPRESSION"
        title="HUFFMAN COMPRESSION"
        subtitle="Data structures, algorithms, and variable-length prefix encoding."
      />
      <article className="px-6 max-w-4xl mx-auto py-12">
        <h2 className="font-display text-2xl text-cyan-neon mt-10 mb-4">History</h2>
        <p className="text-lg mb-4">
          Huffman compression, invented by David A. Huffman in 1952, revolutionized data encoding
          through its innovative variable-length prefix coding system. Inspired by a challenge from
          his MIT professor, Huffman developed an algorithm that efficiently allocated shorter codes
          to more frequently occurring symbols. This groundbreaking technique drastically reduced
          the average code length for messages, transforming the digital landscape and becoming
          widely adopted in various applications.
        </p>

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">How Does Compression Work?</h2>
        <p className="mb-4">
          File compression is the process of reducing the size of a file to save disk space and make
          it easier to transfer. One popular method takes advantage of the fact that some characters
          appear more frequently in a file than others. By replacing frequently occurring characters
          with shorter codes, the overall size of the file can be reduced without losing any of the
          original information.
        </p>

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">Implementation — Part 1: Encoding</h2>
        <p className="mb-4">
          Weights in Huffman Compression refer to the frequencies of characters in the input data.
          The algorithm assigns shorter codes to more frequently occurring characters and longer
          codes to less frequent ones, resulting in an efficient compression scheme. To utilize a
          balanced tree, follow these steps:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted mb-6">
          <li>Determine the frequency (weight) of each character in the input data. <b className="text-fg">Characters with more frequency have more "Weight".</b></li>
          <li>Create a leaf node for each character and add it to a priority queue based on its frequency.</li>
          <li>While there is more than one node in the queue, remove the two nodes with the lowest frequencies.</li>
          <li>Create a new internal node with the sum of the two removed nodes' frequencies as its weight. This new node becomes the parent of the removed nodes.</li>
          <li>Insert the new internal node back into the priority queue.</li>
          <li>Repeat steps 3-5 until there is only one node left in the queue, which becomes the root of the balanced Huffman tree.</li>
          <li>Traverse the tree from the root to each leaf node, assigning a binary code (0 or 1) to each edge along the path. The final code for each character is the sequence of edge codes followed from the root to the corresponding leaf node.</li>
        </ol>
        <MediaEmbed src="/images/Huffman_huff_demo.gif" alt="Huffman compression demo animation" caption="Tree building in action." />

        <p className="mb-4">The following code reads an ASCII file and produces the weights:</p>
        <CodeBlock code={WEIGHTS_CODE} lang="java" />

        <p className="mb-4">The following code takes the weights and file and builds a Huffman tree:</p>
        <CodeBlock code={TREE_CODE} lang="java" />

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">Implementation — Part 2: Decoding</h2>
        <p className="mb-4">
          The main objective is to restore the original data from the compressed version. Here's how
          Huffman decompression works:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted mb-6">
          <li><b className="text-fg">Retrieve the Huffman tree:</b> To decode, you need the same tree used during compression. It's typically stored at the beginning of the compressed file.</li>
          <li><b className="text-fg">Traverse the Huffman tree:</b> Start at the root. Read bit by bit — 0 goes left, 1 goes right.</li>
          <li><b className="text-fg">Identify the character:</b> Continue until a leaf node is reached — that's a character. Append it to the output.</li>
          <li><b className="text-fg">Repeat:</b> Go back to the root and continue reading until end of compressed data.</li>
          <li><b className="text-fg">Terminate the output:</b> Some implementations use an EOF marker to signal end of data.</li>
        </ol>

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">Key Takeaways</h2>
        <ol className="list-decimal list-inside space-y-3 text-muted mb-8">
          <li><b className="text-fg">Importance of data compression:</b> Huffman compression is a widely used lossless algorithm that highlights the significance of efficient data storage and transmission.</li>
          <li><b className="text-fg">Adaptive nature:</b> The algorithm adapts to the input, creating a unique tree and encoding for each file.</li>
          <li><b className="text-fg">Lossless compression:</b> No information is lost — the original data can be perfectly reconstructed.</li>
          <li><b className="text-fg">Binary tree structure:</b> The use of a binary tree is key, enabling efficient encoding and decoding.</li>
          <li><b className="text-fg">Greedy approach:</b> Huffman coding is greedy — most frequent characters get the shortest codes for optimal compression.</li>
          <li><b className="text-fg">Broad applications:</b> Used in image/audio/text compression and some network protocols like HTTP/2.</li>
          <li><b className="text-fg">Learning experience:</b> Implementing this teaches valuable lessons in data structures, algorithms, and programming.</li>
        </ol>

        <NeonButton href="https://github.com/maddoxk/">&gt; VIEW_ON_GITHUB</NeonButton>
      </article>
    </>
  )
}
```

- [ ] **Step 2:** Verify

- [ ] **Step 3:** Commit

```bash
git add src/pages/projects/Huffman.tsx
git commit -m "feat: build huffman compression detail page"
```

### Task 11.5: Hashes page

**Files:** Replace `src/pages/projects/Hashes.tsx`

- [ ] **Step 1:** Replace `src/pages/projects/Hashes.tsx`

```tsx
import ProjectHero from '@/components/project/ProjectHero'
import MediaEmbed from '@/components/project/MediaEmbed'

export default function Hashes() {
  return (
    <>
      <ProjectHero
        eyebrow="ALGORITHM // COLLISION_RESOLUTION"
        title="HASHES"
        subtitle="Data structures and algorithms: probing, chaining, and cuckoo hashing."
      />
      <article className="px-6 max-w-4xl mx-auto py-12">
        <h2 className="font-display text-2xl text-cyan-neon mt-10 mb-4">Description</h2>
        <p className="text-lg mb-4">
          In this project, the objective was to study and implement various hashing algorithms to
          efficiently store and retrieve data in a hash table. Hashing algorithms are widely used
          in computer science to provide fast access to data by mapping keys to array indices.
        </p>

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">Hash Implementation</h2>
        <p className="mb-4">
          <b className="text-magenta-neon">Linear probing</b> is a technique where, if a collision
          occurs (i.e., two keys hash to the same index), the algorithm searches for the next
          available slot in the hash table sequentially. <b className="text-magenta-neon">Quadratic
          probing</b> uses a quadratic function to determine the next available slot.
        </p>
        <p className="mb-4">
          <b className="text-magenta-neon">Linked list hashing</b> handles collisions by creating a
          linked list at each index of the hash table. If multiple keys hash to the same index,
          they are stored as nodes in the linked list — a chain-like structure for collision
          resolution.
        </p>
        <p className="mb-4">
          <b className="text-magenta-neon">Cuckoo hashing</b> uses two separate hash functions to
          compute two different indices for each key. If a collision occurs at one index, the key
          is "kicked out" to its alternate index. This process continues until either an empty slot
          is found or a maximum number of kicks is reached.
        </p>

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">Reflection</h2>
        <p className="mb-4">
          This project taught me different hashing algorithms and their benefits. Understanding the
          pros and cons of each helps with choosing one for a given application. Personally,
          understanding how to avoid clustering was a challenge. I wonder what other hashing
          algorithms are still undiscovered.
        </p>
        <p className="mb-6">You can browse the full analysis here:</p>
        <MediaEmbed src="/images/ADEN- Hashes Analysis.pdf" type="pdf" />
      </article>
    </>
  )
}
```

- [ ] **Step 2:** The PDF filename contains a space — URL-safe. Alternatively rename:

```bash
mv "public/images/ADEN- Hashes Analysis.pdf" "public/images/ADEN-Hashes-Analysis.pdf" 2>/dev/null || true
```

Then update the MediaEmbed src to `/images/ADEN-Hashes-Analysis.pdf`.

- [ ] **Step 3:** Verify

- [ ] **Step 4:** Commit

```bash
git add -A
git commit -m "feat: build hashes detail page"
```

### Task 11.6: Search Algorithms placeholder page

**Files:** Replace `src/pages/projects/Search.tsx`

- [ ] **Step 1:** Replace `src/pages/projects/Search.tsx`

```tsx
import ProjectHero from '@/components/project/ProjectHero'
import NeonButton from '@/components/ui/NeonButton'

export default function Search() {
  return (
    <>
      <ProjectHero
        eyebrow="ALGORITHM // INCOMING"
        title="SEARCH ALGORITHMS"
        subtitle="Transmission incoming — this project is still compiling."
      />
      <article className="px-6 max-w-3xl mx-auto py-24 text-center">
        <div className="panel cyber-border p-10 md:p-16 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent 0, transparent 6px, var(--neon-cyan) 6px, var(--neon-cyan) 7px)',
            }}
          />
          <div className="relative">
            <div className="font-mono text-xs tracking-widest text-cyan-neon mb-4 animate-pulse">
              &gt; SIGNAL_ACQUIRED [░░░░░░░░░░ 13%]
            </div>
            <h2 className="font-display text-3xl md:text-5xl mb-6 glow-cyan">
              COMING ONLINE
            </h2>
            <p className="text-muted mb-6 max-w-xl mx-auto">
              Visualizations of classic search algorithms — binary search, breadth-first / depth-first
              search, A*, Dijkstra, and more. Check back soon for interactive demos.
            </p>
            <NeonButton to="/projects">&gt; BACK_TO_ARCHIVE</NeonButton>
          </div>
        </div>
      </article>
    </>
  )
}
```

- [ ] **Step 2:** Commit

```bash
git add src/pages/projects/Search.tsx
git commit -m "feat: add search algorithms coming-soon placeholder"
```

### Task 11.7: COVID-19 Dashboard page

**Files:** Create `src/pages/projects/Covid.tsx`, `src/lib/covidApi.ts`

- [ ] **Step 1:** Create `src/lib/covidApi.ts`

```ts
const BASE = 'https://disease.sh/v3/covid-19'

export type GlobalStats = {
  cases: number
  deaths: number
  recovered: number
  active: number
  critical: number
  updated: number
}

export type CountryStats = GlobalStats & {
  country: string
  countryInfo: { flag: string; iso2: string }
  population: number
}

export async function fetchGlobal(): Promise<GlobalStats> {
  const r = await fetch(`${BASE}/all`)
  if (!r.ok) throw new Error('Failed to fetch global data')
  return r.json()
}

export async function fetchCountries(): Promise<CountryStats[]> {
  const r = await fetch(`${BASE}/countries?sort=cases`)
  if (!r.ok) throw new Error('Failed to fetch countries')
  return r.json()
}

export async function fetchHistorical(country: string, days = 90): Promise<{ cases: Record<string, number>; deaths: Record<string, number> }> {
  const r = await fetch(`${BASE}/historical/${encodeURIComponent(country)}?lastdays=${days}`)
  if (!r.ok) throw new Error('Failed to fetch historical data')
  const data = await r.json()
  return data.timeline ?? data
}
```

- [ ] **Step 2:** Create `src/pages/projects/Covid.tsx`

```tsx
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import ProjectHero from '@/components/project/ProjectHero'
import NeonButton from '@/components/ui/NeonButton'
import { fetchGlobal, fetchCountries, fetchHistorical, type CountryStats, type GlobalStats } from '@/lib/covidApi'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

const CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#e6f1ff', font: { family: 'JetBrains Mono' } } },
    tooltip: { backgroundColor: '#0a0f1e', borderColor: '#00f0ff', borderWidth: 1, titleColor: '#00f0ff', bodyColor: '#e6f1ff' },
  },
  scales: {
    x: { grid: { color: 'rgba(0, 240, 255, 0.1)' }, ticks: { color: '#7a8aa8', font: { family: 'JetBrains Mono', size: 10 } } },
    y: { grid: { color: 'rgba(0, 240, 255, 0.1)' }, ticks: { color: '#7a8aa8', font: { family: 'JetBrains Mono', size: 10 } } },
  },
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="panel p-3 border border-[var(--border-panel)]">
      <div className="font-mono text-[10px] tracking-widest text-muted">{label}</div>
      <div className="font-display text-xl text-cyan-neon" style={{ textShadow: 'var(--glow-cyan-sm)' }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </div>
  )
}

export default function Covid() {
  const [global, setGlobal] = useState<GlobalStats | null>(null)
  const [countries, setCountries] = useState<CountryStats[]>([])
  const [selected, setSelected] = useState('USA')
  const [history, setHistory] = useState<{ cases: Record<string, number>; deaths: Record<string, number> } | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([fetchGlobal(), fetchCountries()])
      .then(([g, c]) => { setGlobal(g); setCountries(c) })
      .catch(e => setErr(e.message))
  }, [])

  useEffect(() => {
    if (!selected) return
    fetchHistorical(selected).then(setHistory).catch(e => setErr(e.message))
  }, [selected])

  const selectedCountry = countries.find(c => c.country === selected || c.countryInfo?.iso2 === selected)

  const data = history ? {
    labels: Object.keys(history.cases),
    datasets: [
      {
        label: 'Cases',
        data: Object.values(history.cases),
        borderColor: '#00f0ff',
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Deaths',
        data: Object.values(history.deaths),
        borderColor: '#ff2bd6',
        backgroundColor: 'rgba(255, 43, 214, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  } : null

  return (
    <>
      <ProjectHero
        eyebrow="DATA_VIZ // PUBLIC_HEALTH"
        title="COVID-19 DASHBOARD"
        subtitle="Live worldwide and per-country data visualization via disease.sh."
      />
      <article className="px-6 max-w-5xl mx-auto py-12">
        {err && (
          <div className="panel cyber-border p-4 mb-6 text-magenta-neon font-mono text-sm" style={{ borderColor: 'var(--neon-magenta)' }}>
            &gt; ERROR: {err} — data source temporarily unreachable.
          </div>
        )}

        <section className="mb-12">
          <h2 className="font-display text-2xl text-cyan-neon mb-6">Worldwide</h2>
          {global ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat label="TOTAL_CASES" value={global.cases} />
              <Stat label="ACTIVE" value={global.active} />
              <Stat label="RECOVERED" value={global.recovered} />
              <Stat label="DEATHS" value={global.deaths} />
              <Stat label="CRITICAL" value={global.critical} />
              <Stat label="UPDATED" value={new Date(global.updated).toLocaleDateString()} />
            </div>
          ) : (
            <div className="text-muted font-mono">&gt; LOADING_GLOBAL...</div>
          )}
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-cyan-neon mb-6">Country Data</h2>
          <div className="mb-6">
            <label className="block font-mono text-xs text-muted mb-2">&gt; SELECT_COUNTRY</label>
            <select
              value={selected}
              onChange={e => setSelected(e.target.value)}
              className="panel border border-cyan-neon px-4 py-2 font-mono text-sm text-cyan-neon bg-transparent w-full md:w-96"
            >
              {countries.map(c => (
                <option key={c.country} value={c.country} className="bg-deep">
                  {c.country}
                </option>
              ))}
            </select>
          </div>
          {selectedCountry && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <Stat label="POPULATION" value={selectedCountry.population} />
              <Stat label="CASES" value={selectedCountry.cases} />
              <Stat label="DEATHS" value={selectedCountry.deaths} />
              <Stat label="RECOVERED" value={selectedCountry.recovered} />
            </div>
          )}
          {data && (
            <div className="panel cyber-border p-4" style={{ height: 400 }}>
              <Line data={data} options={CHART_OPTS as any} />
            </div>
          )}
        </section>

        <section>
          <h2 className="font-display text-2xl text-cyan-neon mb-4">Learn More</h2>
          <p className="text-muted mb-4">Explore how COVID-19 data is collected and analyzed.</p>
          <NeonButton href="https://www.ecdc.europa.eu/en/covid-19/data-collection">
            &gt; OPEN_ECDC_DATA_SOURCE
          </NeonButton>
        </section>
      </article>
    </>
  )
}
```

- [ ] **Step 3:** Verify. Test COVID page — it should fetch live data and render charts. If API fails, error banner shows.

- [ ] **Step 4:** Commit

```bash
git add src/
git commit -m "feat: build covid-19 dashboard with live disease.sh data"
```

---

## Phase 12: Page Transitions & Polish

### Task 12.1: Scan-sweep page transition

**Files:** Create `src/components/fx/PageTransition.tsx`, modify `src/router.tsx`

- [ ] **Step 1:** Create `src/components/fx/PageTransition.tsx`

```tsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const loc = useLocation()
  const [prevKey, setPrevKey] = useState(loc.pathname)
  const [sweeping, setSweeping] = useState(false)

  useEffect(() => {
    if (prevKey !== loc.pathname) {
      setSweeping(true)
      const t = setTimeout(() => {
        setSweeping(false)
        setPrevKey(loc.pathname)
      }, 700)
      return () => clearTimeout(t)
    }
  }, [loc.pathname, prevKey])

  return (
    <>
      <AnimatePresence>
        {sweeping && (
          <motion.div
            key="scan"
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[500] pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(0, 240, 255, 0.15) 48%, var(--neon-cyan) 50%, rgba(0, 240, 255, 0.15) 52%, transparent 100%)',
              boxShadow: '0 0 60px rgba(0, 240, 255, 0.5)',
            }}
          />
        )}
      </AnimatePresence>
      <motion.div
        key={loc.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  )
}
```

- [ ] **Step 2:** Modify `src/components/layout/Layout.tsx` to wrap main content:

```tsx
import { Outlet } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import Scanlines from '../fx/Scanlines'
import CustomCursor from './CustomCursor'
import PageTransition from '../fx/PageTransition'

const TronGridScene = lazy(() => import('../../scenes/TronGridScene'))

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Suspense fallback={null}>
        <TronGridScene />
      </Suspense>
      <Scanlines />
      <CustomCursor />
      <Nav />
      <main className="flex-1 pt-20 relative z-10">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 3:** Verify page transitions. Navigate between routes — neon sweep plays, new page fades up from below.

- [ ] **Step 4:** Commit

```bash
git add src/
git commit -m "feat: add scan-sweep page transitions"
```

### Task 12.2: Lenis smooth scroll

**Files:** Create `src/hooks/useLenis.ts`, modify `src/components/layout/Layout.tsx`

- [ ] **Step 1:** Create `src/hooks/useLenis.ts`

```ts
import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    let raf = 0
    const tick = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}
```

- [ ] **Step 2:** Call in Layout. Add to `Layout.tsx`:

```tsx
import { useLenis } from '@/hooks/useLenis'

export default function Layout() {
  useLenis()
  // rest unchanged
}
```

- [ ] **Step 3:** Verify smooth scroll is active everywhere.

- [ ] **Step 4:** Commit

```bash
git add src/
git commit -m "feat: add lenis smooth scrolling"
```

### Task 12.3: 404 page

**Files:** Replace `src/pages/NotFound.tsx`

- [ ] **Step 1:** Replace `src/pages/NotFound.tsx`

```tsx
import GlitchText from '@/components/fx/GlitchText'
import NeonButton from '@/components/ui/NeonButton'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-xs tracking-widest text-magenta-neon mb-4 animate-pulse">
        &gt; SIGNAL_LOST [CONNECTION_TIMEOUT]
      </div>
      <h1 className="font-display text-6xl md:text-9xl mb-4">
        <GlitchText text="404" as="span" />
      </h1>
      <p className="text-muted mb-8 max-w-md">
        The path you requested doesn't exist in this grid. Return to origin.
      </p>
      <NeonButton to="/">&gt; RETURN_HOME</NeonButton>
    </section>
  )
}
```

- [ ] **Step 2:** Commit

```bash
git add src/pages/NotFound.tsx
git commit -m "feat: add cyberpunk 404 page"
```

### Task 12.4: Accessibility and skip-link

**Files:** Modify `src/components/layout/Layout.tsx`, `src/styles/globals.css`

- [ ] **Step 1:** Add skip-to-content link in Layout (before `<Nav />`):

```tsx
<a
  href="#main"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:bg-deep focus:text-cyan-neon focus:px-4 focus:py-2 focus:border focus:border-cyan-neon"
>
  &gt; SKIP_TO_CONTENT
</a>
```

Add `id="main"` to the `<main>` element.

- [ ] **Step 2:** Add focus-visible styles. Append to `globals.css`:

```css
*:focus-visible {
  outline: 2px solid var(--neon-cyan);
  outline-offset: 3px;
}
```

- [ ] **Step 3:** Commit

```bash
git add src/
git commit -m "feat: add skip-to-content link and focus rings"
```

---

## Phase 13: Build & Deploy

### Task 13.1: Production build verification

- [ ] **Step 1:** Full build test

Run: `npm run build`
Expected: `dist/` with `index.html`, `assets/`, all JS chunks, no errors. Main bundle ideally under 400KB gzipped.

- [ ] **Step 2:** Preview the build

Run: `npm run preview`
Expected: Site runs at `http://localhost:4173/` and renders identically to dev mode.

- [ ] **Step 3:** Manual QA checklist. Visit each route in preview mode:
  - [ ] `/#/` — hero, glitch name, cycling tagline, Tron grid + lightcycles, about preview, stats counting up, 6 project cards with tilt, skills chips, contact
  - [ ] `/#/about` — bio, profile image, stats, timeline, now
  - [ ] `/#/projects` — all 6 cards, filter buttons work
  - [ ] `/#/projects/gravity` — text, equation SVG, Java code with copy, videos play
  - [ ] `/#/projects/elevator` — FSM diagram, states, PDFs open in new tab, timelapse plays
  - [ ] `/#/projects/huffman` — history, code blocks, demo GIF, GitHub link
  - [ ] `/#/projects/hashes` — text, PDF link
  - [ ] `/#/projects/covid` — live data loads, country selector changes chart
  - [ ] `/#/projects/search` — placeholder renders
  - [ ] `/#/nonexistent` — 404 page
  - [ ] Nav works on all pages, mobile menu toggles
  - [ ] Boot sequence plays first visit, not on refresh

- [ ] **Step 4:** Commit (no file changes expected, just the fix-ups if any):

```bash
git add -A
git diff --cached --quiet || git commit -m "chore: QA polish pass"
```

### Task 13.2: GitHub Actions deploy workflow

**Files:** Create `.github/workflows/deploy.yml`

- [ ] **Step 1:** Create `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master, main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2:** Enable GitHub Pages in repo settings → Pages → Source: "GitHub Actions" (this is a manual step the user must confirm).

- [ ] **Step 3:** Commit

```bash
git add .github/
git commit -m "ci: add GitHub Pages deploy workflow"
```

### Task 13.3: README

**Files:** Create `README.md`

- [ ] **Step 1:** Create `README.md`

```markdown
# maddoxk.github.io

Personal portfolio of Maddox Krape. Cyberpunk/neon-grid aesthetic built with React, Three.js, and GSAP.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Push to `master` / `main` — GitHub Actions builds and deploys automatically to GitHub Pages.

## Stack

- Vite + React 18 + TypeScript
- Three.js via react-three-fiber (Tron grid hero scene)
- Tailwind CSS v4
- Framer Motion + GSAP
- Lenis smooth scroll
- Chart.js (COVID dashboard)
- HashRouter (GitHub Pages SPA routing)
```

- [ ] **Step 2:** Commit

```bash
git add README.md
git commit -m "docs: add README"
```

### Task 13.4: Final integration test

- [ ] **Step 1:** Merge worktree back to master (follow user's normal flow)

- [ ] **Step 2:** Push to GitHub, wait for Actions to deploy

- [ ] **Step 3:** Visit `https://maddoxk.github.io/` — verify production site loads, Tron grid animates, all routes work.

- [ ] **Step 4:** Check the success criteria from spec §15 are all met.

---

## Self-Review Notes

- All 6 project pages have content ported from legacy HTML (§6 spec)
- Tron grid with 2 AI lightcycles implemented in Phase 6 (§4.1 spec)
- Boot sequence, glitch text, scanlines, custom cursor, scan-sweep transitions all present (§4.2–4.8 spec)
- Stats HUD with animated counters (§4.7 spec)
- HashRouter used for GitHub Pages compatibility (§10 spec)
- Reduced motion and tab visibility handled (§11 spec)
- COVID uses disease.sh live API with error fallback (§9 spec)
- All links work (/about, /projects, and 6 project routes exist)


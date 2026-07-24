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

## Interactive Components

Integrated React Bits 3D & WebGL interactive components:
- **`<ASCIIText />`**: Three.js GLSL vertex/fragment wavy ASCII filter text display (`text="Maddox"`).
- **`<CircularGallery />`**: 3D interactive ring displaying technology stack, official logos, and engineering values with auto-rotation.
- **`<DitherBackground />`**: Procedural 4x4 Bayer matrix plasma wave hero background canvas.
- **`<VariableProximity />`**: Real-time font variation axis proximity effect (`'wght'` and `'opsz'`).
- **`<LogoLoop />`**: Infinite technology stack logo loop marquee.

## Stack

- Vite + React 18 + TypeScript
- Three.js & OGL WebGL Shader Engines
- Tailwind CSS v4
- Framer Motion + GSAP
- Lenis smooth scroll
- Chart.js (COVID dashboard)
- HashRouter (GitHub Pages SPA routing)

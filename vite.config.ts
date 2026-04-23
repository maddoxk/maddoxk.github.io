import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const chunkGroups: Record<string, string[]> = {
  three: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
  gsap: ['gsap'],
  charts: ['chart.js', 'react-chartjs-2'],
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          for (const [chunkName, packages] of Object.entries(chunkGroups)) {
            if (packages.some((pkg) => id.includes(`node_modules/${pkg}/`))) {
              return chunkName
            }
          }
          return undefined
        },
      },
    },
  },
})

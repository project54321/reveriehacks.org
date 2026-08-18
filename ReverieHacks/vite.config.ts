import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
    headers: {
      'X-Frame-Options': 'ALLOWALL'
    }
  },
  plugins: [
    react(),
    tailwindcss(),
    // GitHub Pages has no SPA rewrite, so a hard-load of /sponsors etc. would 404.
    // Copy the built index.html to 404.html — Pages serves it for any unknown path
    // and React Router takes over client-side.
    {
      name: 'spa-fallback-404',
      closeBundle() {
        const dist = resolve(import.meta.dirname, 'dist')
        copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
      },
    },
  ],
})
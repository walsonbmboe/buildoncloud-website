/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { htmlPrerender } from 'vite-plugin-html-prerender'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Pre-render HTML for SEO crawlability (Requirement 20.6)
    // Note: vite-plugin-html-prerender uses Puppeteer under the hood.
    // Ensure Puppeteer is available in the build environment (CI/CD).
    htmlPrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/portfolio', '/about', '/pricing', '/blog', '/contact'],
      selector: '#root',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})

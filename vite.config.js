import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Vite's default target (Chrome 111, Safari 16.4) lets the CSS minifier
    // rewrite media queries in range syntax: "(min-width: 56rem)" becomes
    // "(width>=56rem)", which Safari before 16.4 ignores, dropping the rule.
    // scripts/check-css-compat.js keeps this from coming back.
    target: ['chrome103', 'edge103', 'firefox102', 'safari15'],
  },
  css: {
    // An inline config stops Vite from searching parent directories for a
    // postcss.config.js, so a config outside this project cannot affect the build.
    postcss: {},
  },
})

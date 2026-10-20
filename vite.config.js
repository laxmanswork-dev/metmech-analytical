import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // An inline config stops Vite from searching parent directories for a
    // postcss.config.js, so a config outside this project cannot affect the build.
    postcss: {},
  },
})

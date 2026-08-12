import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/my_portfolio_website/',
  build: {
    outDir: 'docs', // <--- Outputs build to /docs instead of /dist
  },
})
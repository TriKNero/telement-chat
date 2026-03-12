import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

const base = process.env.VITE_BASE ?? '/telement-chat/'

export default defineConfig({
  base,
  plugins: [
    react(),
    {
      name: 'gh-pages-404',
      closeBundle() {
        const outDir = resolve(__dirname, 'dist')
        const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<script>sessionStorage.redirect=location.pathname;location.replace("${base}")</script>
</head>
<body>Redirecting...</body>
</html>`
        writeFileSync(resolve(outDir, '404.html'), html)
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.ts',
    pool: 'threads',
  },
})

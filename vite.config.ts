import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      generatedRouteTree: './generated/router/index.ts',
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@/generated': path.resolve(__dirname, './generated'),
      '@': path.resolve(__dirname, './src'),
      '@/generated': path.resolve(__dirname, './generated'),
    },
  },
})

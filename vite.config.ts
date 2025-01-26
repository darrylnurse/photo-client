import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/photos': {
        target: 'https://photoserver-q49m.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/photos/, ''), // Rewrite path if needed
      },
    },
  }
})

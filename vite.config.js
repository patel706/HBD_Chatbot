import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/backend/**']
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000', // Matches Python Backend Port
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
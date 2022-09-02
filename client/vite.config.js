import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log('PORT', process.env.PORT)
console.log('CLIENT_PORT', process.env.CLIENT_PORT)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true,
    port: process.env.CLIENT_PORT,
    hmr: {
      host: '127.0.0.1',
      clientPort: process.env.CLIENT_PORT
    }
  }
})

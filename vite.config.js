import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  // Only use base path in production build (for GitHub Pages deployment)
  // In development, use '/' so you can access at localhost:5173
  base: command === 'build' ? '/FootBall_League_Manager/' : '/'
}))

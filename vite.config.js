import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "github" ? "/FootBall_League_Manager/" : "/",
  build: {
    outDir: "dist", // 👈 this generates dist folder
    emptyOutDir: true,
  }
}))



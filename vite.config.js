import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ApiSimpsons_2025IIg1_Almario_Kevin_and_Lopez_Mauricio/',
  server: {
    host: true, 
    port: 5173 
  }
})

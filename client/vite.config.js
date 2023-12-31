import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  //adding a proxy for making localhost same for frontend and backend
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        secure: false
      }
    }
  },
  plugins: [react()],
})

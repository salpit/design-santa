import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Definiamo le variabili una per una.
      // Questo evita l'errore "invalid characters" perché filtriamo solo quelle che ci servono,
      // e evita di rompere React mantenendo intatto process.env.NODE_ENV gestito da Vite.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env.NEXT_PUBLIC_SUPABASE_URL': JSON.stringify(env.NEXT_PUBLIC_SUPABASE_URL),
      'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    }
  }
})

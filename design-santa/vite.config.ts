import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carica le variabili dal file .env locale se esiste, oppure dall'ambiente di sistema
  // il terzo parametro '' significa "carica tutte le variabili", non solo quelle con prefisso VITE_
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Mapping esplicito delle variabili necessarie.
      // Usiamo || process.env.NOME_VAR per assicurarci di prendere anche quelle iniettate da Vercel
      // se loadEnv non le avesse catturate (anche se di solito lo fa).
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY),
      'process.env.NEXT_PUBLIC_SUPABASE_URL': JSON.stringify(env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
      'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    }
  }
})

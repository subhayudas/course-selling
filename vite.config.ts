import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `NEXT_PUBLIC_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  // Default values for Supabase credentials if not provided in environment
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || "https://wqmnjyhksmlawxxjjmnb.supabase.co";
  const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxbW5qeWhrc21sYXd4eGpqbW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3OTI5MTUsImV4cCI6MjA2MzM2ODkxNX0.xoR2e6b-OxvtegoBM8bi9mu_rDvGwDXc68S6UN688tE";

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Define environment variables to be replaced in the client code
    define: {
      'import.meta.env.NEXT_PUBLIC_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(supabaseAnonKey),
    },
    // Ensure proper handling of client-side routing
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
  };
});

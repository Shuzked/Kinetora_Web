import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
        manualChunks: (id) => {
          // Put framer-motion in its own chunk (not in critical path)
          if (id.includes('framer-motion')) return 'framer-motion';
          // Split lucide icons separately
          if (id.includes('lucide-react')) return 'lucide';
          // React core
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'react-core';
          // React Router
          if (id.includes('react-router')) return 'react-router';
          // TanStack Query
          if (id.includes('@tanstack')) return 'tanstack';
          // All other node_modules into vendor
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
}));


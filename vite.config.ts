import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ ssrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  ssr: {
    noExternal: ["react-helmet-async"],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    modulePreload: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@radix-ui')) {
              return 'radix';
            }
            if (id.includes('framer-motion')) {
              return 'framer';
            }
            if (id.includes('recharts')) {
              return 'charts';
            }
            if (id.includes('swiper')) {
              return 'swiper';
            }
            if (id.includes('socket.io-client')) {
              return 'socket';
            }
            if (id.includes('lucide-react') || id.includes('class-variance-authority') || id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'ui';
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom') || id.includes('react-helmet-async')) {
              return 'vendor';
            }
            return 'vendor';
          }
        }
      },
    },
  },
}));
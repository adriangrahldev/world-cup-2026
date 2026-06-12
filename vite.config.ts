import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import sourceIdentifierPlugin from 'vite-plugin-source-identifier'

const isProd = process.env.BUILD_MODE === 'prod'

export default defineConfig({
  plugins: [
    react(),
    sourceIdentifierPlugin({
      enabled: !isProd,
      attributePrefix: 'data-matrix',
      includeProps: true,
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    minify: 'esbuild',
    sourcemap: false,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor split: React & React DOM together (loaded once, cached)
          'react-vendor': ['react', 'react-dom'],
          // Heavy vendor: icons, charts, calendar, etc.
          'icons-vendor': ['lucide-react'],
          // Analytics loaded separately
          'analytics': ['@vercel/analytics/react'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(png|jpg|jpeg|webp|avif|svg)$/.test(name ?? '')) {
            return 'assets/img/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  esbuild: {
    legalComments: 'none',
  },
  server: {
    port: 5173,
    headers: {
      // Dev only — Vercel sets these in prod
      'Cache-Control': 'no-store',
    },
  },
})

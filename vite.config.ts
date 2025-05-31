import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isAnalyze = mode === 'analyze';
  
  return {
    plugins: [
      react(),
      // Compress assets for production
      compression({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
      // Conditionally add bundle analyzer
      isAnalyze && visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    optimizeDeps: {
      exclude: ['lucide-react'],
      include: ['gsap', 'react', 'react-dom', 'react-router-dom'],
    },
    build: {
      sourcemap: false,
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            animations: ['gsap', 'split-type'],
            ui: ['styled-components']
          },
          // Break out chunks for more efficient caching
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        }
      }
    },
    server: {
      port: 5173,
      host: true,
      // Add caching for development
      headers: {
        'Cache-Control': 'max-age=3600',
      },
    },
    preview: {
      port: 4173,
      host: true,
      headers: {
        'Cache-Control': 'max-age=31536000', // 1 year for static assets
      },
    },
  };
});
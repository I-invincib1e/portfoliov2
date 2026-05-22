// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import compression from "file:///home/project/node_modules/vite-plugin-compression/dist/index.mjs";
import { visualizer } from "file:///home/project/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var vite_config_default = defineConfig(({ mode }) => {
  const isAnalyze = mode === "analyze";
  return {
    plugins: [
      react(),
      // Compress assets for production
      compression({
        algorithm: "gzip",
        ext: ".gz"
      }),
      compression({
        algorithm: "brotliCompress",
        ext: ".br"
      }),
      // Conditionally add bundle analyzer
      isAnalyze && visualizer({
        open: true,
        filename: "dist/stats.html",
        gzipSize: true,
        brotliSize: true
      })
    ],
    optimizeDeps: {
      exclude: ["lucide-react"],
      include: ["gsap", "react", "react-dom", "react-router-dom"]
    },
    build: {
      sourcemap: false,
      cssCodeSplit: true,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
            animations: ["gsap", "split-type"],
            ui: ["styled-components"]
          },
          // Break out chunks for more efficient caching
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]"
        }
      }
    },
    server: {
      port: 5173,
      host: true,
      // Add caching for development
      headers: {
        "Cache-Control": "max-age=3600"
      }
    },
    preview: {
      port: 4173,
      host: true,
      headers: {
        "Cache-Control": "max-age=31536000"
        // 1 year for static assets
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nO1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcic7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGlzQW5hbHl6ZSA9IG1vZGUgPT09ICdhbmFseXplJztcbiAgXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgcmVhY3QoKSxcbiAgICAgIC8vIENvbXByZXNzIGFzc2V0cyBmb3IgcHJvZHVjdGlvblxuICAgICAgY29tcHJlc3Npb24oe1xuICAgICAgICBhbGdvcml0aG06ICdnemlwJyxcbiAgICAgICAgZXh0OiAnLmd6JyxcbiAgICAgIH0pLFxuICAgICAgY29tcHJlc3Npb24oe1xuICAgICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXG4gICAgICAgIGV4dDogJy5icicsXG4gICAgICB9KSxcbiAgICAgIC8vIENvbmRpdGlvbmFsbHkgYWRkIGJ1bmRsZSBhbmFseXplclxuICAgICAgaXNBbmFseXplICYmIHZpc3VhbGl6ZXIoe1xuICAgICAgICBvcGVuOiB0cnVlLFxuICAgICAgICBmaWxlbmFtZTogJ2Rpc3Qvc3RhdHMuaHRtbCcsXG4gICAgICAgIGd6aXBTaXplOiB0cnVlLFxuICAgICAgICBicm90bGlTaXplOiB0cnVlLFxuICAgICAgfSksXG4gICAgXSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J10sXG4gICAgICBpbmNsdWRlOiBbJ2dzYXAnLCAncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxuICAgICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgICAgICBhbmltYXRpb25zOiBbJ2dzYXAnLCAnc3BsaXQtdHlwZSddLFxuICAgICAgICAgICAgdWk6IFsnc3R5bGVkLWNvbXBvbmVudHMnXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgLy8gQnJlYWsgb3V0IGNodW5rcyBmb3IgbW9yZSBlZmZpY2llbnQgY2FjaGluZ1xuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uW2V4dF0nLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IDUxNzMsXG4gICAgICBob3N0OiB0cnVlLFxuICAgICAgLy8gQWRkIGNhY2hpbmcgZm9yIGRldmVsb3BtZW50XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDYWNoZS1Db250cm9sJzogJ21heC1hZ2U9MzYwMCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcHJldmlldzoge1xuICAgICAgcG9ydDogNDE3MyxcbiAgICAgIGhvc3Q6IHRydWUsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDYWNoZS1Db250cm9sJzogJ21heC1hZ2U9MzE1MzYwMDAnLCAvLyAxIHllYXIgZm9yIHN0YXRpYyBhc3NldHNcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBQ2xCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsa0JBQWtCO0FBRzNCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sWUFBWSxTQUFTO0FBRTNCLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQTtBQUFBLE1BRU4sWUFBWTtBQUFBLFFBQ1YsV0FBVztBQUFBLFFBQ1gsS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUFBLE1BQ0QsWUFBWTtBQUFBLFFBQ1YsV0FBVztBQUFBLFFBQ1gsS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUFBO0FBQUEsTUFFRCxhQUFhLFdBQVc7QUFBQSxRQUN0QixNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsUUFDVixVQUFVO0FBQUEsUUFDVixZQUFZO0FBQUEsTUFDZCxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsY0FBYztBQUFBLE1BQ1osU0FBUyxDQUFDLGNBQWM7QUFBQSxNQUN4QixTQUFTLENBQUMsUUFBUSxTQUFTLGFBQWEsa0JBQWtCO0FBQUEsSUFDNUQ7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLFFBQVE7QUFBQSxNQUNSLGVBQWU7QUFBQSxRQUNiLFVBQVU7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLGVBQWU7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGNBQWM7QUFBQSxZQUNaLFFBQVEsQ0FBQyxTQUFTLGFBQWEsa0JBQWtCO0FBQUEsWUFDakQsWUFBWSxDQUFDLFFBQVEsWUFBWTtBQUFBLFlBQ2pDLElBQUksQ0FBQyxtQkFBbUI7QUFBQSxVQUMxQjtBQUFBO0FBQUEsVUFFQSxnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUE7QUFBQSxNQUVOLFNBQVM7QUFBQSxRQUNQLGlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLFFBQ1AsaUJBQWlCO0FBQUE7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

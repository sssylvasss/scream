import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Frontend runs on port 3000
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Backend runs on port 8080
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove /api prefix
      },
    },
  },
});
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Removed "@" alias, use relative paths instead
      // Example: import App from './src/app/App.jsx'
      // No special alias needed
    }
  },
  server: {
    port: 5173, // fixed port
  },
});

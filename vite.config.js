import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/f8-zoom-day40/", // Tên repo của bạn
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

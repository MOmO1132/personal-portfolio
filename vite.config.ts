import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // 相对路径：构建产物可直接双击打开（file://），也方便部署到任意子路径
  base: "./",
  plugins: [react(), tailwindcss()],
});

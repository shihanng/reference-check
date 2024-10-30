import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteSingleFile(),
    viteStaticCopy({
      targets: [{ src: ["appsscript.json", "src/server/main.ts"], dest: "./" }],
    }),
  ],
});

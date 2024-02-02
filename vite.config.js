const Path = require("path");
const vuePlugin = require("@vitejs/plugin-vue");
import vuetify from "vite-plugin-vuetify";

const { defineConfig } = require("vite");

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
  root: Path.join(__dirname, "src", "renderer"),
  publicDir: "public",
  server: {
    port: 8080,
  },
  open: false,
  build: {
    outDir: Path.join(__dirname, "build", "renderer"),
    emptyOutDir: true,
  },
  plugins: [
    vuePlugin(),
    vuetify({
      autoImport: true,
    }),
  ],
});

module.exports = config;

// // Plugins
// import vue from "@vitejs/plugin-vue";
// import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// // Utilities
// import { defineConfig } from "vite";
// // import { fileURLToPath, URL } from "node:url";

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: process.env.ELECTRON == "true" ? "./" : ".",
//   plugins: [
//     vue({
//       template: { transformAssetUrls },
//     }),
//     // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
//     vuetify({
//       autoImport: true,
//     }),
//   ],
//   define: { "process.env": {} },
//   resolve: {
//     extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
//   },
//   server: {
//     port: 3000,
//   },
// });

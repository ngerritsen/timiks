import fs from "fs";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

import buildNumber from "./public/build.json";

export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    createHtmlPlugin({
      inject: {
        data: {
          criticalJs: fs.readFileSync('./src/critical/script.js'),
          criticalCss: fs.readFileSync('./src/critical/style.css'),
          buildNumber,
        },
      },
    }),
  ],
});

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { paymentFormApiPlugin } from './vite.paymentFormApi.js'

// Loads the built stylesheet without blocking first paint. main.jsx waits for
// it before rendering, so users never see unstyled content; <noscript> keeps
// it working without JS.
function asyncCssPlugin() {
  return {
    name: 'async-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(
          /<link rel="stylesheet"([^>]*?) href="([^"]+)"([^>]*)>/g,
          (_m, pre, href, post) =>
            `<link rel="stylesheet"${pre} href="${href}"${post} media="print" onload="this.media='all'" data-async-css>` +
            `<noscript><link rel="stylesheet" href="${href}"></noscript>`,
        );
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), paymentFormApiPlugin(), asyncCssPlugin()],
  build: {
    // Evergreen browsers only: avoids shipping legacy transforms/polyfills.
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('gsap')) return 'gsap';
            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('/scheduler/')
            ) {
              return 'react';
            }
          }
        },
      },
    },
  },
})

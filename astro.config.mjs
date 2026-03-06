// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// GitHub Pages: PUBLIC_SITE_URL=https://user.github.io PUBLIC_BASE_PATH=/repo-name
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://th-engineering.jp',
  base: process.env.PUBLIC_BASE_PATH || '/',
  vite: {
    plugins: [tailwindcss()]
  }
});

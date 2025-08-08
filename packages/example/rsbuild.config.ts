import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  html: {
    title: 'Fairys Admin React',
    favicon: './public/logo.png',
  },
  plugins: [pluginReact()],
});

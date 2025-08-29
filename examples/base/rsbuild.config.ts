import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
  output: {
    assetPrefix: '/fairys-admin-react/',
  },
  server: {
    base: '/fairys-admin-react/',
  },
  html: {
    title: 'Fairys Admin React',
    favicon: './public/logo.png',
  },
  plugins: [pluginReact()],
  tools: {
    postcss: (_, { addPlugins }) => {
      addPlugins([tailwindcss()]);
    },
  },
});

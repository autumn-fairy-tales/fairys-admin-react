import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { getLoadingHtmlTags, RsbuildReactRoutesPlugin } from '@fairys/admin-tools-react-plugins';
import { pluginMockServer } from 'rspack-plugin-mock/rsbuild';

export default defineConfig({
  output: {
    assetPrefix: '/fairys-admin-react/',
  },
  server: {
    base: '/fairys-admin-react/',
    // The plugin will read the `proxy` option from the `server`
    proxy: {
      '/api': 'http://example.com',
    },
  },
  html: {
    title: 'Fairys Admin React',
    favicon: './public/logo.png',
    tags: getLoadingHtmlTags('Fairys'),
  },
  plugins: [
    pluginMockServer(),
    pluginReact(),
    RsbuildReactRoutesPlugin({
      watchDirs: [{ dir: 'src/docs', routePrefix: '/docs' }],
    }),
  ],
  tools: {
    postcss: (_, { addPlugins }) => {
      addPlugins([tailwindcss()]);
    },
  },
});

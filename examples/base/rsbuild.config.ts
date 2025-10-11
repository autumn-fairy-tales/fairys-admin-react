import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { getLoadingHtmlTags, ReactRoutesPlugin } from '@fairys/admin-tools-react-plugins';
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
    tags: getLoadingHtmlTags('Fairys'),
  },
  plugins: [pluginReact()],
  tools: {
    postcss: (_, { addPlugins }) => {
      addPlugins([tailwindcss()]);
    },
    rspack: {
      plugins: [
        new ReactRoutesPlugin({
          loadType: 'lazy',
          keepAliveBasePath: '@fairys/admin-tools-react/lib/components/keep-alive',
        }),
      ],
    },
  },
});

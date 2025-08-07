import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { defineConfig, RslibConfig } from '@rslib/core';
import tailwindcss from '@tailwindcss/postcss';
export default defineConfig(() => {
  return {
    source: {
      entry: {
        index: ['./src/**', '!src/**/*.md'],
      },
    },
    lib: [
      {
        bundle: false,
        dts: true,
        format: 'esm',
        output: {
          filename: {
            js: '[name].js',
          },
          distPath: {
            root: './esm',
          },
        },
      },
      {
        bundle: false,
        dts: true,
        format: 'cjs',
        output: {
          filename: {
            js: '[name].js',
          },
          distPath: {
            root: './lib',
          },
        },
      },
    ],
    tools: {
      postcss: (_, { addPlugins }) => {
        addPlugins([tailwindcss()]);
      },
    },
    output: {
      target: 'web',
    },
    plugins: [
      pluginReact(),
      pluginSvgr({
        mixedImport: true,
        svgrOptions: { exportType: 'named' },
      }),
    ],
  } as RslibConfig;
});

import * as path from 'node:path';
import { defineConfig } from 'rspress/config';
import { pluginPreview } from '@rspress/plugin-preview';

export default defineConfig({
  lang: 'zh',
  base: process.env.NODE_ENV === 'production' ? '/fairys-admin-react/' : '/',
  root: path.join(__dirname, 'docs'),
  title: 'Fairys Admin',
  icon: '/logo.png',
  globalStyles: path.join(__dirname, 'styles/index.css'),
  ssg: false,
  logo: {
    light: '/logo.png',
    dark: '/logo.png',
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/autumn-fairy-tales/fairys-admin-react',
      },
    ],
    locales: [
      {
        lang: 'zh',
        label: '中文',
        prevPageText: '上一页',
        nextPageText: '下一页',
        lastUpdated: true,
        lastUpdatedText: '最后更新',
        searchPlaceholderText: '搜索',
        searchNoResultsText: '没有结果',
        searchSuggestedQueryText: '请使用其他关键字重试',
        overview: {
          filterNameText: '过滤',
          filterPlaceholderText: '输入关键词',
          filterNoResultText: '未找到匹配内容',
        },
      },
    ],
  },

  plugins: [pluginPreview({ defaultRenderMode: 'pure' }) as any],
  // builderConfig: {
  //   html: {
  //     tags: [
  //       {
  //         tag: 'script',
  //         head: true,
  //         append: false,
  //         attrs: {
  //           src: 'https://fastly.jsdelivr.net/npm/live2d-widgets@0/autoload.js',
  //         },
  //       },
  //       {
  //         tag: 'style',
  //         children: `
  //         #waifu{ z-index:999999  }
  //         #waifu-toggle{ z-index:999999;position:absolute; }
  //         `,
  //         head: true,
  //         append: false,
  //       },
  //     ],
  //   },
  // },
});

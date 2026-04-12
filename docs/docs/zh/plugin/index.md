---
title: 插件
overview: true
---

## 安装

```bash
npm install @fairys/admin-tools-react-plugins # yarn add @fairys/admin-tools-react-plugins # pnpm add @fairys/admin-tools-react-plugins
```

## 插件列表

| 插件名称 | 描述 | 文档 |
| --- | --- | --- |
| Loading 插件 | 用于页面未加载完成时显示 loading 效果 | [Loading 插件](./loading.md) |
| 路由生成插件 | 通过目录结构自动生成路由配置 | [路由生成插件](./route.md) |

## 插件使用指南

### 1. 同时使用多个插件

您可以在项目中同时使用多个插件，例如同时使用 Loading 插件和路由生成插件：

```ts title="rsbuild.config.ts"
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { getLoadingHtmlTags, RsbuildReactRoutesPlugin } from '@fairys/admin-tools-react-plugins';

export default defineConfig({
  html: {
    tags: getLoadingHtmlTags('Fairys'),
  },
  plugins: [
    pluginReact(),
    RsbuildReactRoutesPlugin({
      watchDirs: [{ dir: 'src/pages', routePrefix: '/' }],
    }),
  ],
});
```

### 2. 插件配置最佳实践

#### Loading 插件

- **使用场景**：适用于所有需要在页面加载时显示加载动画的项目
- **配置建议**：在 `html.tags` 中添加 `getLoadingHtmlTags` 生成的标签
- **注意事项**：加载完成后需要手动调用 `loadingFadeOut` 方法隐藏加载动画

#### 路由生成插件

- **使用场景**：适用于需要根据目录结构自动生成路由的项目
- **配置建议**：
  - 对于大型项目，建议使用 `loadType: 'lazy'` 实现路由懒加载
  - 对于需要页面缓存的项目，建议配置 `keepAliveBasePath`
  - 对于多目录路由，使用 `watchDirs` 配置多个目录
- **注意事项**：
  - 当 `loadType = lazy` 时，如果需要开启页面缓存，建议同时配置 `keepAliveBasePath` 值
  - `keepAliveBasePath` 配置不可和 `FairysRoot` 组件中的 `isOutletKeepAlive` 配置同时开启

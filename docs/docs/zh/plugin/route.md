# 路由生成

通过目录结构生成路由配置，目录结构既是路由地址

:::tip 

在项目中引入路由数据，例如：

```ts
import routes from '@fairys:routes';
// 或
import routes from '@@/routes';
// 或
import routes from '@/.fairys/routes';
```

:::

## rsbuild配置

```ts
import { defineConfig } from '@rsbuild/core';
import { RsbuildReactRoutesPlugin } from '@fairys/admin-tools-react-plugins';
export default defineConfig({
  // ...
  plugins: [
    // ...
    RsbuildReactRoutesPlugin({}),
  ],
});
```

## rspack配置

```ts
import { defineConfig } from '@rsbuild/core';
import { ReactRoutesPlugin } from '@fairys/admin-tools-react-plugins';
export default defineConfig({
  tools: {
    rspack: {
      plugins: [
        // ....
        new ReactRoutesPlugin({}),
      ],
    },
  },
});

```

注意：
- 在使用ts项目时，需要在`tsconfig.json`中添加如下配置：
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@@/*": ["./src/.fairys/*"],
      "@fairys:routes": ["./src/.fairys/routes"]
    }
  },
}
```

## 配置项

```ts

export interface ReactRoutesPluginOptions {
  /**
   * @description 加载类型
   * @default "layout_default_lazy"
   *
   * @choices ["lazy", "default", "layout_default_lazy"]
   *
   * "lazy": 异步加载
   *
   * "default": 同步加载
   *
   * "layout_default_lazy": 布局默认加载没有其他子路由时异步加载
   */
  loadType?: 'lazy' | 'default' | 'layout_default_lazy';
  /**
   * @description 监听目录
   * @default ["src/pages"]
   */
  watchDirs?: WatchDirsItem[];
  /**
   * @description 是否根据目录结构生成树路由
   */
  isTreeRoute?: boolean;

  /**
   * @description 保持路由组件的 HOC 函数
   */
  keepAliveBasePath?: string;
}

export interface WatchDirsItem {
  /**
   * @description 监听目录
   * @default "src/pages"
   */
  dir: string;
  /**
   * @description 路由前缀
   * @default "/"
   */
  routePrefix?: string;
}

```
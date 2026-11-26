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

:::tip 注意

在使用ts项目时，需要在`tsconfig.json`中添加如下配置：

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
:::

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
  /**
   * @description 自定义 HydrateFallback 组件
   */
  hydrateFallback?: string;
  /**
   * @description 路由级错误边界组件模块路径（需默认导出组件）
   */
  errorElement?: string;
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

:::tip 通配路由

特殊页面支持 `404` / `403` / `500` / `catch-all`（生成 `/*`）。旧文件名 `*` 仍兼容，但 Windows 不允许 `*` 作为文件名，建议使用 `catch-all.tsx`。

:::

:::tip 路由级错误兜底

配置 `errorElement` 后，生成的路由会额外包一层 pathless 路由：

```tsx
{
  ErrorBoundary: FairysErrorElement,
  children: [ /* 生成的页面路由 */ ],
}
```

页面组件渲染异常、懒加载失败时展示 500 页，而不是 React Router 的默认错误界面。示例：

```ts
RsbuildReactRoutesPlugin({
  errorElement: '@fairys/admin-tools-react/esm/components/error-page/error-element',
})
```

:::

:::tip 默认 HydrateFallback 组件代码

```tsx
function HydrateFallback() {
    return <p> Loading </p>;
}
```
:::


:::warning 注意

当`loadType = lazy`时，如果需要开启页面缓存，建议同时配置`keepAliveBasePath`值。否则页面缓存第一次打开不生效，需要再次打开才生效。

`keepAliveBasePath` 配置不可和 `FairysRoot` 组件中的 `isOutletKeepAlive` 配置同时开启。

当配置 `keepAliveBasePath` 时，`FairysRoot` 组件中的 `isOutletKeepAlive` 设置为 `false`, 否则控制台会报错。

:::

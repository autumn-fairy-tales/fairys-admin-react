# routerDataInstance 路由数据

:::tip 提示

用于存储当前应用的路由数据，包括路由配置、路由跳转方法等。

:::

:::warning 注意

请在渲染`Layout`和`FairysRoot`组件之前，调用`createBrowserRouter`或`createMemoryRouter`或`createHashRouter`方法初始化路由

:::

## 引入

```ts
import { routerDataInstance } from '@fairys/admin-tools-react';
```

## 实体类

```ts
import type { DataRouter, NavigateFunction, To, NavigateOptions, RouteObject, DOMRouterOpts, MemoryRouterOpts } from 'react-router';
export class RouterDataInstance {
    router: DataRouter | undefined;
    /**跳转前回调*/
    onNavigateBefore: (to: To, next: (to?: To, options?: NavigateOptions) => void) => Promise<boolean>;
    /**内置跳转方法*/
    navigate: (to: To | number, options?: NavigateOptions) => Promise<void>;
    createBrowserRouter: (routes: RouteObject[], opts?: DOMRouterOpts) => DataRouter;
    createMemoryRouter: (routes: RouteObject[], opts?: MemoryRouterOpts) => DataRouter;
    createHashRouter: (routes: RouteObject[], opts?: DOMRouterOpts) => DataRouter;
    /**清空tab项*/
    clear: () => void;
}
```

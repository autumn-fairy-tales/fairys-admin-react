# KeepAlive 组件

## 功能说明

`KeepAliveBaseHOC` 是基于 `react-activation` 的路由级缓存高阶组件，用于在路由切换时保留页面状态，供约定式路由插件（`keepAliveBasePath`）自动包裹页面组件。

## 组件结构

- `index.tsx` — 高阶组件实现（同时提供命名导出与默认导出）

## API

### KeepAliveBaseHOC(Component, id)

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `Component` | `React.ComponentType` | 需要缓存的页面组件 |
| `id` | `string` | 缓存键，同一页面必须唯一；约定式路由插件会传入 `fairys_admin_keep_alive_${path}` |

返回一个新的组件，内部使用 `<KeepAlive name={id} id={id} cacheKey={id}>` 包裹页面，并叠加 `FairysMotionAnimation`。页面切换动画由 `settingDataInstance.pageTransitionMode` 控制，**没有第三个 options 参数**。

## 使用示例

### 手动包裹页面

```tsx
import KeepAliveBaseHOC from '@fairys/admin-tools-react/esm/components/keep-alive';

const Page = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};

const KeepAlivePage = KeepAliveBaseHOC(Page, 'fairys_admin_keep_alive_/demo');
```

### 通过约定式路由插件自动包裹

`RsbuildReactRoutesPlugin` 的 `keepAliveBasePath` 指向本模块即可，插件会为每个页面生成 `KeepAliveBaseHOC(Component, id)`：

```ts
RsbuildReactRoutesPlugin({
  keepAliveBasePath: '@fairys/admin-tools-react/esm/components/keep-alive',
});
```

### 清理/刷新缓存

```ts
import { appDataInstance } from '@fairys/admin-tools-react';

// 关闭单个页面缓存
appDataInstance.aliveController?.drop?.('fairys_admin_keep_alive_/demo');

// 刷新单个页面缓存
appDataInstance.aliveController?.refresh?.('fairys_admin_keep_alive_/demo');
```

## 缓存作用域

使用 `routerDataInstance.createBrowserRouter` / `createHashRouter` / `createMemoryRouter` 时，路由树最外层会自动注入 `FairysAliveRoute`：

- `AliveScope` 位于 `RouterProvider` 内，缓存页面的 `useLocation` / `useNavigate` / `useParams` 等 router context 可正常使用。
- 外部自行创建的 router 会退回 `FairysRoot` 外层 `AliveScope`（兼容旧行为），但缓存页的 router context 需自行验证；建议用 `FairysAliveRoute` 手动包裹路由数组。
- 缓存控制器（`appDataInstance.aliveController`）由 `AliveRoute` 自动挂载。

## 注意事项

- `id` 必须与页面路径一一对应；动态路由会按具体 pathname 缓存（`/detail/1`、`/detail/2` 各自一份）。
- 只有 `FairysRoot` 的 `keepAlive` 开启时缓存才生效。
- 若页面内依赖 `react-router` 上下文，需在浏览器回归中验证缓存页的 `useNavigate/useParams` 行为。

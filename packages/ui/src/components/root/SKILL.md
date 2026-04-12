# Root 组件

## 功能说明
Root 组件是应用的根组件，用于提供全局上下文和状态管理，集成了路由、缓存、暗模式等功能，为整个应用提供统一的基础设置。

## 组件结构
- `index.tsx` - 组件主要实现

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `router` | `Router` | - | 路由配置 |
| `keepAlive` | `boolean` | `false` | 是否启用组件缓存 |
| `isOutletKeepAlive` | `boolean` | `false` | 是否启用 Outlet 组件缓存 |
| `children` | `React.ReactNode` | - | 应用内容 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

## 使用示例

### 基本用法
```tsx
import { FairysRoot } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysRoot>
      <div>应用内容</div>
    </FairysRoot>
  );
};
```

### 带路由配置
```tsx
import { FairysRoot } from '@fairys-admin/ui';
import { createBrowserRouter } from 'react-router-dom';

// 创建路由
const router = createBrowserRouter([
  {
    path: '/',
    element: <div>首页</div>
  },
  {
    path: '/about',
    element: <div>关于页</div>
  }
]);

const App = () => {
  return (
    <FairysRoot router={router}>
      {/* 路由内容将通过 router 渲染 */}
    </FairysRoot>
  );
};
```

### 启用缓存
```tsx
import { FairysRoot } from '@fairys-admin/ui';
import { createBrowserRouter } from 'react-router-dom';

// 创建路由
const router = createBrowserRouter([
  {
    path: '/',
    element: <div>首页</div>
  },
  {
    path: '/about',
    element: <div>关于页</div>
  }
]);

const App = () => {
  return (
    <FairysRoot 
      router={router}
      keepAlive={true}
      isOutletKeepAlive={true}
    >
      {/* 路由内容将通过 router 渲染，并且会被缓存 */}
    </FairysRoot>
  );
};
```

### 自定义样式
```tsx
import { FairysRoot } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysRoot 
      className="custom-root"
      style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}
    >
      <div>应用内容</div>
    </FairysRoot>
  );
};
```

## 特性
- 提供全局上下文
- 支持路由配置（router）
- 支持组件缓存（keepAlive）
- 支持 Outlet 组件缓存（isOutletKeepAlive）
- 集成暗模式
- 集成加载状态
- 支持自定义样式

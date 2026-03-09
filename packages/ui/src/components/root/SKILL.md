# Root 组件

## 功能说明
Root 组件是应用的根组件，用于提供全局上下文和状态管理，集成了路由、缓存、暗模式等功能。

## 组件结构
- `index.tsx` - 组件主要实现

## 使用示例
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
      {/* 如果不使用路由，可以直接在这里放置应用内容 */}
      {/* <div>应用内容</div> */}
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

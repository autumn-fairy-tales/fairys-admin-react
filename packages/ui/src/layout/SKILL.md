# Layout 组件

## 功能说明
Layout 组件用于创建应用的整体布局结构，包括头部、侧边栏、内容区域等，根据设置自动渲染布局结构。

## 组件结构
- `index.tsx` - 布局主组件
- `content/` - 内容区域组件
- `header/` - 头部组件
- `sider/` - 侧边栏组件
- `tab-bar/` - 标签栏组件
- `tool-bar/` - 工具栏组件

## 使用示例
```tsx
import { Layout } from '@fairys-admin/ui';

const App = () => {
  return (
    <Layout />
  );
};
```

## 特性
- 支持多种布局模式（main_sub_left, main_left, main_top_header, main_top_sub_left_header, left, left_header）
- 支持响应式布局
- 自动根据设置渲染头部、侧边栏和内容区域
- 支持深色模式
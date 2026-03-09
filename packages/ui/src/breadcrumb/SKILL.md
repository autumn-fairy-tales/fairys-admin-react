# Breadcrumb 组件

## 功能说明
Breadcrumb 组件用于显示当前页面的导航路径，从 context 中获取面包屑数据。

## 组件结构
- `index.tsx` - 组件主要实现

## 使用示例
```tsx
import { Breadcrumb } from '@fairys-admin/ui';

const App = () => {
  return (
    <Breadcrumb />
  );
};
```

## 特性
- 自动从路由和菜单数据生成面包屑
- 支持响应式布局
- 支持自定义分隔符
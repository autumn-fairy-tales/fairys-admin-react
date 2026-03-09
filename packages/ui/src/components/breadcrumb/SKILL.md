# Breadcrumb 组件

## 功能说明
Breadcrumb 组件用于显示当前页面的导航路径，帮助用户了解当前位置并方便返回上一级页面。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## 使用示例
```tsx
import { FairysBreadcrumbBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysBreadcrumbBase items={[
      { title: '首页', path: '/' },
      { title: '设置', path: '/settings' },
      { title: '用户设置', path: '/settings/user' }
    ]} separate="bg" />
  );
};
```

## 特性
- 支持自定义分隔符（separate）
- 支持面包屑项类名和样式自定义
- 支持第一个面包屑项无内边距（isFristNoPadding）

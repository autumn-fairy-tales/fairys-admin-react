# MainMenu 组件

## 功能说明
MainMenu 组件用于创建应用的主菜单，分为左侧主菜单和顶部主菜单。

## 组件结构
- `index.tsx` - 组件主要实现

## 使用示例
```tsx
import { MainMenu } from '@fairys-admin/ui';

// 垂直布局（左侧主菜单）
const App = () => {
  return (
    <MainMenu layoutMode="vertical" />
  );
};

// 水平布局（顶部主菜单）
const App2 = () => {
  return (
    <MainMenu layoutMode="horizontal" />
  );
};
```

## 特性
- 支持垂直和水平布局（layoutMode）
- 支持多级菜单
- 支持响应式布局
- 支持深色模式
- 支持菜单展开/折叠
- 支持点击菜单跳转
- 支持打开新窗口
- 支持自定义菜单项
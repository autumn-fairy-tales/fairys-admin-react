# Logo 组件

## 功能说明
Logo 组件用于显示应用的 logo。

## 组件结构
- `index.tsx` - 组件主要实现

## 使用示例
```tsx
import { Logo } from '@fairys-admin/ui';

const App = () => {
  return (
    <Logo mode="open" />
  );
};

// 关闭状态的 logo
const App2 = () => {
  return (
    <Logo mode="close" />
  );
};

// 仅显示项目名称
const App3 = () => {
  return (
    <Logo mode="open" isOnlyName={true} />
  );
};
```

## 特性
- 支持打开/关闭模式（mode）
- 支持自定义 logo 大小（logoSize）
- 支持仅显示项目名称（isOnlyName）
- 支持头部导航栏模式（isHeader）
- 支持点击 logo 跳转首页
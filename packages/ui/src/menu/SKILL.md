# Menu 组件

## 功能说明
Menu 组件用于创建导航菜单，从 context 中获取菜单数据。

## 组件结构
- `index.tsx` - 组件主要实现

## 使用示例
```tsx
import { Menu } from '@fairys-admin/ui';

const App = () => {
  return (
    <Menu />
  );
};

// 自定义点击回调
const App2 = () => {
  const handleClickItem = (item) => {
    console.log('点击菜单项:', item);
  };

  return (
    <Menu onClickItem={handleClickItem} />
  );
};
```

## 特性
- 支持多级菜单
- 支持水平和垂直布局
- 支持菜单展开/折叠
- 支持当前项高亮
- 支持点击菜单跳转
- 支持打开新窗口
- 支持自定义点击回调
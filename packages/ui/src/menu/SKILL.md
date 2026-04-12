# Menu 组件

## 功能说明
Menu 组件用于创建导航菜单，从 context 中获取菜单数据，适用于管理系统、网站导航等场景。

## 组件结构
- `index.tsx` - 组件主要实现

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `onClickItem` | `(item: MenuItem) => void` | - | 点击菜单项回调 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

## 使用示例

### 基本用法
```tsx
import { Menu } from '@fairys-admin/ui';

const App = () => {
  return (
    <Menu />
  );
};
```

### 自定义点击回调
```tsx
import { Menu } from '@fairys-admin/ui';

const App = () => {
  const handleClickItem = (item) => {
    console.log('点击菜单项:', item);
  };

  return (
    <Menu onClickItem={handleClickItem} />
  );
};
```

### 自定义样式
```tsx
import { Menu } from '@fairys-admin/ui';

const App = () => {
  return (
    <Menu 
      className="custom-menu"
      style={{ height: '100%' }}
    />
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
- 支持自定义样式
# MenuItemBase 组件

## 功能说明
MenuItemBase 组件是菜单项的基础组件，提供菜单项的通用功能和样式，适用于各种菜单场景。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `icon` | `string \| React.ReactNode` | - | 菜单项图标 |
| `isActive` | `boolean` | `false` | 是否为激活状态 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `isShowClose` | `boolean` | `false` | 是否显示关闭按钮 |
| `onCloseItem` | `(e: React.MouseEvent) => void` | - | 关闭按钮点击回调 |
| `extra` | `React.ReactNode` | - | 额外内容 |
| `isTextEllipsis` | `boolean` | `false` | 是否文本省略 |
| `bordered` | `boolean` | `false` | 是否显示边框 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |
| `children` | `React.ReactNode` | - | 菜单项内容 |
| `onClick` | `(e: React.MouseEvent) => void` | - | 点击回调 |

## 使用示例

### 基本用法
```tsx
import { FairysMenuItemBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysMenuItemBase 
      icon="home"
      isActive={true}
    >
      菜单项
    </FairysMenuItemBase>
  );
};
```

### 带关闭按钮
```tsx
import { FairysMenuItemBase } from '@fairys-admin/ui';

const App = () => {
  const handleClose = (e) => {
    console.log('关闭项', e);
  };

  return (
    <FairysMenuItemBase 
      icon="home"
      isShowClose={true}
      onCloseItem={handleClose}
    >
      可关闭菜单项
    </FairysMenuItemBase>
  );
};
```

### 带额外内容
```tsx
import { FairysMenuItemBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysMenuItemBase 
      icon="home"
      extra={<span style={{ color: '#1677ff' }}>新</span>}
    >
      带额外内容的菜单项
    </FairysMenuItemBase>
  );
};
```

### 禁用状态
```tsx
import { FairysMenuItemBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysMenuItemBase 
      icon="home"
      disabled={true}
    >
      禁用的菜单项
    </FairysMenuItemBase>
  );
};
```

### 自定义样式
```tsx
import { FairysMenuItemBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysMenuItemBase 
      icon="home"
      className="custom-menu-item"
      style={{ backgroundColor: '#f5f5f5', padding: '12px' }}
    >
      自定义样式的菜单项
    </FairysMenuItemBase>
  );
};
```

## 特性
- 支持图标显示（icon）
- 支持激活状态（isActive）
- 支持禁用状态（disabled）
- 支持显示关闭按钮（isShowClose）
- 支持自定义额外内容（extra）
- 支持文本省略（isTextEllipsis）
- 支持边框显示（bordered）
- 支持自定义样式（className）
- 支持点击回调（onClick）

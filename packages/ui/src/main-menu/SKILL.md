# MainMenu 组件

## 功能说明
MainMenu 组件用于创建应用的主菜单，分为左侧主菜单和顶部主菜单，适用于管理系统的导航结构。

## 组件结构
- `index.tsx` - 组件主要实现

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `layoutMode` | `'vertical' \| 'horizontal'` | `'vertical'` | 菜单布局模式 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

## 使用示例

### 垂直布局（左侧主菜单）
```tsx
import { MainMenu } from '@fairys-admin/ui';

const App = () => {
  return (
    <MainMenu layoutMode="vertical" />
  );
};
```

### 水平布局（顶部主菜单）
```tsx
import { MainMenu } from '@fairys-admin/ui';

const App = () => {
  return (
    <MainMenu layoutMode="horizontal" />
  );
};
```

### 自定义样式
```tsx
import { MainMenu } from '@fairys-admin/ui';

const App = () => {
  return (
    <MainMenu 
      layoutMode="vertical"
      className="custom-main-menu"
      style={{ backgroundColor: '#f0f2f5' }}
    />
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
- 支持自定义样式
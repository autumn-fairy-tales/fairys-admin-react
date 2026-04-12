# Logo 组件

## 功能说明
Logo 组件用于显示应用的 logo，支持多种显示模式和自定义选项。

## 组件结构
- `index.tsx` - 组件主要实现

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `mode` | `'open' \| 'close'` | `'open'` | logo 显示模式 |
| `logoSize` | `number` | `32` | logo 大小 |
| `isOnlyName` | `boolean` | `false` | 是否仅显示项目名称 |
| `isHeader` | `boolean` | `false` | 是否为头部导航栏模式 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

## 使用示例

### 基本用法
```tsx
import { Logo } from '@fairys-admin/ui';

const App = () => {
  return (
    <Logo mode="open" />
  );
};
```

### 关闭状态的 logo
```tsx
import { Logo } from '@fairys-admin/ui';

const App = () => {
  return (
    <Logo mode="close" />
  );
};
```

### 仅显示项目名称
```tsx
import { Logo } from '@fairys-admin/ui';

const App = () => {
  return (
    <Logo mode="open" isOnlyName={true} />
  );
};
```

### 头部导航栏模式
```tsx
import { Logo } from '@fairys-admin/ui';

const App = () => {
  return (
    <Logo mode="open" isHeader={true} />
  );
};
```

### 自定义大小
```tsx
import { Logo } from '@fairys-admin/ui';

const App = () => {
  return (
    <Logo mode="open" logoSize={40} />
  );
};
```

### 自定义样式
```tsx
import { Logo } from '@fairys-admin/ui';

const App = () => {
  return (
    <Logo 
      mode="open"
      className="custom-logo"
      style={{ marginRight: '16px' }}
    />
  );
};
```

## 特性
- 支持打开/关闭模式（mode）
- 支持自定义 logo 大小（logoSize）
- 支持仅显示项目名称（isOnlyName）
- 支持头部导航栏模式（isHeader）
- 支持点击 logo 跳转首页
- 支持自定义样式
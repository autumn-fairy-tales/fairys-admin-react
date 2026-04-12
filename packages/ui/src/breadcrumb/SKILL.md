# Breadcrumb 组件

## 功能说明
Breadcrumb 组件用于显示当前页面的导航路径，从 context 中获取面包屑数据，适用于多级导航场景。

## 组件结构
- `index.tsx` - 组件主要实现

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |
| `separate` | `string` | `'bg'` | 分隔符类型 |

## 使用示例

### 基本用法
```tsx
import { Breadcrumb } from '@fairys-admin/ui';

const App = () => {
  return (
    <Breadcrumb />
  );
};
```

### 自定义分隔符
```tsx
import { Breadcrumb } from '@fairys-admin/ui';

const App = () => {
  return (
    <Breadcrumb separate="arrow" />
  );
};
```

### 自定义样式
```tsx
import { Breadcrumb } from '@fairys-admin/ui';

const App = () => {
  return (
    <Breadcrumb 
      className="custom-breadcrumb"
      style={{ marginBottom: '16px' }}
    />
  );
};
```

## 特性
- 自动从路由和菜单数据生成面包屑
- 支持响应式布局
- 支持自定义分隔符
- 支持自定义样式
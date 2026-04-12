# ErrorPage 组件

## 功能说明
ErrorPage 组件用于显示各种错误状态页面，如 403、404、500 等，提供友好的错误提示和操作选项。

## 组件结构
- `403.tsx` - 403 错误页面（权限不足）
- `404.tsx` - 404 错误页面（页面不存在）
- `500.tsx` - 500 错误页面（服务器错误）

## API

### 通用属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `onBackHome` | `() => void` | - | 返回首页的回调函数 |
| `btnText` | `string` | `'返回首页'` | 按钮文本 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

## 使用示例

### 使用 404 错误页面
```tsx
import { ErrorPage404 } from '@fairys-admin/ui';

const App = () => {
  const handleBackHome = () => {
    // 自定义返回首页逻辑
    window.location.href = '/';
  };

  return (
    <ErrorPage404 
      onBackHome={handleBackHome}
      btnText="返回首页"
    />
  );
};
```

### 使用 403 错误页面
```tsx
import { ErrorPage403 } from '@fairys-admin/ui';

const App = () => {
  return <ErrorPage403 />;
};
```

### 使用 500 错误页面
```tsx
import { ErrorPage500 } from '@fairys-admin/ui';

const App = () => {
  return <ErrorPage500 />;
};
```

### 自定义样式
```tsx
import { ErrorPage404 } from '@fairys-admin/ui';

const App = () => {
  return (
    <ErrorPage404 
      className="custom-error-page"
      style={{ backgroundColor: '#f8f9fa' }}
    />
  );
};
```

## 特性
- 支持多种错误类型（403、404、500）
- 支持自定义返回首页回调（onBackHome）
- 支持自定义按钮文本（btnText）
- 响应式布局设计
- 支持自定义样式（className）
- 提供清晰的错误提示和操作选项

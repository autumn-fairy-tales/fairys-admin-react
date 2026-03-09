# ErrorPage 组件

## 功能说明
ErrorPage 组件用于显示各种错误状态页面，如 403、404、500 等。

## 组件结构
- `403.tsx` - 403 错误页面
- `404.tsx` - 404 错误页面
- `500.tsx` - 500 错误页面

## 使用示例
```tsx
import { ErrorPage404, ErrorPage403, ErrorPage500 } from '@fairys-admin/ui';

// 使用 404 错误页面
const App1 = () => {
  const handleBackHome = () => {
    // 自定义返回首页逻辑
    console.log('返回首页');
  };

  return (
    <ErrorPage404 
      onBackHome={handleBackHome}
      btnText="返回首页"
    />
  );
};

// 使用 403 错误页面
const App2 = () => {
  return <ErrorPage403 />;
};

// 使用 500 错误页面
const App3 = () => {
  return <ErrorPage500 />;
};
```

## 特性
- 支持多种错误类型（403、404、500）
- 支持自定义返回首页回调（onBackHome）
- 支持自定义按钮文本（btnText）
- 响应式布局设计

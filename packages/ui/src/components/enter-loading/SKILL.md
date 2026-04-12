# EnterLoading 组件

## 功能说明
EnterLoading 组件用于页面或组件加载时显示加载动画，提升用户体验，适用于页面切换、数据加载等场景。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## API

### FairysEnterLoading 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `loading` | `boolean` | `false` | 控制是否显示加载动画 |
| `title` | `string` | `'加载中'` | 加载标题 |
| `tips` | `string` | - | 加载提示信息 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

### FairysLoading 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `loading` | `boolean` | `false` | 控制是否显示加载动画 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |
| `children` | `React.ReactNode` | - | 被包裹的内容 |

## 使用示例

### 使用 FairysEnterLoading
```tsx
import { FairysEnterLoading } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysEnterLoading loading={true} title="加载中" tips="正在处理数据" />
  );
};
```

### 使用 FairysLoading 包装组件
```tsx
import { FairysLoading } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysLoading loading={true}>
      <div>页面内容</div>
    </FairysLoading>
  );
};
```

### 条件加载
```tsx
import { useState, useEffect } from 'react';
import { FairysEnterLoading } from '@fairys-admin/ui';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <FairysEnterLoading loading={true} title="加载中" tips="正在加载数据，请稍候" />;
  }

  return (
    <div>
      <h1>页面内容</h1>
      <p>数据加载完成</p>
    </div>
  );
};
```

### 自定义样式
```tsx
import { FairysEnterLoading } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysEnterLoading 
      loading={true} 
      title="加载中" 
      tips="正在处理数据"
      className="custom-loading"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
    />
  );
};
```

## 特性
- 支持自定义加载标题（title）
- 支持自定义加载提示（tips）
- 支持加载状态控制（loading）
- 支持过渡效果
- 支持自定义样式（className）
- 提供两种使用方式：独立使用和包装组件

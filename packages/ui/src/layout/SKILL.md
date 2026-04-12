# Layout 组件

## 功能说明
Layout 组件用于创建应用的整体布局结构，包括头部、侧边栏、内容区域等，根据设置自动渲染布局结构，适用于管理系统、后台应用等场景。

## 组件结构
- `index.tsx` - 布局主组件
- `content/` - 内容区域组件
- `header/` - 头部组件
- `sider/` - 侧边栏组件
- `tab-bar/` - 标签栏组件
- `tool-bar/` - 工具栏组件

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |
| `children` | `React.ReactNode` | - | 内容区域子组件 |

## 使用示例

### 基本用法
```tsx
import { Layout } from '@fairys-admin/ui';

const App = () => {
  return (
    <Layout />
  );
};
```

### 带自定义内容
```tsx
import { Layout } from '@fairys-admin/ui';

const App = () => {
  return (
    <Layout>
      {/* 这里可以放置路由组件或其他内容 */}
      <div>应用内容</div>
    </Layout>
  );
};
```

### 自定义样式
```tsx
import { Layout } from '@fairys-admin/ui';

const App = () => {
  return (
    <Layout 
      className="custom-layout"
      style={{ minHeight: '100vh' }}
    >
      <div>应用内容</div>
    </Layout>
  );
};
```

## 特性
- 支持多种布局模式（main_sub_left, main_left, main_top_header, main_top_sub_left_header, left, left_header）
- 支持响应式布局
- 自动根据设置渲染头部、侧边栏和内容区域
- 支持深色模式
- 支持自定义样式
- 集成了标签栏和工具栏
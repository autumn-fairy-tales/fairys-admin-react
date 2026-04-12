# Breadcrumb 组件

## 功能说明
Breadcrumb 组件用于显示当前页面的导航路径，帮助用户了解当前位置并方便返回上一级页面，适用于多级导航场景。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## API

### 面包屑项类型

```typescript
interface BreadcrumbItem {
  title: string;           // 面包屑项标题
  path: string;            // 面包屑项路径
  className?: string;      // 自定义类名
  style?: React.CSSProperties; // 自定义样式
}
```

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `BreadcrumbItem[]` | `[]` | 面包屑数据 |
| `separate` | `string` | `'bg'` | 分隔符类型 |
| `isFristNoPadding` | `boolean` | `false` | 第一个面包屑项是否无内边距 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

## 使用示例

### 基本用法
```tsx
import { FairysBreadcrumbBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysBreadcrumbBase items={[
      { title: '首页', path: '/' },
      { title: '设置', path: '/settings' },
      { title: '用户设置', path: '/settings/user' }
    ]} separate="bg" />
  );
};
```

### 自定义分隔符
```tsx
import { FairysBreadcrumbBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysBreadcrumbBase items={[
      { title: '首页', path: '/' },
      { title: '产品', path: '/products' },
      { title: '详情', path: '/products/1' }
    ]} separate="arrow" />
  );
};
```

### 第一个面包屑项无内边距
```tsx
import { FairysBreadcrumbBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysBreadcrumbBase 
      items={[
        { title: '首页', path: '/' },
        { title: '文章', path: '/articles' },
        { title: '编辑', path: '/articles/edit/1' }
      ]} 
      separate="bg"
      isFristNoPadding
    />
  );
};
```

### 自定义样式
```tsx
import { FairysBreadcrumbBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysBreadcrumbBase 
      items={[
        { 
          title: '首页', 
          path: '/',
          className: 'text-blue-600 hover:text-blue-800'
        },
        { 
          title: '分类', 
          path: '/categories',
          className: 'text-blue-600 hover:text-blue-800'
        },
        { 
          title: '子分类', 
          path: '/categories/1',
          className: 'text-gray-600'
        }
      ]} 
      separate="bg"
      className="custom-breadcrumb"
      style={{ padding: '10px 0' }}
    />
  );
};
```

## 特性
- 支持自定义分隔符（separate）
- 支持面包屑项类名和样式自定义
- 支持第一个面包屑项无内边距（isFristNoPadding）
- 支持整体面包屑组件的样式自定义

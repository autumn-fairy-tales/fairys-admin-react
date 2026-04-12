# Disclosure 组件

## 功能说明
Disclosure 组件用于创建可展开/折叠的内容区域，通常用于显示/隐藏详细信息，适用于 FAQ、详情展示等场景。

## 组件结构
- `index.tsx` - 组件主要实现

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | 控制是否展开 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |
| `children` | `React.ReactNode` | - | 展开的内容 |
| `initial` | `boolean` | `false` | 初始是否展开 |
| `animate` | `object` | - | framer-motion 动画属性 |
| `transition` | `object` | - | framer-motion 过渡属性 |

## 使用示例

### 基本用法
```tsx
import { useState } from 'react';
import { FairysDisclosureItem } from '@fairys-admin/ui';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>点击展开</button>
      <FairysDisclosureItem open={open}>
        这是展开的内容
      </FairysDisclosureItem>
    </div>
  );
};
```

### 初始展开
```tsx
import { useState } from 'react';
import { FairysDisclosureItem } from '@fairys-admin/ui';

const App = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>点击收起</button>
      <FairysDisclosureItem open={open}>
        这是初始展开的内容
      </FairysDisclosureItem>
    </div>
  );
};
```

### 自定义样式
```tsx
import { useState } from 'react';
import { FairysDisclosureItem } from '@fairys-admin/ui';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button 
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        点击展开
      </button>
      <FairysDisclosureItem 
        open={open}
        className="mt-2 p-4 border border-gray-200 rounded-md bg-gray-50"
      >
        这是展开的内容，带有自定义样式
      </FairysDisclosureItem>
    </div>
  );
};
```

### 自定义动画
```tsx
import { useState } from 'react';
import { FairysDisclosureItem } from '@fairys-admin/ui';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>点击展开</button>
      <FairysDisclosureItem 
        open={open}
        animate={{
          height: open ? 'auto' : 0,
          opacity: open ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
      >
        这是带有自定义动画的展开内容
      </FairysDisclosureItem>
    </div>
  );
};
```

## 特性
- 支持展开/折叠动画
- 支持受控模式（open 属性）
- 支持非受控模式（initial 属性）
- 支持自定义样式（className）
- 支持 framer-motion 动画属性
- 支持自定义过渡效果

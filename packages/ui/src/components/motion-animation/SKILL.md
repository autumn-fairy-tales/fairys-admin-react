# MotionAnimation 组件

## 功能说明
MotionAnimation 组件用于添加动画效果，提升用户界面的交互体验，根据系统设置的页面过渡模式自动应用相应的动画，适用于页面切换、元素显示/隐藏等场景。

## 组件结构
- `index.tsx` - 组件主要实现

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `animateKey` | `string` | - | 动画唯一标识 |
| `className` | `string` | - | 自定义类名 |
| `mode` | `'wait' \| 'immediately'` | `'immediately'` | 动画模式 |
| `style` | `React.CSSProperties` | - | 自定义样式 |
| `children` | `React.ReactNode` | - | 动画元素 |
| `isMotion` | `boolean` | `true` | 是否启用动画 |

## 使用示例

### 基本用法
```tsx
import { FairysMotionAnimation } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysMotionAnimation animateKey="unique-key">
      <div>动画元素</div>
    </FairysMotionAnimation>
  );
};
```

### 自定义类名和模式
```tsx
import { FairysMotionAnimation } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysMotionAnimation 
      className="custom-animation"
      mode="wait"
    >
      <div>自定义动画元素</div>
    </FairysMotionAnimation>
  );
};
```

### 条件动画
```tsx
import { useState } from 'react';
import { FairysMotionAnimation } from '@fairys-admin/ui';

const App = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(!show)}>切换显示</button>
      {show && (
        <FairysMotionAnimation animateKey="conditional-element">
          <div>条件显示的动画元素</div>
        </FairysMotionAnimation>
      )}
    </div>
  );
};
```

### 禁用动画
```tsx
import { FairysMotionAnimation } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysMotionAnimation animateKey="no-animation" isMotion={false}>
      <div>无动画元素</div>
    </FairysMotionAnimation>
  );
};
```

### 自定义样式
```tsx
import { FairysMotionAnimation } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysMotionAnimation 
      animateKey="styled-element"
      style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px' }}
    >
      <div>自定义样式的动画元素</div>
    </FairysMotionAnimation>
  );
};
```

## 特性
- 支持根据系统设置的页面过渡模式自动应用动画
- 支持自定义类名（className）
- 支持自定义动画键（animateKey）
- 支持设置动画模式（mode）
- 支持进入/退出动画
- 支持条件动画
- 支持禁用动画
- 支持自定义样式

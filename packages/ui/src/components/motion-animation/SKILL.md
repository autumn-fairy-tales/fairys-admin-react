# MotionAnimation 组件

## 功能说明
MotionAnimation 组件用于添加动画效果，提升用户界面的交互体验，根据系统设置的页面过渡模式自动应用相应的动画。

## 组件结构
- `index.tsx` - 组件主要实现

## 使用示例
```tsx
import { FairysMotionAnimation } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysMotionAnimation animateKey="unique-key">
      <div>动画元素</div>
    </FairysMotionAnimation>
  );
};

// 自定义类名
const App2 = () => {
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

## 特性
- 支持根据系统设置的页面过渡模式自动应用动画
- 支持自定义类名（className）
- 支持自定义动画键（animateKey）
- 支持设置动画模式（mode）
- 支持进入/退出动画

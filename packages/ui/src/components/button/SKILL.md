# Button 组件

## 功能说明
Button 组件是一个通用的按钮组件，用于触发用户交互操作。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## 使用示例
```tsx
import { FairysButtonBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <div>
      <FairysButtonBase isBg>主要按钮</FairysButtonBase>
      <FairysButtonBase bordered>次要按钮</FairysButtonBase>
      <FairysButtonBase>轮廓按钮</FairysButtonBase>
      <FairysButtonBase disabled>禁用按钮</FairysButtonBase>
    </div>
  );
};
```

## 特性
- 支持背景按钮（isBg）
- 支持边框按钮（bordered）
- 支持禁用状态
- 支持自定义尺寸（sizeClassName）

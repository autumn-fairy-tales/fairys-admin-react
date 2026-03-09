# Icon 组件

## 功能说明
Icon 组件用于显示各种图标，支持自定义图标和图标库。

## 组件结构
- `index.tsx` - 组件主要实现
- `instance.ts` - 图标实例管理

## 使用示例
```tsx
import { FairysIcon } from '@fairys-admin/ui';

const App = () => {
  return (
    <div>
      <FairysIcon icon="home" />
      <FairysIcon 
        icon="settings" 
        iconProps={{ 
          size: 32, 
          color: '#1677ff' 
        }} 
      />
      <FairysIcon 
        icon="mdi-light--fullscreen" 
        iconProps={{ isClassName: true }} 
      />
    </div>
  );
};
```

## 特性
- 支持多种图标库
- 支持自定义图标
- 支持使用 className 方式显示图标（isClassName）
- 支持自定义样式和类名
- 支持图标属性传递（iconProps）

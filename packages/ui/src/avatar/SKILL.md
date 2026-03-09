# Avatar 组件

## 功能说明
Avatar 组件用于显示用户头像，支持多种尺寸和样式。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## 使用示例
```tsx
import { Avatar } from '@fairys-admin/ui';

const App = () => {
  return (
    <div>
      <Avatar src="https://example.com/avatar.jpg" size={40} />
      <Avatar size={60}>U</Avatar>
    </div>
  );
};
```

## 特性
- 支持图片头像
- 支持文字头像
- 支持多种尺寸
- 支持圆形和方形样式

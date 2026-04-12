# Avatar 组件

## 功能说明
Avatar 组件用于显示用户头像，支持多种尺寸和样式，适用于用户信息展示、评论系统等场景。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `src` | `string` | - | 头像图片 URL |
| `size` | `number` | `40` | 头像尺寸（像素） |
| `children` | `React.ReactNode` | - | 文字头像内容 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

## 使用示例
```tsx
import { Avatar } from '@fairys-admin/ui';

const App = () => {
  return (
    <div>
      {/* 图片头像 */}
      <Avatar src="https://example.com/avatar.jpg" size={40} />
      
      {/* 文字头像 */}
      <Avatar size={60}>U</Avatar>
      
      {/* 自定义样式 */}
      <Avatar size={80} style={{ backgroundColor: '#1890ff' }}>A</Avatar>
    </div>
  );
};
```

## 特性
- 支持图片头像和文字头像
- 支持自定义尺寸
- 支持圆形和方形样式
- 支持自定义类名和样式

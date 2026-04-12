# Button 组件

## 功能说明
Button 组件是一个通用的按钮组件，用于触发用户交互操作，支持多种样式和状态。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `isBg` | `boolean` | `false` | 是否显示背景色 |
| `bordered` | `boolean` | `false` | 是否显示边框 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `sizeClassName` | `string` | - | 自定义尺寸类名 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |
| `children` | `React.ReactNode` | - | 按钮内容 |
| `onClick` | `() => void` | - | 点击事件回调 |

## 使用示例
```tsx
import { FairysButtonBase } from '@fairys-admin/ui';

const App = () => {
  const handleClick = () => {
    console.log('按钮被点击');
  };

  return (
    <div>
      {/* 主要按钮 */}
      <FairysButtonBase isBg onClick={handleClick}>主要按钮</FairysButtonBase>
      
      {/* 次要按钮 */}
      <FairysButtonBase bordered>次要按钮</FairysButtonBase>
      
      {/* 轮廓按钮 */}
      <FairysButtonBase>轮廓按钮</FairysButtonBase>
      
      {/* 禁用按钮 */}
      <FairysButtonBase disabled>禁用按钮</FairysButtonBase>
      
      {/* 自定义尺寸 */}
      <FairysButtonBase isBg sizeClassName="text-lg px-6 py-3">大按钮</FairysButtonBase>
    </div>
  );
};
```

## 特性
- 支持背景按钮（isBg）
- 支持边框按钮（bordered）
- 支持禁用状态
- 支持自定义尺寸（sizeClassName）
- 支持自定义类名和样式
- 支持点击事件回调

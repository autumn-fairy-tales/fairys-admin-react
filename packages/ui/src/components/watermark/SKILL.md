# Watermark 组件

## 功能说明
Watermark 组件用于在页面上添加水印，防止内容被未授权复制，适用于敏感信息展示、版权保护等场景。

## 组件结构
- `index.tsx` - 组件主要实现
- `context.tsx` - 上下文管理
- `utls.ts` - 工具函数

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `content` | `string` | - | 水印文本内容 |
| `image` | `string` | - | 水印图片 URL |
| `width` | `number` | `120` | 水印宽度 |
| `height` | `number` | `64` | 水印高度 |
| `rotate` | `number` | `-22` | 水印旋转角度 |
| `gap` | `[number, number]` | `[100, 100]` | 水印间距 |
| `offset` | `[number, number]` | `[0, 0]` | 水印偏移量 |
| `font` | `object` | `{ fontSize: 14, color: 'rgba(0, 0, 0, 0.15)', darkColor: 'rgba(255, 255, 255, 0.15)' }` | 水印字体样式 |
| `zIndex` | `number` | `1001` | 水印层级 |
| `watchDarkMode` | `boolean` | `true` | 是否监听暗模式 |
| `children` | `React.ReactNode` | - | 被水印覆盖的内容 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

## 使用示例

### 基本用法
```tsx
import { FairysWatermarkBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysWatermarkBase 
      content="公平管理系统"
      width={120}
      height={60}
      rotate={-22}
      gap={[100, 100]}
      font={{
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.15)',
        darkColor: 'rgba(255, 255, 255, 0.15)'
      }}
      zIndex={1001}
    >
      <div>页面内容</div>
    </FairysWatermarkBase>
  );
};
```

### 图片水印
```tsx
import { FairysWatermarkBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysWatermarkBase 
      image="https://example.com/logo.png"
      width={100}
      height={40}
      gap={[120, 120]}
    >
      <div>页面内容</div>
    </FairysWatermarkBase>
  );
};
```

### 自定义水印样式
```tsx
import { FairysWatermarkBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysWatermarkBase 
      content="Confidential"
      width={150}
      height={70}
      rotate={-30}
      gap={[150, 150]}
      font={{
        fontSize: 18,
        color: 'rgba(255, 0, 0, 0.2)',
        darkColor: 'rgba(255, 100, 100, 0.2)'
      }}
    >
      <div>敏感信息内容</div>
    </FairysWatermarkBase>
  );
};
```

### 调整水印位置
```tsx
import { FairysWatermarkBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysWatermarkBase 
      content="水印测试"
      width={100}
      height={50}
      gap={[80, 80]}
      offset={[20, 20]}
    >
      <div>页面内容</div>
    </FairysWatermarkBase>
  );
};
```

## 特性
- 支持自定义水印内容（content）
- 支持图片水印（image）
- 支持自定义水印样式（font）
- 支持调整水印旋转角度（rotate）
- 支持调整水印间距（gap）
- 支持调整水印偏移量（offset）
- 支持调整水印层级（zIndex）
- 支持监听暗模式（watchDarkMode）
- 支持自定义宽高（width, height）
- 支持自定义样式

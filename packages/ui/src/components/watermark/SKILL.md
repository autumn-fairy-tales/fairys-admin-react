# Watermark 组件

## 功能说明
Watermark 组件用于在页面上添加水印，防止内容被未授权复制。

## 组件结构
- `index.tsx` - 组件主要实现
- `context.tsx` - 上下文管理
- `utls.ts` - 工具函数

## 使用示例
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

// 使用图片水印
const App2 = () => {
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

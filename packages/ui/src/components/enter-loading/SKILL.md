# EnterLoading 组件

## 功能说明
EnterLoading 组件用于页面或组件加载时显示加载动画，提升用户体验。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## 使用示例
```tsx
import { FairysEnterLoading, FairysLoading } from '@fairys-admin/ui';

// 使用 FairysEnterLoading
const App1 = () => {
  return (
    <FairysEnterLoading loading={true} title="加载中" tips="正在处理数据" />
  );
};

// 使用 FairysLoading 包装组件
const App2 = () => {
  return (
    <FairysLoading loading={true}>
      <div>页面内容</div>
    </FairysLoading>
  );
};
```

## 特性
- 支持自定义加载标题（title）
- 支持自定义加载提示（tips）
- 支持加载状态控制（loading）
- 支持过渡效果
- 支持自定义样式（className）

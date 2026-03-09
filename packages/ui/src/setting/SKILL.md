# Setting 组件

## 功能说明
Setting 组件用于管理应用的设置，包括主题、布局、颜色等。

## 组件结构
- `index.tsx` - 组件主要实现
- `base/` - 基础设置组件

## 使用示例
```tsx
import { SettingDrawer } from '@fairys-admin/ui';

const App = () => {
  return (
    <SettingDrawer />
  );
};
```

## 特性
- 支持主题设置
- 支持布局模式设置
- 支持颜色设置
- 支持侧边栏主题设置
- 支持页面过渡模式设置
- 支持按 ESC 键关闭
- 支持插件扩展
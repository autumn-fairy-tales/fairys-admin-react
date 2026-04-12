# Setting 组件

## 功能说明
Setting 组件用于管理应用的设置，包括主题、布局、颜色等，提供直观的设置界面。

## 组件结构
- `index.tsx` - 组件主要实现
- `base/` - 基础设置组件

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |
| `onClose` | `() => void` | - | 关闭回调 |

## 使用示例

### 基本用法
```tsx
import { SettingDrawer } from '@fairys-admin/ui';

const App = () => {
  return (
    <SettingDrawer />
  );
};
```

### 带关闭回调
```tsx
import { SettingDrawer } from '@fairys-admin/ui';

const App = () => {
  const handleClose = () => {
    console.log('设置面板已关闭');
  };

  return (
    <SettingDrawer onClose={handleClose} />
  );
};
```

### 自定义样式
```tsx
import { SettingDrawer } from '@fairys-admin/ui';

const App = () => {
  return (
    <SettingDrawer 
      className="custom-setting"
      style={{ zIndex: 10000 }}
    />
  );
};
```

## 特性
- 支持主题设置（亮色/暗色）
- 支持布局模式设置（垂直/水平）
- 支持颜色设置（主题色）
- 支持侧边栏主题设置
- 支持页面过渡模式设置
- 支持按 ESC 键关闭
- 支持插件扩展
- 支持自定义样式
# Icon 组件

## 功能说明
Icon 组件用于显示各种图标，支持自定义图标和图标库，适用于界面中的各种图标展示场景。

## 组件结构
- `index.tsx` - 组件主要实现
- `instance.ts` - 图标实例管理

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `icon` | `string \| React.ReactNode` | - | 图标名称或自定义图标 |
| `iconProps` | `object` | - | 图标属性 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

## 使用示例

### 基本用法
```tsx
import { FairysIcon } from '@fairys-admin/ui';

const App = () => {
  return (
    <div>
      <FairysIcon icon="home" />
      <FairysIcon icon="settings" />
      <FairysIcon icon="user" />
    </div>
  );
};
```

### 自定义图标属性
```tsx
import { FairysIcon } from '@fairys-admin/ui';

const App = () => {
  return (
    <div>
      <FairysIcon 
        icon="home" 
        iconProps={{ 
          size: 24, 
          color: '#1677ff' 
        }} 
      />
      <FairysIcon 
        icon="settings" 
        iconProps={{ 
          size: 32, 
          color: '#ff4d4f' 
        }} 
      />
    </div>
  );
};
```

### 使用 className 方式显示图标
```tsx
import { FairysIcon } from '@fairys-admin/ui';

const App = () => {
  return (
    <div>
      <FairysIcon 
        icon="mdi-light--fullscreen" 
        iconProps={{ isClassName: true }} 
      />
      <FairysIcon 
        icon="fa-solid fa-home" 
        iconProps={{ isClassName: true }} 
      />
    </div>
  );
};
```

### 自定义样式
```tsx
import { FairysIcon } from '@fairys-admin/ui';

const App = () => {
  return (
    <div>
      <FairysIcon 
        icon="home" 
        className="custom-icon"
        style={{ marginRight: '8px' }}
      />
      <FairysIcon 
        icon="settings" 
        className="custom-icon"
        style={{ marginRight: '8px' }}
      />
    </div>
  );
};
```

### 使用自定义图标
```tsx
import { FairysIcon } from '@fairys-admin/ui';

const CustomIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const App = () => {
  return (
    <div>
      <FairysIcon icon={<CustomIcon />} />
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

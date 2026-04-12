# Switch 组件

## 功能说明
Switch 组件是一个开关组件，用于在两种状态之间切换，适用于启用/禁用、显示/隐藏等场景。

## 组件结构
- `index.tsx` - 组件主要实现

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `boolean` | `false` | 开关状态 |
| `onChange` | `(value: boolean) => void` | - | 状态改变回调 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

## 使用示例

### 基本用法
```tsx
import { useState } from 'react';
import { FairysSwitchBase } from '@fairys-admin/ui';

const App = () => {
  const [value, setValue] = useState(false);

  return (
    <FairysSwitchBase
      value={value}
      onChange={setValue}
      disabled={false}
    />
  );
};
```

### 禁用状态
```tsx
import { useState } from 'react';
import { FairysSwitchBase } from '@fairys-admin/ui';

const App = () => {
  const [value, setValue] = useState(false);

  return (
    <FairysSwitchBase
      value={value}
      onChange={setValue}
      disabled={true}
    />
  );
};
```

### 带回调函数
```tsx
import { useState } from 'react';
import { FairysSwitchBase } from '@fairys-admin/ui';

const App = () => {
  const [value, setValue] = useState(false);

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log('开关状态改变为:', newValue);
    // 可以在这里执行其他逻辑
  };

  return (
    <FairysSwitchBase
      value={value}
      onChange={handleChange}
    />
  );
};
```

### 自定义样式
```tsx
import { useState } from 'react';
import { FairysSwitchBase } from '@fairys-admin/ui';

const App = () => {
  const [value, setValue] = useState(false);

  return (
    <FairysSwitchBase
      value={value}
      onChange={setValue}
      className="custom-switch"
      style={{ marginRight: '10px' }}
    />
  );
};
```

## 特性
- 支持两种状态切换
- 支持禁用状态（disabled）
- 支持值改变回调（onChange）
- 支持切换动画
- 支持自定义样式

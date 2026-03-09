# Switch 组件

## 功能说明
Switch 组件是一个开关组件，用于在两种状态之间切换。

## 组件结构
- `index.tsx` - 组件主要实现

## 使用示例
```tsx
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

## 特性
- 支持两种状态切换
- 支持禁用状态（disabled）
- 支持值改变回调（onChange）
- 支持切换动画

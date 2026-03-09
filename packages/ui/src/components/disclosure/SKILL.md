# Disclosure 组件

## 功能说明
Disclosure 组件用于创建可展开/折叠的内容区域，通常用于显示/隐藏详细信息。

## 组件结构
- `index.tsx` - 组件主要实现

## 使用示例
```tsx
import { FairysDisclosureItem } from '@fairys-admin/ui';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>点击展开</button>
      <FairysDisclosureItem open={open}>
        这是展开的内容
      </FairysDisclosureItem>
    </div>
  );
};
```

## 特性
- 支持展开/折叠动画
- 支持受控模式（open 属性）
- 支持自定义样式（className）
- 支持 framer-motion 动画属性

# FullScreen 组件

## 功能说明
FullScreen 组件用于实现元素的全屏显示功能。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## 使用示例
```tsx
import { FairysFullScreen } from '@fairys-admin/ui';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>进入全屏</button>
      <FairysFullScreen 
        open={open} 
        onClose={() => setOpen(false)}
      >
        <div>全屏内容</div>
      </FairysFullScreen>
    </div>
  );
};
```

## 特性
- 支持全屏状态控制（open 属性）
- 支持退出全屏回调（onClose）
- 支持按 ESC 键退出全屏
- 支持自定义样式（className）

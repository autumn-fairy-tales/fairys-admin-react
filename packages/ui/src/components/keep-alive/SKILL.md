# KeepAlive 组件

## 功能说明
KeepAlive 组件是一个高阶组件 (HOC)，用于保持组件的状态，避免组件在切换时重新渲染，提升性能。

## 组件结构
- `index.tsx` - 组件主要实现

## 使用示例
```tsx
import { KeepAliveBaseHOC } from '@fairys-admin/ui';

// 定义需要保持状态的组件
const MyComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
};

// 使用 KeepAliveBaseHOC 包装组件
const MyKeepAliveComponent = KeepAliveBaseHOC(MyComponent, 'my-component');

// 在应用中使用包装后的组件
const App = () => {
  return <MyKeepAliveComponent />;
};
```

## 特性
- 支持组件状态保持
- 支持缓存管理
- 集成了动画效果
- 支持自定义缓存键（id）

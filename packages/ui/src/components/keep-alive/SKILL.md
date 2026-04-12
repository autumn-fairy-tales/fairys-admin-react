# KeepAlive 组件

## 功能说明
KeepAlive 组件是一个高阶组件 (HOC)，用于保持组件的状态，避免组件在切换时重新渲染，提升性能，适用于需要保持状态的组件场景。

## 组件结构
- `index.tsx` - 组件主要实现

## API

### KeepAliveBaseHOC 函数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `Component` | `React.ComponentType` | 需要保持状态的组件 |
| `id` | `string` | 缓存键，用于标识组件缓存 |
| `options` | `object` | 可选配置项 |

### options 配置项

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `isMotion` | `boolean` | `true` | 是否启用动画效果 |
| `motionProps` | `object` | - | 动画配置属性 |

## 使用示例

### 基本用法
```tsx
import { KeepAliveBaseHOC } from '@fairys-admin/ui';
import { useState } from 'react';

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

### 带动画效果
```tsx
import { KeepAliveBaseHOC } from '@fairys-admin/ui';
import { useState } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
};

// 使用 KeepAliveBaseHOC 包装组件，启用动画
const MyKeepAliveComponent = KeepAliveBaseHOC(MyComponent, 'my-component', {
  isMotion: true,
  motionProps: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  }
});

const App = () => {
  return <MyKeepAliveComponent />;
};
```

### 在路由中使用
```tsx
import { KeepAliveBaseHOC } from '@fairys-admin/ui';
import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// 定义需要保持状态的组件
const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>首页</h1>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <Link to="/about">去关于页面</Link>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h1>关于页面</h1>
      <Link to="/">返回首页</Link>
    </div>
  );
};

// 使用 KeepAliveBaseHOC 包装组件
const KeepAliveHome = KeepAliveBaseHOC(Home, 'home');

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<KeepAliveHome />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};
```

## 特性
- 支持组件状态保持
- 支持缓存管理
- 集成了动画效果
- 支持自定义缓存键（id）
- 支持自定义动画配置
- 适用于路由切换、标签页切换等场景

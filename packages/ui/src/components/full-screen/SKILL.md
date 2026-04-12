# FullScreen 组件

## 功能说明
FullScreen 组件用于实现元素的全屏显示功能，适用于图片查看、视频播放、数据可视化等场景。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | 控制是否进入全屏 |
| `onClose` | `() => void` | - | 退出全屏的回调函数 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |
| `children` | `React.ReactNode` | - | 全屏显示的内容 |

## 使用示例

### 基本用法
```tsx
import { useState } from 'react';
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

### 图片查看器
```tsx
import { useState } from 'react';
import { FairysFullScreen } from '@fairys-admin/ui';

const App = () => {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('https://example.com/image.jpg');

  return (
    <div>
      <img 
        src={currentImage} 
        alt="示例图片"
        style={{ width: '200px', cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      />
      <FairysFullScreen 
        open={open} 
        onClose={() => setOpen(false)}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <img src={currentImage} alt="全屏图片" style={{ maxWidth: '90%', maxHeight: '90%' }} />
      </FairysFullScreen>
    </div>
  );
};
```

### 视频播放器
```tsx
import { useState } from 'react';
import { FairysFullScreen } from '@fairys-admin/ui';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>全屏播放</button>
      <FairysFullScreen 
        open={open} 
        onClose={() => setOpen(false)}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <video 
          src="https://example.com/video.mp4" 
          controls 
          autoPlay
          style={{ width: '100%', height: '100%' }}
        />
      </FairysFullScreen>
    </div>
  );
};
```

### 自定义样式
```tsx
import { useState } from 'react';
import { FairysFullScreen } from '@fairys-admin/ui';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>进入全屏</button>
      <FairysFullScreen 
        open={open} 
        onClose={() => setOpen(false)}
        className="custom-fullscreen"
        style={{ backgroundColor: '#1a1a1a', color: '#fff' }}
      >
        <div style={{ padding: '20px' }}>
          <h1>全屏内容</h1>
          <p>这是一个带有自定义样式的全屏组件</p>
        </div>
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
- 支持任意内容的全屏显示

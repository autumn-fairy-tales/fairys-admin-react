# ModalBase 组件

## 功能说明
ModalBase 组件是模态框的基础组件，用于创建弹出式对话框和抽屉，支持多种配置和自定义选项。

## 组件结构
- `index.tsx` - 组件主要实现
- `utils.ts` - 工具函数
- `variables.css` - 组件样式变量

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | 控制模态框是否显示 |
| `onClose` | `() => void` | - | 关闭模态框的回调函数 |
| `title` | `string \| React.ReactNode` | - | 模态框标题 |
| `footer` | `React.ReactNode` | - | 模态框底部内容 |
| `extra` | `React.ReactNode` | - | 模态框额外内容 |
| `mode` | `'modal' \| 'drawer'` | `'modal'` | 模态框模式 |
| `drawerDirection` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | 抽屉方向 |
| `width` | `number \| string` | `520` | 模态框宽度 |
| `height` | `number \| string` | - | 模态框高度 |
| `isFullScreen` | `boolean` | `false` | 是否全屏显示 |
| `outsidePressClose` | `boolean` | `true` | 点击遮罩层是否关闭 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |
| `children` | `React.ReactNode` | - | 模态框内容 |

## 使用示例

### 基本模态框
```tsx
import { useState } from 'react';
import { FairysModalBase } from '@fairys-admin/ui';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>打开模态框</button>
      <FairysModalBase 
        open={open} 
        onClose={() => setOpen(false)}
        title="模态框标题"
        footer={
          <div>
            <button onClick={() => setOpen(false)}>取消</button>
            <button onClick={() => setOpen(false)}>确定</button>
          </div>
        }
      >
        <div>模态框内容</div>
      </FairysModalBase>
    </div>
  );
};
```

### 抽屉模式
```tsx
import { useState } from 'react';
import { FairysModalBase } from '@fairys-admin/ui';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>打开抽屉</button>
      <FairysModalBase 
        open={open} 
        onClose={() => setOpen(false)}
        title="抽屉标题"
        mode="drawer"
        drawerDirection="right"
        width={400}
      >
        <div>抽屉内容</div>
      </FairysModalBase>
    </div>
  );
};
```

### 全屏模态框
```tsx
import { useState } from 'react';
import { FairysModalBase } from '@fairys-admin/ui';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>打开全屏模态框</button>
      <FairysModalBase 
        open={open} 
        onClose={() => setOpen(false)}
        title="全屏模态框"
        isFullScreen
      >
        <div>全屏模态框内容</div>
      </FairysModalBase>
    </div>
  );
};
```

### 自定义样式
```tsx
import { useState } from 'react';
import { FairysModalBase } from '@fairys-admin/ui';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>打开自定义样式模态框</button>
      <FairysModalBase 
        open={open} 
        onClose={() => setOpen(false)}
        title="自定义样式模态框"
        width={600}
        className="custom-modal"
        style={{ borderRadius: '8px' }}
      >
        <div>自定义样式模态框内容</div>
      </FairysModalBase>
    </div>
  );
};
```

## 特性
- 支持模态框和抽屉模式
- 支持自定义内容
- 支持打开/关闭动画
- 支持点击遮罩层关闭
- 支持自定义标题和底部内容
- 支持自定义额外内容
- 支持抽屉方向（左、右、上、下）
- 支持全屏模式
- 支持自定义宽度和高度
- 支持自定义样式和类名

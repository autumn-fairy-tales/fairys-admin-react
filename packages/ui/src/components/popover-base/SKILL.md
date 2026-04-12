# PopoverBase 组件

## 功能说明
PopoverBase 组件是弹出框的基础组件，用于创建弹出式内容，适用于提示、菜单、信息展示等场景。

## 组件结构
- `index.tsx` - 组件主要实现
- `utils.tsx` - 工具函数
- `variables.css` - 组件样式变量

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `content` | `React.ReactNode` | - | 弹出内容 |
| `eventName` | `'click' \| 'mousedown' \| 'contextMenu' \| 'hover'` | `'click'` | 触发事件 |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | `'bottom-start'` | 弹出位置 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `className` | `string` | - | 自定义类名 |
| `motionClassName` | `string` | - | 动画类名 |
| `isNotMinWidth` | `boolean` | `false` | 是否设置最小宽度 |
| `isOpacity` | `boolean` | `false` | 是否设置透明度 |
| `theme` | `'light' \| 'dark'` | `'light'` | 主题设置 |
| `children` | `React.ReactNode` | - | 触发元素 |

## 使用示例

### 基本用法
```tsx
import { FairysPopoverBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysPopoverBase 
      content={
        <div className="p-2">
          弹出内容
        </div>
      }
      eventName="click"
      placement="bottom-start"
    >
      <button>点击弹出</button>
    </FairysPopoverBase>
  );
};
```

### 悬停触发
```tsx
import { FairysPopoverBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysPopoverBase 
      content={
        <div className="p-2">
          悬停弹出内容
        </div>
      }
      eventName="hover"
    >
      <button>悬停弹出</button>
    </FairysPopoverBase>
  );
};
```

### 右键菜单
```tsx
import { FairysPopoverBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysPopoverBase 
      content={
        <div className="p-2">
          <div className="cursor-pointer">复制</div>
          <div className="cursor-pointer">粘贴</div>
          <div className="cursor-pointer">删除</div>
        </div>
      }
      eventName="contextMenu"
    >
      <div>右键点击我</div>
    </FairysPopoverBase>
  );
};
```

### 自定义位置
```tsx
import { FairysPopoverBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysPopoverBase 
      content={
        <div className="p-2">
          顶部弹出内容
        </div>
      }
      eventName="click"
      placement="top"
    >
      <button>顶部弹出</button>
    </FairysPopoverBase>
  );
};
```

### 禁用状态
```tsx
import { FairysPopoverBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysPopoverBase 
      content={
        <div className="p-2">
          弹出内容
        </div>
      }
      eventName="click"
      disabled={true}
    >
      <button>禁用弹出</button>
    </FairysPopoverBase>
  );
};
```

### 自定义样式
```tsx
import { FairysPopoverBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysPopoverBase 
      content={
        <div className="p-2">
          自定义样式弹出内容
        </div>
      }
      eventName="click"
      className="custom-popover"
      motionClassName="custom-popover-animation"
    >
      <button>自定义样式</button>
    </FairysPopoverBase>
  );
};
```

## 特性
- 支持自定义触发元素
- 支持自定义弹出内容（content）
- 支持位置调整（placement）
- 支持点击外部关闭
- 支持多种触发事件（eventName）：click、mousedown、contextMenu、hover
- 支持禁用状态（disabled）
- 支持自定义样式（className、motionClassName）
- 支持设置最小宽度（isNotMinWidth）
- 支持透明度（isOpacity）
- 支持主题设置（theme）

# PopoverBase 组件

## 功能说明
PopoverBase 组件是弹出框的基础组件，用于创建弹出式内容。

## 组件结构
- `index.tsx` - 组件主要实现
- `utils.tsx` - 工具函数
- `variables.css` - 组件样式变量

## 使用示例
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

// 使用悬停触发
const App2 = () => {
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

# ModalBase 组件

## 功能说明
ModalBase 组件是模态框的基础组件，用于创建弹出式对话框和抽屉。

## 组件结构
- `index.tsx` - 组件主要实现
- `utils.ts` - 工具函数
- `variables.css` - 组件样式变量

## 使用示例
```tsx
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

// 使用抽屉模式
const App2 = () => {
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

## 特性
- 支持模态框和抽屉模式（mode）
- 支持自定义内容
- 支持打开/关闭动画
- 支持点击遮罩层关闭（outsidePressClose）
- 支持自定义标题（title）
- 支持自定义底部内容（footer）
- 支持自定义额外内容（extra）
- 支持抽屉方向（drawerDirection）
- 支持全屏模式（isFullScreen）
- 支持自定义宽度和高度
- 支持自定义样式和类名

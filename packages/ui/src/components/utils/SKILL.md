# Utils 组件

## 功能说明
Utils 组件提供了一些通用的工具函数和钩子，用于辅助其他组件的开发。

## 组件结构
- `index.ts` - 工具函数集合

## 使用示例
```tsx
import { useAnimationStatus } from '@fairys-admin/ui';

const App = () => {
  const [open, setOpen] = useState(false);
  const { show, onAnimationComplete } = useAnimationStatus(open);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>切换状态</button>
      {show && (
        <motion.div
          initial="collapsed"
          animate={open ? "open" : "collapsed"}
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 }
          }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={onAnimationComplete}
        >
          动画内容
        </motion.div>
      )}
    </div>
  );
};
```

## 特性
- 提供动画状态管理钩子（useAnimationStatus）
- 支持动画完成后的状态更新
- 支持基于动画状态的条件渲染

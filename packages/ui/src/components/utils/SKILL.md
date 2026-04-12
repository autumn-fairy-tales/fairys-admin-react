# Utils 组件

## 功能说明
Utils 组件提供了一些通用的工具函数和钩子，用于辅助其他组件的开发，提升开发效率。

## 组件结构
- `index.ts` - 工具函数集合

## API

### useAnimationStatus 钩子

**参数：**
- `visible: boolean` - 控制元素是否可见

**返回值：**
- `show: boolean` - 是否显示元素
- `onAnimationComplete: () => void` - 动画完成回调函数

## 使用示例

### useAnimationStatus 钩子使用
```tsx
import { useState } from 'react';
import { useAnimationStatus } from '@fairys-admin/ui';
import { motion } from 'framer-motion';

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

### 复杂动画场景
```tsx
import { useState } from 'react';
import { useAnimationStatus } from '@fairys-admin/ui';
import { motion } from 'framer-motion';

const App = () => {
  const [visible, setVisible] = useState(false);
  const { show, onAnimationComplete } = useAnimationStatus(visible);

  const handleToggle = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <button onClick={handleToggle}>{visible ? '隐藏' : '显示'}</button>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: visible ? 1 : 0, 
            y: visible ? 0 : -20 
          }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={onAnimationComplete}
          style={{ 
            padding: '20px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '8px',
            marginTop: '10px'
          }}
        >
          <h3>动画元素</h3>
          <p>这是一个带有动画效果的元素，使用 useAnimationStatus 钩子管理动画状态。</p>
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
- 适用于 framer-motion 等动画库

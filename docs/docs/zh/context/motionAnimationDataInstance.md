# motionAnimationDataInstance 页面动画

:::tip 提示

用于存储当前应用的页面动画配置，包括页面切换动画、弹窗动画等。

:::

:::warning 注意

请在渲染`Layout`和`FairysRoot`组件之前，调用`expands`方法扩展动画

:::

## 引入

```ts
import { motionAnimationDataInstance } from '@fairys/admin-tools-react';
```

## 配置

```ts
import type { MotionNodeAnimationOptions } from 'framer-motion';
interface MotionAnimationState {
    name: string;
    config: MotionNodeAnimationOptions & {
        style?: React.CSSProperties;
        className?: string;
    };
}

```

## 实体类

```ts
import type { MotionNodeAnimationOptions } from 'framer-motion';
/**页面动画配置*/
export declare class MotionAnimationDataInstance {
    state: MotionAnimationState[];
    /**扩展动画*/
    expands: (list: MotionAnimationState[]) => void;
    /**获取配置*/
    getAnimationConfig: (name: string) => MotionNodeAnimationOptions & {
        style?: React.CSSProperties;
        className?: string;
    };
}
```

## 示例

```ts title='扩展动画'
import { motionAnimationDataInstance } from '@fairys/admin-tools-react';

motionAnimationDataInstance.expands([
  {
    name: '3D翻转',
    config: {
      initial: { rotateY: 90, opacity: 0 },
      animate: { rotateY: 0, opacity: 1 },
      exit: { rotateY: -90, opacity: 0 },
      transition: { duration: 0.6 },
      style: { transformStyle: 'preserve-3d' },
    },
  },
  {
    name: '缩放',
    config: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.2, opacity: 0 },
      transition: { duration: 0.5 },
    },
  },
])

```
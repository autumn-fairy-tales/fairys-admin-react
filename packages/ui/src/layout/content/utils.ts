/**
 * 动画效果配置
 * 1: 无动画
 * 2: 滑动
 * 3: 缩放消退
 * 4: 闪现
 */
export const motionConfig: any = {
  1: {},
  2: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  3: {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.4, ease: [0.17, 0.67, 0.83, 0.67] },
  },
  4: {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
    transition: { duration: 0.3, ease: [0.17, 0.37, 0.83, 1] },
  },
};

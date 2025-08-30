import type { MotionNodeAnimationOptions } from 'framer-motion';

interface MotionAnimationState {
  name: string;
  config: MotionNodeAnimationOptions & {
    style?: React.CSSProperties;
    className?: string;
  };
}

/**页面动画配置*/
export class MotionAnimationInstance {
  state: MotionAnimationState[] = [
    {
      name: '无动画',
      config: {},
    },

    {
      name: '淡入淡出',
      config: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5 },
      },
    },
    {
      name: '滑动',
      config: {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50 },
        transition: { duration: 0.5, ease: 'easeOut' },
      },
    },
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
  ];

  /**扩展动画*/
  expands = (list: MotionAnimationState[]) => {
    //去重处理
    const _newState = this.state.filter((it) => {
      return !list.some((t) => t.name === it.name);
    });
    this.state = [..._newState, ...list];
  };

  /**获取配置*/
  getAnimationConfig = (name: string) => {
    const config = this.state.find((item) => item.name === name)?.config;
    return config || {};
  };
}

export const motionAnimationInstance = new MotionAnimationInstance();

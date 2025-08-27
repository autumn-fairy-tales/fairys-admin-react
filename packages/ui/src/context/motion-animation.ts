import type { MotionNodeAnimationOptions } from 'framer-motion';

interface MotionAnimationState {
  name: string;
  config: MotionNodeAnimationOptions;
}

/**页面动画配置*/
export class MotionAnimationInstance {
  state: MotionAnimationState[] = [
    {
      name: '无动画',
      config: {},
    },
    {
      name: '滑动',
      config: {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50 },
        transition: { duration: 0.3, ease: 'easeOut' },
      },
    },
    {
      name: '缩放消退',
      config: {
        initial: { opacity: 0, scale: 1.1 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        transition: { duration: 0.4, ease: [0.17, 0.67, 0.83, 0.67] },
      },
    },
    {
      name: '闪现',
      config: {
        initial: { opacity: 0, scale: 0 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0 },
        transition: { duration: 0.3, ease: [0.17, 0.37, 0.83, 1] },
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

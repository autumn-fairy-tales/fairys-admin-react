import type { Variant, Transition, MotionNodeAnimationOptions } from 'framer-motion';

export type PopoverEnumVariantType = 'select' | 'modal' | 'drawer';
export type PopoverEnumVariantValueType = 'open' | 'collapsed' | 'initial';

export const getPopoverMotionProps = (modeType: PopoverEnumVariantType): MotionNodeAnimationOptions => {
  // 根据传递的类型获取 动画类型
  // modeType 为 select 时，返回 select 类型的动画
  if (modeType === 'select') {
    return {
      // initial: false,
      // animate: 'open',
      // exit: 'collapsed',
      variants: popoverEnumVariants[modeType],
      transition: popoverEnumTransitions[modeType],
    };
  }
  return {};
};

export const popoverEnumVariants: Record<PopoverEnumVariantType, Record<PopoverEnumVariantValueType, Variant>> = {
  select: {
    open: {
      clipPath: 'inset(0% 0% 0% 0% round 10px)',
    },
    collapsed: {
      clipPath: 'inset(10% 50% 90% 50% round 10px)',
    },
    initial: {
      clipPath: 'inset(10% 50% 90% 50% round 10px)',
    },
  },
  modal: {
    open: { opacity: 0, scale: 0.75 },
    collapsed: { opacity: 1, scale: 1 },
    initial: { opacity: 0, scale: 0.75 },
  },
  drawer: {
    open: { clipPath: 'inset(0% 0% 0% 0% round var(--radius-sm))' },
    collapsed: { clipPath: 'inset(0% 0% 100% 100% round var(--radius-sm))' },
    initial: { clipPath: 'inset(0% 0% 100% 100% round var(--radius-sm))' },
  },
};

const transitionBase: Transition = {
  type: 'spring',
  bounce: 0,
  duration: 0.5,
};

export const popoverEnumTransitions: Record<PopoverEnumVariantType, Record<PopoverEnumVariantValueType, Transition>> = {
  select: {
    open: {
      type: 'spring',
      bounce: 0,
      duration: 0.5,
    },
    collapsed: {
      type: 'spring',
      bounce: 0,
      duration: 0.5,
    },
    initial: {
      type: 'spring',
      bounce: 0,
      duration: 0.5,
    },
  },
  modal: {
    open: transitionBase,
    collapsed: transitionBase,
    initial: transitionBase,
  },
  drawer: {
    open: transitionBase,
    collapsed: transitionBase,
    initial: transitionBase,
  },
};

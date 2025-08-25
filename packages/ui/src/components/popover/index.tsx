import { motion, AnimatePresence } from 'framer-motion';
import type { Variant, Transition, AnimationDefinition } from 'framer-motion';
import React, { Fragment, cloneElement, useMemo, useRef, useState } from 'react';
import { useDismiss, useInteractions, useHover, FloatingPortal, useMergeRefs } from '@floating-ui/react';
import type { ShiftOptions, FlipOptions, Placement, UseDismissProps, UseHoverProps } from '@floating-ui/react';
import type { Derivable } from '@floating-ui/react-dom';
import { DarkModeInstancePopoverContextProvider } from 'context/dark-mode';
import { getPopoverMotionProps, PopoverEnumVariantType } from './utils';
import { usePopoverBase, PopoverInstanceContext, PopoverInstance, useFocusReference } from './hooks';
export * from './hooks';

export interface PopoverProps
  extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'> {
  open?: boolean;
  content?: React.ReactNode;
  /**点击外部关闭*/
  onOpenChange?: (open: boolean) => void;
  /***弹出位置*/
  placement?: Placement;
  /***弹出动画*/
  variants?: {
    open: Variant;
    collapsed: Variant;
  };
  /***弹出动画过渡配置*/
  transition?: Transition;
  isUseDismiss?: boolean;
  useDismissProps?: UseDismissProps;
  isUseHover?: boolean;
  useHoverProps?: UseHoverProps;
  popoverInstance?: PopoverInstance;
  domRef?: React.Ref<HTMLDivElement>;
  onAnimationComplete?: (definition: AnimationDefinition) => void;
  flipOptions?: FlipOptions | Derivable<FlipOptions>;
  shiftOptions?: ShiftOptions | Derivable<ShiftOptions>;
  modeType?: PopoverEnumVariantType;
  /**点击标签位置为起始点*/
  isFocusReference?: boolean;
}

export const Popover = (props: PopoverProps) => {
  const {
    children,
    open,
    content,
    onOpenChange,
    placement = 'right-start',
    style,
    variants,
    transition,
    isUseDismiss = true,
    useDismissProps = {},
    isUseHover = false,
    useHoverProps = {},
    popoverInstance: instance,
    domRef,
    onAnimationComplete: onAnimationCompleteProp,
    flipOptions,
    shiftOptions,
    modeType,
    isFocusReference,
    ...rest
  } = props;
  const { floating, bodyClasName, show, onAnimationComplete, popoverInstance } = usePopoverBase({
    flipOptions,
    shiftOptions,
    open,
    onOpenChange,
    placement,
    className: props.className,
    popoverInstance: instance,
  });
  const motionRef = useRef<HTMLDivElement>(null);
  const { refs, context } = floating;
  const useDismissOrHover = isUseHover ? useHover : useDismiss;
  const dismissOrHover = useDismissOrHover(
    context,
    isUseHover ? { ...useHoverProps } : { outsidePress: true, bubbles: { outsidePress: true }, ...useDismissProps },
  );

  const { getReferenceProps, getFloatingProps } = useInteractions([dismissOrHover]);
  const { floatingStyles } = useFocusReference(floating, { enable: isFocusReference });

  const childRef = useMergeRefs([refs.setReference, domRef]);

  const motionProps = useMemo(() => {
    return getPopoverMotionProps(modeType);
  }, [modeType]);

  const onAnimationCompleteClick = (definition: AnimationDefinition) => {
    onAnimationComplete(definition);
    onAnimationCompleteProp?.(definition);
  };

  // const _translate = useMemo(() => {
  //   if (!refs.reference?.current) {
  //     return {}
  //   }
  //   const { x, y } = refs.reference?.current.getBoundingClientRect();
  //   return {
  //     "position": "absolute",
  //     "left": 0,
  //     "top": 0,
  //     "willChange": "transform",
  //     transform: `translate(${x}px, ${y}px)`,
  //   }
  // }, [refs.reference?.current]) as React.CSSProperties
  // const _floatingStyles = floatingStyles.transform && floatingStyles.transform !== 'translate(0px, 0px)' ? floatingStyles : _translate;
  // console.log('floatingStyles', floatingStyles)

  return (
    <Fragment>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        return cloneElement(child as React.ReactElement, { ref: childRef, ...getReferenceProps() });
      })}
      {show ? (
        <FloatingPortal>
          <PopoverInstanceContext.Provider value={popoverInstance}>
            <AnimatePresence>
              <DarkModeInstancePopoverContextProvider>
                <div
                  {...rest}
                  ref={refs.setFloating}
                  style={{ ...(style || {}), ...floatingStyles }}
                  // style={{ ...(style || {}), ..._floatingStyles, }}
                  className={bodyClasName}
                  {...getFloatingProps()}
                >
                  <motion.div
                    ref={motionRef}
                    initial="collapsed"
                    animate={open ? 'open' : 'collapsed'}
                    variants={{
                      open: { scale: 1, rotate: 0, opacity: 1, height: 'auto' },
                      collapsed: { scale: 0.5, rotate: 45, opacity: 0, height: 0 },
                      ...(variants || {}),
                    }}
                    transition={{
                      type: 'spring',
                      bounce: 0,
                      duration: 0.35,
                      ...transition,
                    }}
                    {...motionProps}
                    onAnimationComplete={onAnimationCompleteClick}
                  >
                    {content}
                  </motion.div>
                </div>
              </DarkModeInstancePopoverContextProvider>
            </AnimatePresence>
          </PopoverInstanceContext.Provider>
        </FloatingPortal>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
};

/**内置状态管理*/
export const PopoverState = (props: PopoverProps) => {
  const { children, ...rest } = props;
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} {...rest} onOpenChange={setOpen}>
      {children}
    </Popover>
  );
};

export const PopoverHover = (props: PopoverProps) => {
  return <PopoverState {...props} isUseHover />;
};

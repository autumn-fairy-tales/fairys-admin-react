import { motion, AnimatePresence } from 'framer-motion';
import type { Variant, Transition, AnimationDefinition } from 'framer-motion';
import React, { Fragment, cloneElement, useRef, useState } from 'react';
import { useDismiss, useInteractions, useHover, FloatingPortal, useMergeRefs, safePolygon } from '@floating-ui/react';
import type { ShiftOptions, FlipOptions, Placement, UseDismissProps, UseHoverProps } from '@floating-ui/react';
import type { Derivable } from '@floating-ui/react-dom';
import { DarkModeInstancePopoverContextProvider } from 'context/dark-mode';
import { transitionBase, variantsBase } from './utils';
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
    isUseHover
      ? { handleClose: safePolygon(), ...useHoverProps }
      : { outsidePress: true, bubbles: { outsidePress: true }, ...useDismissProps },
  );

  const { getReferenceProps, getFloatingProps } = useInteractions([dismissOrHover]);
  const { floatingStyles } = useFocusReference(floating, { enable: isFocusReference });

  const childRef = useMergeRefs([refs.setReference, domRef]);

  const onAnimationCompleteClick = (definition: AnimationDefinition) => {
    onAnimationComplete(definition);
    onAnimationCompleteProp?.(definition);
  };

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
                  className={bodyClasName}
                  {...getFloatingProps()}
                >
                  <motion.div
                    ref={motionRef}
                    initial="collapsed"
                    animate={open ? 'open' : 'collapsed'}
                    variants={{
                      ...variantsBase,
                      ...variants,
                    }}
                    transition={{
                      ...transitionBase,
                      ...transition,
                    }}
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

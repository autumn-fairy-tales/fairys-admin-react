import { motion, AnimatePresence } from 'framer-motion';
import type { Variant, Transition, AnimationDefinition } from 'framer-motion';
import React, { Fragment, cloneElement, createContext, useMemo, useRef, useContext, useState } from 'react';
import { useAnimationStatus } from '../utils';
import {
  useFloating,
  autoUpdate,
  useDismiss,
  useInteractions,
  useHover,
  FloatingPortal,
  size as sizeMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
  useMergeRefs,
} from '@floating-ui/react';
import type { Placement, UseDismissProps, UseHoverProps } from '@floating-ui/react';
import clsx from 'clsx';
import { DarkModeInstancePopoverContextProvider } from 'context/dark-mode';

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
}
class PopoverInstance {
  /***点击外部关闭*/
  onOpenChange?: (open: boolean) => void = () => void 0;
}

export const usePopoverInstance = (instance?: PopoverInstance) => {
  const ref = useRef<PopoverInstance>();
  if (!ref.current) {
    if (instance) {
      ref.current = instance;
    } else {
      ref.current = new PopoverInstance();
    }
  }
  return ref.current;
};

const PopoverInstanceContext = createContext(new PopoverInstance());

export const usePopoverInstanceContext = () => useContext(PopoverInstanceContext);

interface UsePopoverBaseOptions {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
  className?: string;
  popoverInstance?: PopoverInstance;
}

const usePopoverBase = (options: UsePopoverBaseOptions) => {
  const { open, onOpenChange, placement, className, popoverInstance: instance } = options;
  const { show, onAnimationComplete } = useAnimationStatus(open);
  const popoverInstance = usePopoverInstance(instance);
  popoverInstance.onOpenChange = onOpenChange;
  const floating = useFloating({
    open: show,
    placement: placement,
    whileElementsMounted: autoUpdate,
    onOpenChange: (open) => {
      if (options.open !== open) popoverInstance.onOpenChange?.(open);
    },
    middleware: [
      sizeMiddleware({
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            overflow: 'auto',
            maxWidth: `${availableWidth}px`,
            maxHeight: `min(var(--anchor-max-height, 100vh), ${availableHeight}px)`,
          });
        },
      }),
      flipMiddleware({
        altBoundary: true,
      }),
      shiftMiddleware(),
    ],
  });
  const bodyClasName = useMemo(() => {
    return clsx('fairys_admin_popover no-scrollbar', className, [
      'rounded-sm bg-white dark:bg-gray-800! shadow-xl inset-shadow-sm',
    ]);
  }, [className]);

  return {
    floating,
    bodyClasName,
    show,
    onAnimationComplete,
    popoverInstance,
  };
};

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
    ...rest
  } = props;
  const { floating, bodyClasName, show, onAnimationComplete, popoverInstance } = usePopoverBase({
    open,
    onOpenChange,
    placement,
    className: props.className,
    popoverInstance: instance,
  });
  const motionRef = useRef<HTMLDivElement>(null);
  const { refs, floatingStyles, context } = floating;
  const useDismissOrHover = isUseHover ? useHover : useDismiss;
  const dismissOrHover = useDismissOrHover(
    context,
    isUseHover ? { ...useHoverProps } : { outsidePress: true, bubbles: { outsidePress: true }, ...useDismissProps },
  );
  const { getReferenceProps, getFloatingProps } = useInteractions([dismissOrHover]);
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
            <AnimatePresence mode="wait">
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
                      open: { scale: 1, rotate: 0, opacity: 1, height: 'auto' },
                      collapsed: { scale: 0.5, rotate: 45, opacity: 0, height: 0 },
                      ...(variants || {}),
                    }}
                    transition={{
                      duration: 0.35,
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

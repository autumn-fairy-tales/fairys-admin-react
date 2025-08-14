import { motion, AnimatePresence } from 'framer-motion';
import type { Variant, Transition } from 'framer-motion';
import { createPortal } from 'react-dom';
import React, { Fragment, cloneElement, createContext, useMemo, useRef, useContext, useState } from 'react';
import { useAnimationStatus } from '../utils';
import { useFloating, autoUpdate, useDismiss, useInteractions, useHover } from '@floating-ui/react';
import type {
  Placement,
  UseDismissProps,
  UseHoverProps,
  UseInteractionsReturn,
  UseFloatingReturn,
} from '@floating-ui/react';
import clsx from 'clsx';

interface PopoverProps
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
}
class PopoverInstance {
  /***点击外部关闭*/
  onOpenChange?: (open: boolean) => void;
}

const usePopoverInstance = () => useRef(new PopoverInstance()).current;
const PopoverInstanceContext = createContext(new PopoverInstance());

export const usePopoverInstanceContext = () => useContext(PopoverInstanceContext);

interface UsePopoverBaseOptions {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
  className?: string;
}

const usePopoverBase = (options: UsePopoverBaseOptions) => {
  const { open, onOpenChange, placement, className } = options;
  const { show, onAnimationComplete } = useAnimationStatus(open);
  const popoverInstance = usePopoverInstance();
  popoverInstance.onOpenChange = onOpenChange;

  const floating = useFloating({
    open: show,
    placement: placement,
    whileElementsMounted: autoUpdate,
    onOpenChange: (open) => {
      popoverInstance.onOpenChange?.(open);
    },
  });

  const bodyClasName = useMemo(() => {
    return clsx('fairys_admin_popover', className, ['rounded-sm bg-white dark:bg-gray-800! shadow-xl inset-shadow-sm']);
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
    ...rest
  } = props;
  const { floating, bodyClasName, show, onAnimationComplete, popoverInstance } = usePopoverBase({
    open,
    onOpenChange,
    placement,
    className: props.className,
  });
  const { refs, floatingStyles, context } = floating;
  const useDismissOrHover = isUseHover ? useHover : useDismiss;
  const dismissOrHover = useDismissOrHover(
    context,
    isUseHover ? { ...useHoverProps } : { outsidePress: true, ...useDismissProps },
  );
  const { getReferenceProps, getFloatingProps } = useInteractions([dismissOrHover]);
  return (
    <Fragment>
      {React.Children.map(children, (child) => {
        return cloneElement(child as React.ReactElement, { ref: refs.setReference, ...getReferenceProps() });
      })}
      {show ? (
        createPortal(
          <PopoverInstanceContext.Provider value={popoverInstance}>
            <AnimatePresence mode="wait">
              <div
                {...rest}
                ref={refs.setFloating}
                style={{ ...(style || {}), ...floatingStyles }}
                className={bodyClasName}
                {...getFloatingProps()}
              >
                <motion.div
                  initial="collapsed"
                  animate={open ? 'open' : 'collapsed'}
                  variants={{
                    open: { scale: 1, rotate: 0, opacity: 1, height: 'auto' },
                    collapsed: { scale: 0.5, rotate: 45, opacity: 0, height: 0 },
                    ...(variants || {}),
                  }}
                  transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98], ...transition }}
                  onAnimationComplete={onAnimationComplete}
                >
                  {content}
                </motion.div>
              </div>
            </AnimatePresence>
          </PopoverInstanceContext.Provider>,
          document.body,
        )
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
};

export const PopoverHover = (props: PopoverProps) => {
  const { children, ...rest } = props;
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} {...rest} onOpenChange={setOpen} isUseHover={true} isUseDismiss={false}>
      {children}
    </Popover>
  );
};

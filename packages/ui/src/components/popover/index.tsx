import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import React, { Fragment, cloneElement, createContext, useMemo, useRef, useContext } from 'react';
import { useAnimationStatus } from '../utils';
import { useFloating, autoUpdate, useDismiss, useInteractions } from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import clsx from 'clsx';

interface PopoverProps
  extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'> {
  open?: boolean;
  content?: React.ReactNode;
  onOutsidePress?: (open: boolean) => void;
  placement?: Placement;
}
class PopoverInstance {
  onOutsidePress?: (open: boolean) => void;
}
const usePopoverInstance = () => useRef(new PopoverInstance()).current;
const PopoverInstanceContext = createContext(new PopoverInstance());

export const usePopoverInstanceContext = () => useContext(PopoverInstanceContext);

export const Popover = (props: PopoverProps) => {
  const { children, open, content, onOutsidePress, placement = 'right-start', style = {}, ...rest } = props;
  const { show, onAnimationComplete } = useAnimationStatus(open);
  const popoverInstance = usePopoverInstance();
  popoverInstance.onOutsidePress = onOutsidePress;
  const { refs, floatingStyles, context } = useFloating({
    open: show,
    placement: placement,
    whileElementsMounted: autoUpdate,
    onOpenChange: (open) => {
      popoverInstance.onOutsidePress?.(open);
    },
  });
  const dismiss = useDismiss(context, { outsidePress: true });
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const bodyClasName = useMemo(() => {
    return clsx('fairys_admin_popover', props.className, [
      'rounded-sm bg-white dark:bg-gray-800! shadow-xl inset-shadow-sm',
    ]);
  }, [props.className]);

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
                style={{ ...style, ...floatingStyles }}
                className={bodyClasName}
                {...getFloatingProps()}
              >
                <motion.div
                  initial="collapsed"
                  animate={open ? 'open' : 'collapsed'}
                  variants={{
                    open: { scale: 1, rotate: 0, opacity: 1, height: 'auto' },
                    collapsed: { scale: 0.5, rotate: 45, opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
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

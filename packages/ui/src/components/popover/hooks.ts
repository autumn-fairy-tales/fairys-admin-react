import type { AnimationDefinition } from 'framer-motion';
import React, { createContext, useMemo, useRef, useContext } from 'react';
import { useAnimationStatus } from '../utils';
import {
  useFloating,
  autoUpdate,
  size as sizeMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
} from '@floating-ui/react';
import type { ShiftOptions, FlipOptions, Placement } from '@floating-ui/react';
import type { Derivable } from '@floating-ui/react-dom';
import clsx from 'clsx';

export interface UsePopoverBaseOptions {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
  className?: string;
  popoverInstance?: PopoverInstance;
  flipOptions?: FlipOptions | Derivable<FlipOptions>;
  shiftOptions?: ShiftOptions | Derivable<ShiftOptions>;
}
export class PopoverInstance {
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
export const PopoverInstanceContext = createContext(new PopoverInstance());
export const usePopoverInstanceContext = () => useContext(PopoverInstanceContext);
export const usePopoverBase = (options: UsePopoverBaseOptions) => {
  const { open, onOpenChange, placement, className, popoverInstance: instance, flipOptions, shiftOptions } = options;
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
      flipMiddleware(flipOptions),
      shiftMiddleware(shiftOptions),
      sizeMiddleware({
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            overflow: 'auto',
            maxWidth: `${availableWidth}px`,
            maxHeight: `min(var(--anchor-max-height, 100vh), ${availableHeight}px)`,
          });
        },
      }),
    ],
  });

  const bodyClasName = useMemo(() => {
    return clsx('fairys_admin_popover no-scrollbar', className, [
      'fairys:rounded-sm fairys:bg-white fairys:dark:bg-gray-800! fairys:shadow-xl fairys:inset-shadow-sm',
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

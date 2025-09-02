import React, { forwardRef, useState, useEffect, cloneElement, type Ref, ReactNode, Fragment, useMemo } from 'react';
import { DarkModeInstancePopoverContextProvider } from 'context/dark-mode';
import {
  useFloatingParentNodeId,
  FloatingTree,
  useFloatingTree,
  useFloatingNodeId,
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  size,
  useHover,
  safePolygon,
  useRole,
  useClick,
  useDismiss,
  useInteractions,
  FloatingNode,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react';
import { useAnimationStatus } from 'components/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { variantsBase, transitionBase } from './utils';
import clsx from 'clsx';

interface PopoverComponentBaseProps {
  // 按钮内容
  label?: ReactNode;
  /**弹框渲染内容*/
  children?: ReactNode;
  /**更新弹框状态*/
  onOpenChange?: (open: boolean) => void;
  /**弹框动画类名*/
  motionClassName?: string;
  /**弹框类名*/
  className?: string;
  /**触发事件*/
  eventName?: 'click' | 'mousedown' | 'contextMenu' | 'hover';
  /**是否禁用*/
  disabled?: boolean;
}

const motionClassNameBase =
  'fairys:flex fairys:flex-col fairys:relative fairys:border fairys:border-gray-100 fairys:dark:border-gray-700 fairys:rounded-md fairys:gap-1 fairys:py-[5px]';

function useEmpty() {
  return {};
}

export const PopoverBaseComponent = forwardRef((props: PopoverComponentBaseProps, ref: Ref<HTMLDivElement>) => {
  const {
    label,
    children,
    onOpenChange: parentOnOpenChange,
    motionClassName,
    className,
    eventName,
    disabled = false,
  } = props;
  const [open, setIsOpen] = useState(false);
  const { show, onAnimationComplete } = useAnimationStatus(open);
  const onOpenChange = (open: boolean) => {
    parentOnOpenChange?.(open);
    setIsOpen(open);
  };
  // 处理弹框
  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const isNested = eventName === 'hover' ? true : parentId != null;
  const [allowHover, setAllowHover] = useState(false);
  const { floatingStyles, refs, context } = useFloating<HTMLButtonElement>({
    nodeId,
    open: open,
    onOpenChange: onOpenChange,
    placement: isNested ? 'right-start' : 'bottom-start',
    middleware: [size(), offset({ mainAxis: isNested ? 0 : 4, alignmentAxis: isNested ? -4 : 0 }), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    enabled: !disabled && isNested && allowHover,
    delay: { open: 75 },
    handleClose: safePolygon({ blockPointerEvents: true }),
  });

  const useClickHook = eventName === 'contextMenu' ? useEmpty : useClick;

  const clickHook = useClickHook(context, {
    event: 'mousedown',
    toggle: !isNested || !allowHover,
    ignoreMouse: isNested,
    enabled: !disabled,
  });

  const role = useRole(context, { role: 'menu' });
  const dismiss = useDismiss(context, { bubbles: true });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, clickHook, role, dismiss]);

  useEffect(() => {
    if (!tree) return;
    function handleTreeClick() {
      onOpenChange(false);
    }
    function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        onOpenChange(false);
      }
    }
    tree.events.on('click', handleTreeClick);
    tree.events.on('menuopen', onSubMenuOpen);
    return () => {
      tree.events.off('click', handleTreeClick);
      tree.events.off('menuopen', onSubMenuOpen);
    };
  }, [tree, nodeId, parentId]);

  useEffect(() => {
    if (open && tree) {
      tree.events.emit('menuopen', { parentId, nodeId });
    }
  }, [tree, open, nodeId, parentId]);

  useEffect(() => {
    function onPointerMove({ pointerType }: PointerEvent) {
      if (pointerType !== 'touch') {
        setAllowHover(true);
      }
    }
    function onKeyDown() {
      setAllowHover(false);
    }
    window.addEventListener('pointermove', onPointerMove, {
      once: true,
      capture: true,
    });
    window.addEventListener('keydown', onKeyDown, true);
    return () => {
      window.removeEventListener('pointermove', onPointerMove, {
        capture: true,
      });
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [allowHover]);

  const mergeRef = useMergeRefs([refs.setReference, ref]);

  const bodyClasName = useMemo(() => {
    return clsx('fairys_admin_popover-base no-scrollbar', className, ['fairys:rounded-sm fairys:bg-transparent!']);
  }, [className]);

  const motionBodyClasName = useMemo(() => {
    return clsx('fairys_admin_popover-base-motion fairys:overflow-hidden', motionClassNameBase, motionClassName, [
      'fairys:min-w-[120px] fairys:rounded-sm fairys:bg-white fairys:dark:bg-gray-800! fairys:shadow-xl fairys:inset-shadow-sm',
    ]);
  }, [motionClassName]);

  return (
    <FloatingNode id={nodeId}>
      {React.Children.map(label, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        return cloneElement(child as React.ReactElement, {
          ref: mergeRef,
          ...getReferenceProps({
            onContextMenu: (event) => {
              if (eventName === 'contextMenu') {
                event.preventDefault();
                context.onOpenChange(true, event.nativeEvent, 'click');
              }
            },
          }),
        });
      })}
      {show ? (
        <FloatingPortal>
          <DarkModeInstancePopoverContextProvider>
            <div>
              <AnimatePresence>
                <div ref={refs.setFloating} style={floatingStyles} className={bodyClasName} {...getFloatingProps()}>
                  <motion.div
                    initial="collapsed"
                    animate={open ? 'open' : 'collapsed'}
                    variants={variantsBase}
                    transition={transitionBase}
                    onAnimationComplete={onAnimationComplete}
                    className={motionBodyClasName}
                  >
                    {children}
                  </motion.div>
                </div>
              </AnimatePresence>
            </div>
          </DarkModeInstancePopoverContextProvider>
        </FloatingPortal>
      ) : (
        <Fragment />
      )}
    </FloatingNode>
  );
});

export interface PopoverBaseProps extends PopoverComponentBaseProps {}

export const PopoverBase = forwardRef((props: PopoverBaseProps, ref: Ref<HTMLDivElement>) => {
  const {
    children,
    onOpenChange,
    eventName = 'click',
    className,
    motionClassName = '',
    disabled = false,
    label,
  } = props;

  return (
    <FloatingTree>
      <PopoverBaseComponent
        eventName={eventName}
        onOpenChange={onOpenChange}
        ref={ref}
        label={label}
        className={className}
        disabled={disabled}
        motionClassName={motionClassName}
      >
        {children}
      </PopoverBaseComponent>
    </FloatingTree>
  );
});

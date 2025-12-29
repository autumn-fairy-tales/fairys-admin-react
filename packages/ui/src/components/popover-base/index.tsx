import React, { forwardRef, useState, useEffect, cloneElement, type Ref, ReactNode, Fragment, useMemo } from 'react';
import { useDarkModeInstanceContext } from 'context/dark-mode';
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
  Placement,
} from '@floating-ui/react';
import { useAnimationStatus } from 'components/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { variantsBase, transitionBase } from './utils';
import { DarkModeInstanceContextProvider } from 'context/dark-mode';
import clsx from 'clsx';
import { UtilsColor } from 'utils/utils.color';

export interface FairysPopoverComponentBaseProps {
  /**弹框渲染内容*/
  content?: ReactNode;
  /**按钮内容*/
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
  /**弹框位置*/
  placement?: Placement;
  /**不设置最小宽度*/
  isNotMinWidth?: boolean;
  /**是否加透明度*/
  isOpacity?: boolean;
  /**主题*/
  theme?: 'light' | 'dark';
}

const motionClassNameBase = `fairys:flex fairys:flex-col fairys:relative fairys:border fairys:rounded-md fairys:gap-1 ${UtilsColor.popoverBorderClassNameBase}`;

function useEmpty() {
  return {};
}

export const FairysPopoverBaseComponent = forwardRef(
  (props: FairysPopoverComponentBaseProps, ref: Ref<HTMLDivElement>) => {
    const {
      content,
      children,
      onOpenChange: parentOnOpenChange,
      motionClassName,
      className,
      eventName,
      disabled = false,
      placement,
      isNotMinWidth = false,
      isOpacity = false,
      theme: _parentTheme,
    } = props;

    const [state] = useDarkModeInstanceContext();
    const theme = _parentTheme || state.theme;

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
      placement: placement ? placement : isNested ? 'right-start' : 'bottom-start',
      middleware: [
        offset({
          mainAxis: isNested ? 0 : 4,
          alignmentAxis: isNested ? -4 : 0,
        }),
        flip(),
        shift(),
        size({
          apply({ availableWidth, availableHeight, elements }) {
            Object.assign(elements.floating.style, {
              overflow: 'auto',
              maxWidth: `${availableWidth}px`,
              maxHeight: `min(var(--anchor-max-height, 100vh), ${availableHeight}px)`,
            });
          },
        }),
      ],
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
      return clsx(
        'fairys_admin_popover-base no-scrollbar',
        theme,
        className,
        'fairys:rounded-sm fairys:shadow-xl fairys:inset-shadow-sm',
        {
          'fairys:bg-white fairys:dark:bg-gray-800!': !isOpacity,
          'fairys:bg-white/75 fairys:dark:bg-gray-800/75!': isOpacity,
        },
      );
    }, [className, isOpacity, theme]);

    const motionBodyClasName = useMemo(() => {
      return clsx(
        'fairys_admin_popover-base-motion fairys:overflow-hidden',
        motionClassNameBase,
        motionClassName,
        'fairys:rounded-sm',
        {
          'fairys:min-w-[120px]': isNotMinWidth === false,
          'fairys:bg-white fairys:dark:bg-gray-800!': !isOpacity,
          'fairys:bg-white/75 fairys:dark:bg-gray-800/75!': isOpacity,
        },
      );
    }, [motionClassName, isNotMinWidth, isOpacity]);
    return (
      <FloatingNode id={nodeId}>
        {React.Children.map(children, (child) => {
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
            <DarkModeInstanceContextProvider theme={theme}>
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
                    {content}
                  </motion.div>
                </div>
              </AnimatePresence>
            </DarkModeInstanceContextProvider>
          </FloatingPortal>
        ) : (
          <Fragment />
        )}
      </FloatingNode>
    );
  },
);
export interface FairysPopoverBaseProps extends FairysPopoverComponentBaseProps {}

/**
 * 弹出层基础组件
 */
export const FairysPopoverBase = forwardRef((props: FairysPopoverBaseProps, ref: Ref<HTMLDivElement>) => {
  const {
    children,
    onOpenChange,
    eventName = 'click',
    className,
    motionClassName = '',
    disabled = false,
    content,
    placement,
    isNotMinWidth = false,
    isOpacity = false,
  } = props;
  return (
    <FairysPopoverBaseFloatingTreeParent>
      <FairysPopoverBaseComponent
        eventName={eventName}
        placement={placement}
        onOpenChange={onOpenChange}
        ref={ref}
        content={content}
        className={className}
        disabled={disabled}
        motionClassName={motionClassName}
        isNotMinWidth={isNotMinWidth}
        isOpacity={isOpacity}
      >
        {children}
      </FairysPopoverBaseComponent>
    </FairysPopoverBaseFloatingTreeParent>
  );
});

export const FairysPopoverBaseFloatingTreeParent = (props: { children: React.ReactNode }) => {
  const parentId = useFloatingParentNodeId();
  if (parentId === null) {
    return <FloatingTree>{props.children}</FloatingTree>;
  }
  return props.children;
};

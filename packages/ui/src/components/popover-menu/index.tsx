import React, { forwardRef, useState, useEffect, cloneElement, type Ref, ReactNode, Fragment, useMemo } from 'react';
import {
  PopoverMenuProps,
  PopoverMenuItem,
  usePopoverMenuContext,
  PopoverMenuContext,
  usePopoverMenuInstance,
} from './context';
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
import { Icon } from '@iconify/react';
import clsx from 'clsx';
export * from './context';

interface MenuComponentBaseProps {
  label: ReactNode;
  children: ReactNode;
  onOpenChange?: (open: boolean) => void;
  motionClassName?: string;
  className?: string;
  eventName?: 'click' | 'mousedown' | 'contextMenu';
  disabled?: boolean;
}
const motionClassNameBase =
  'flex flex-col relative border border-gray-100 dark:border-gray-700 rounded-md gap-1 py-[5px]';

function useEmpty() {
  return {};
}

const MenuComponentBase = forwardRef((props: MenuComponentBaseProps, ref: Ref<HTMLDivElement>) => {
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
  const isNested = parentId != null;
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
    return clsx('fairys_admin_popover-menu-component-base no-scrollbar', className, ['rounded-sm bg-transparent!']);
  }, [className]);

  const motionBodyClasName = useMemo(() => {
    return clsx(
      'fairys_admin_popover-menu-component-base-motion overflow-hidden',
      motionClassNameBase,
      motionClassName,
      ['min-w-[120px] rounded-sm bg-white dark:bg-gray-800! shadow-xl inset-shadow-sm'],
    );
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

interface MenuItemProps {
  rowItemData: PopoverMenuItem;
  /**是否父级菜单展示*/
  isSubMenuItem?: boolean;
}

const popoverMenuItemBaseCls = `shrink-0 text-gray-400 transition-all duration-300 flex flex-row items-center justify-between gap-1 py-[5px] px-[8px] mx-[5px] rounded-sm`;
const popoverMenuItemBaseClsDisabled = `opacity-70 select-none`;
const popoverMenuItemBaseClsNotDisabled = `text-gray-600 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100`;
const popoverMenuItemBaseClsActive = `active bg-(--theme-color)! text-white!`;

const MenuItem = forwardRef((props: MenuItemProps, ref: Ref<HTMLDivElement>) => {
  const { rowItemData, isSubMenuItem = false } = props;
  const tree = useFloatingTree();
  const [state, popoverMenuInstance] = usePopoverMenuContext();
  const onClickItem: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (rowItemData.disabled || isSubMenuItem) {
      return;
    }
    event.preventDefault();
    popoverMenuInstance.onClickItem?.(rowItemData, event);
    rowItemData.onClick?.(rowItemData, event);
    /**如果是多选，不进行关闭弹框*/
    if (popoverMenuInstance.mode === 'multiple') {
      return;
    }
    tree.events.emit('click');
  };
  const onCloseItem: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (rowItemData.disabled) {
      return;
    }
    event.preventDefault();
    popoverMenuInstance.onCloseItem?.(rowItemData, event);
    rowItemData.onCloseItem?.(rowItemData, event);
  };
  const isActive = useMemo(() => {
    return popoverMenuInstance.isChecked(rowItemData);
  }, [state.value]);

  const cls = useMemo(() => {
    return clsx('popover-menu-item', popoverMenuItemBaseCls, {
      [popoverMenuItemBaseClsDisabled]: rowItemData.disabled,
      [popoverMenuItemBaseClsNotDisabled]: !rowItemData.disabled,
      [popoverMenuItemBaseClsActive]: isActive,
      'dark:bg-gray-700/75 bg-gray-100/75 text-gray-600!': !rowItemData.disabled && isSubMenuItem,
    });
  }, [isActive, rowItemData, isSubMenuItem]);

  return (
    <div ref={ref} onClick={onClickItem} className={cls}>
      <div className="flex items-center flex-1">
        {rowItemData.icon ? (
          <span className="size-[16px] mr-2">
            <Icon icon={rowItemData.icon} className="size-[16px]" />
          </span>
        ) : (
          <Fragment />
        )}
        <div>{rowItemData.title}</div>
      </div>
      <div>
        {isSubMenuItem ? (
          <span className="icon-[ant-design--right-outlined] ml-5 text-gray-400 hover:text-gray-600 dark:hover:text-white dark:text-gray-500 transition-all duration-300" />
        ) : popoverMenuInstance.isHideClose ? (
          <Fragment />
        ) : (
          <span
            className="icon-[ant-design--close-outlined] ml-5 text-gray-400 hover:text-gray-600 dark:hover:text-white dark:text-gray-500 transition-all duration-300"
            onClick={onCloseItem}
          />
        )}
      </div>
    </div>
  );
});

const Menu = forwardRef(
  (props: MenuItemProps & { label?: ReactNode; onOpenChange?: (open: boolean) => void }, ref: Ref<HTMLDivElement>) => {
    const { label, onOpenChange } = props;
    const parentId = useFloatingParentNodeId();
    const { rowItemData } = props;
    const { items } = rowItemData;
    const render = useMemo(() => {
      return (items || []).map((item, index) => createChildMenu(item, index));
    }, [items]);
    if (parentId === null) {
      return (
        <FloatingTree>
          <MenuComponentBase
            disabled={rowItemData.disabled}
            onOpenChange={onOpenChange}
            ref={ref}
            label={label ? label : <MenuItem rowItemData={rowItemData} isSubMenuItem />}
          >
            {render}
          </MenuComponentBase>
        </FloatingTree>
      );
    }
    return (
      <MenuComponentBase
        ref={ref}
        onOpenChange={onOpenChange}
        disabled={rowItemData.disabled}
        label={label ? label : <MenuItem rowItemData={rowItemData} isSubMenuItem />}
      >
        {render}
      </MenuComponentBase>
    );
  },
);

const createChildMenu = (item: PopoverMenuItem, index: number) => {
  if (item.children) {
    return <Fragment key={item.path || item.title || item.key || index}>{item.children}</Fragment>;
  } else if (item.visible === false) {
    return <Fragment key={item.path || item.title || item.key || index} />;
  } else if (item.isDivider) {
    return (
      <div key={item.path || item.title || item.key || index} className="w-full h-[1px] bg-gray-100 dark:bg-gray-700" />
    );
  } else if (Array.isArray(item.items)) {
    return <Menu key={item.path || item.title || item.key || index} rowItemData={item} />;
  }
  return <MenuItem key={item.path || item.title || item.key || index} rowItemData={item} />;
};

export const PopoverMenu = forwardRef((props: PopoverMenuProps, ref: Ref<HTMLDivElement>) => {
  const {
    items,
    children,
    onOpenChange,
    onClickItem,
    onCloseItem,
    mode,
    value,
    isHideClose = true,
    instance,
    eventName = 'click',
    className,
    motionClassName = '',
    disabled = false,
  } = props;
  const popoverMenuInstance = usePopoverMenuInstance(instance);
  popoverMenuInstance.items = items;
  popoverMenuInstance.isHideClose = isHideClose;
  popoverMenuInstance.onClickItem = onClickItem;
  popoverMenuInstance.onCloseItem = onCloseItem;
  popoverMenuInstance.mode = mode;

  useMemo(() => {
    popoverMenuInstance.state.value = value;
  }, [value]);

  const render = useMemo(() => {
    return (items || []).map((item, index) => createChildMenu(item, index));
  }, [items]);

  return (
    <PopoverMenuContext.Provider value={popoverMenuInstance}>
      <FloatingTree>
        <MenuComponentBase
          eventName={eventName}
          onOpenChange={onOpenChange}
          ref={ref}
          label={children}
          className={className}
          disabled={disabled}
          motionClassName={motionClassName}
        >
          {render}
        </MenuComponentBase>
      </FloatingTree>
    </PopoverMenuContext.Provider>
  );
});

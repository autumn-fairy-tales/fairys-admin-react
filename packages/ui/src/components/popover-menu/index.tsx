import React, { forwardRef, type Ref, ReactNode, Fragment, useMemo } from 'react';
import {
  PopoverMenuProps,
  PopoverMenuItemType,
  usePopoverMenuContext,
  PopoverMenuContext,
  usePopoverMenuInstance,
} from './context';
import { useFloatingTree } from '@floating-ui/react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { PopoverBase } from 'components/popover-base';
export * from './context';

interface MenuItemProps {
  rowItemData: PopoverMenuItemType;
  /**是否父级菜单展示*/
  isSubMenuItem?: boolean;
}

const popoverMenuItemBaseCls = `fairys:shrink-0 fairys:text-gray-400 fairys:transition-all fairys:duration-300 fairys:flex fairys:flex-row fairys:items-center fairys:justify-between fairys:gap-1 fairys:py-[5px] fairys:px-[8px] fairys:mx-[5px] fairys:rounded-sm`;
const popoverMenuItemBaseClsDisabled = `fairys:opacity-70 fairys:select-none`;
const popoverMenuItemBaseClsNotDisabled = `fairys:text-gray-600 fairys:cursor-pointer fairys:hover:text-gray-700 fairys:dark:text-gray-400 fairys:dark:hover:text-gray-300 fairys:dark:hover:bg-gray-700 fairys:hover:bg-gray-100`;
const popoverMenuItemBaseClsActive = `active fairys:bg-(--fairys-theme-color)! fairys:text-white!`;

const MenuItem = forwardRef((props: MenuItemProps, ref: Ref<HTMLDivElement>) => {
  const { rowItemData, isSubMenuItem = false } = props;
  const { isShowClose = true } = rowItemData;

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
    if (popoverMenuInstance.mode === 'multiple' || rowItemData.isClickClose === false) {
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
      'fairys:dark:bg-gray-700/75 fairys:bg-gray-100/75 fairys:text-gray-600!': !rowItemData.disabled && isSubMenuItem,
    });
  }, [isActive, rowItemData, isSubMenuItem]);

  return (
    <div ref={ref} onClick={onClickItem} className={cls}>
      <div className="fairys:flex fairys:items-center fairys:flex-1">
        {rowItemData.icon ? (
          <span className="fairys:size-[16px] fairys:mr-2">
            <Icon icon={rowItemData.icon} className="fairys:size-[16px]" />
          </span>
        ) : (
          <Fragment />
        )}
        <div>{rowItemData.title}</div>
      </div>
      <div>
        {isSubMenuItem ? (
          <span className="fairys:icon-[ant-design--right-outlined] fairys:ml-5 fairys:text-gray-400 fairys:hover:text-gray-600 fairys:dark:hover:text-white fairys:dark:text-gray-500 fairys:transition-all fairys:duration-300" />
        ) : popoverMenuInstance.isHideClose || isShowClose === false ? (
          <Fragment />
        ) : (
          <span
            className="fairys:icon-[ant-design--close-outlined] fairys:ml-5 fairys:text-gray-400 fairys:hover:text-gray-600 fairys:dark:hover:text-white fairys:dark:text-gray-500 fairys:transition-all fairys:duration-300"
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
    const { rowItemData } = props;
    const { items } = rowItemData;
    const render = useMemo(() => {
      return (items || []).map((item, index) => createChildMenu(item, index));
    }, [items]);
    return (
      <PopoverBase disabled={rowItemData.disabled} onOpenChange={onOpenChange} ref={ref} content={render}>
        {label ? label : <MenuItem rowItemData={rowItemData} isSubMenuItem />}
      </PopoverBase>
    );
  },
);

const createChildMenu = (item: PopoverMenuItemType, index: number) => {
  if (item.children) {
    return <Fragment key={item.path || item.title || item.key || index}>{item.children}</Fragment>;
  } else if (item.visible === false) {
    return <Fragment key={item.path || item.title || item.key || index} />;
  } else if (item.isDivider) {
    return (
      <div
        key={item.path || item.title || item.key || index}
        className="fairys:w-full fairys:h-[1px] fairys:bg-gray-100 fairys:dark:bg-gray-700"
      />
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
    className = '',
    motionClassName = '',
    disabled = false,
    placement,
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
      <PopoverBase
        eventName={eventName}
        onOpenChange={onOpenChange}
        ref={ref}
        content={render}
        className={className}
        disabled={disabled}
        motionClassName={`fairys:py-[6px] ${motionClassName}`}
        placement={placement}
      >
        {children}
      </PopoverBase>
    </PopoverMenuContext.Provider>
  );
});

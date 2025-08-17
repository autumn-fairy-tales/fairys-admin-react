import { useRef, Fragment, useMemo, useState } from 'react';
import { useTabBar, TabBarItemType, tabBarInstance } from 'context/tab-bar';
import { Icon } from '@iconify/react';
import { useNavigate, matchPath, useLocation } from 'react-router';
import { Popover, usePopoverInstanceContext } from 'components/popover';
import clsx from 'clsx';

export interface PopoverMenuItem {
  icon?: string;
  title?: string;
  [key: string]: any;
}

export interface PopoverMenuProps {
  items: PopoverMenuItem[];
  layoutMode?: 'vertical' | 'horizontal';
  onClick?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  onClose?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  isHideClose?: boolean;
}

class PopoverMenuInstance {
  onClick?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  onClose?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  isHideClose?: boolean;
  items: PopoverMenuItem[];
  layoutMode?: 'vertical' | 'horizontal';
}
const usePopoverMenuInstance = () => useRef<PopoverMenuInstance>(new PopoverMenuInstance()).current;

const popoverMenuItemBaseCls = `shrink-0 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100 transition flex flex-row items-center gap-1 px-[20px] py-[10px] cursor-pointer`;

export const PopoverMenu = (props: PopoverMenuProps) => {
  const { onClick, onClose, items, layoutMode = 'vertical', isHideClose = false } = props;
  const popoverMenuInstance = usePopoverMenuInstance();
  popoverMenuInstance.items = items;
  popoverMenuInstance.onClick = onClick;
  popoverMenuInstance.onClose = onClose;
  popoverMenuInstance.layoutMode = layoutMode;

  const render = useMemo(() => {
    return (items || []).map((item) => {
      return (
        <div
          onClick={(e) => popoverMenuInstance.onClick?.(item, e)}
          key={item.path}
          className={popoverMenuItemBaseCls}
          title={item.title}
        >
          {item.icon ? (
            <span className="size-[16px]">
              <Icon icon={item.icon} className="size-[16px]" />
            </span>
          ) : (
            <Fragment />
          )}
          <div className="flex-1  whitespace-nowrap">{item.title}</div>
          {!isHideClose ? (
            <span
              className="icon-[ant-design--close-outlined] ml-5 text-gray-400 hover:text-gray-600"
              onClick={(e) => popoverMenuInstance.onClose?.(item, e)}
            />
          ) : (
            <Fragment />
          )}
        </div>
      );
    });
  }, [items, isHideClose]);

  const classNameBase = useMemo(() => {
    return clsx('flex flex-col relative', {
      'flex-col': layoutMode === 'vertical',
      'flex-row': layoutMode === 'horizontal',
    });
  }, [layoutMode]);

  return <div className={classNameBase}>{render}</div>;
};

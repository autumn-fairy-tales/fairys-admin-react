import { useRef, Fragment, useMemo } from 'react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

export interface PopoverMenuItem {
  icon?: string;
  title?: string;
  disabled?: boolean;
  isDivider?: boolean;
  visible?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}

export interface PopoverMenuProps {
  items: PopoverMenuItem[];
  layoutMode?: 'vertical' | 'horizontal';
  onClick?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  onClose?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  isHideClose?: boolean;
  className?: string;
}

class PopoverMenuInstance {
  onClick?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  onClose?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  isHideClose?: boolean;
  items: PopoverMenuItem[];
  layoutMode?: 'vertical' | 'horizontal';
}
const usePopoverMenuInstance = () => useRef<PopoverMenuInstance>(new PopoverMenuInstance()).current;

const popoverMenuItemBaseCls = `shrink-0 text-gray-400 transition-all duration-300 flex flex-row items-center gap-1 py-[5px] px-[8px] mx-[5px] rounded-sm`;

export const PopoverMenu = (props: PopoverMenuProps) => {
  const { onClick, onClose, items, layoutMode = 'vertical', isHideClose = false, className } = props;
  const popoverMenuInstance = usePopoverMenuInstance();
  popoverMenuInstance.items = items;
  popoverMenuInstance.onClick = onClick;
  popoverMenuInstance.onClose = onClose;
  popoverMenuInstance.layoutMode = layoutMode;

  const render = useMemo(() => {
    return (items || []).map((item, index) => {
      if (item.children) {
        return <Fragment key={item.path || item.title || item.key || index}>{item.children}</Fragment>;
      }
      if (item.visible === false) {
        return <Fragment key={item.path || item.title || item.key || index} />;
      }
      if (item.isDivider) {
        return (
          <div
            key={item.path || item.title || item.key || index}
            className="w-full h-[1px] bg-gray-100 dark:bg-gray-700"
          />
        );
      }
      return (
        <div
          onClick={(e) => popoverMenuInstance.onClick?.(item, e)}
          key={item.path || item.title || item.key || index}
          className={clsx(popoverMenuItemBaseCls, {
            'cursor-not-allowed opacity-70 select-none': item.disabled,
            'text-gray-600 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100':
              !item.disabled,
          })}
          title={item.title}
        >
          {item.icon ? (
            <span className="size-[16px] mr-2">
              <Icon icon={item.icon} className="size-[16px]" />
            </span>
          ) : (
            <Fragment />
          )}
          <div className="flex-1  whitespace-nowrap">{item.title}</div>
          {!isHideClose ? (
            <span
              className="icon-[ant-design--close-outlined] ml-5 text-gray-400 hover:text-gray-600 dark:hover:text-white dark:text-gray-500 transition-all duration-300"
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
    return clsx(
      'flex flex-col relative gap-1 py-[5px]',
      {
        'flex-col': layoutMode === 'vertical',
        'flex-row': layoutMode === 'horizontal',
      },
      className,
    );
  }, [layoutMode, className]);

  return <div className={classNameBase}>{render}</div>;
};

import { useRef, Fragment, useMemo } from 'react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

export interface PopoverMenuItem {
  /**图标*/
  icon?: string;
  /**标题*/
  title?: string;
  /**是否禁用*/
  disabled?: boolean;
  /**分割线*/
  isDivider?: boolean;
  /**是否显示*/
  visible?: boolean;
  /**自定义内容*/
  children?: React.ReactNode;
  /**点击当前项*/
  onClick?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  /**删除按钮事件*/
  onClose?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  [key: string]: any;
}

export interface PopoverMenuProps {
  items: PopoverMenuItem[];
  layoutMode?: 'vertical' | 'horizontal';
  onClick?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  onClose?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  isHideClose?: boolean;
  className?: string;
  /**点击外部关闭(在弹框类中使用，用于关闭弹框)*/
  onOpenChange?: (open: boolean) => void;
}

class PopoverMenuInstance {
  onClick?: PopoverMenuItem['onClick'];
  onClose?: PopoverMenuItem['onClose'];
  isHideClose?: PopoverMenuItem['isHideClose'];
  items: PopoverMenuProps['items'];
  layoutMode?: PopoverMenuProps['layoutMode'];
  /**点击外部关闭(在弹框类中使用，用于关闭弹框)*/
  onOpenChange?: PopoverMenuProps['onOpenChange'];
}
const usePopoverMenuInstance = () => useRef<PopoverMenuInstance>(new PopoverMenuInstance()).current;

const popoverMenuItemBaseCls = `shrink-0 text-gray-400 transition-all duration-300 flex flex-row items-center gap-1 py-[5px] px-[8px] mx-[5px] rounded-sm`;

export const PopoverMenu = (props: PopoverMenuProps) => {
  const { onClick, onClose, items, layoutMode = 'vertical', isHideClose = false, className, onOpenChange } = props;
  const popoverMenuInstance = usePopoverMenuInstance();
  popoverMenuInstance.items = items;
  popoverMenuInstance.onClick = onClick;
  popoverMenuInstance.onClose = onClose;
  popoverMenuInstance.layoutMode = layoutMode;
  popoverMenuInstance.onOpenChange = onOpenChange;

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
      const onClickItem = (e: React.MouseEvent) => {
        if (item.disabled) {
          return;
        }
        e.preventDefault();
        item.onClick?.(item, e);
        popoverMenuInstance.onClick?.(item, e);
        popoverMenuInstance.onOpenChange?.(false);
      };
      const onCloseItem = (e: React.MouseEvent) => {
        if (item.disabled) {
          return;
        }
        e.preventDefault();
        item.onClose?.(item, e);
        popoverMenuInstance.onClose?.(item, e);
        popoverMenuInstance.onOpenChange?.(false);
      };

      return (
        <div
          onClick={onClickItem}
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
              onClick={onCloseItem}
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

import { Fragment, useEffect, useMemo } from 'react';
import type { MenuItemType } from '../context/menu-data';
import { tabBarInstance } from '../context/tab-bar';
import { menuDataInstance, useMenuItemInstance, useMenuInstanceContext } from './../context/menu-data';
import { useMatch, useNavigate } from 'react-router';
import clsx from 'clsx';
import { Icon } from '@iconify/react';

export interface MenuItemProps {
  item: MenuItemType;
  level?: number;
  isSubMenu?: boolean;
  isExpand?: boolean;
}

export const MenuItem = (props: MenuItemProps) => {
  const { item, level = 0, isSubMenu = false, isExpand = false } = props;
  const match = useMatch(item.path);
  const navigate = useNavigate();
  const menuInstance = useMenuInstanceContext();
  const menuItemInstance = useMenuItemInstance();
  menuItemInstance.item = item;
  menuItemInstance.isSubMenu = isSubMenu;
  menuItemInstance.isActive = !!match;

  useEffect(() => {
    const onMount = menuInstance.register(menuItemInstance);
    return () => onMount();
  }, [menuItemInstance]);

  const menuItemClassName = useMemo(() => {
    return clsx(
      'fairys_admin_menu_item shrink-0 transition rounded-sm h-[36px] box-border flex items-center justify-between cursor-pointer gap-1 dark:text-gray-400',
      {
        [`data-level=${level}`]: true,
        active: !!match,
        'bg-blue-500': !!match,
        'text-white': !!match,
        'hover:bg-blue-100 dark:hover:bg-gray-600 ': !match,
        'px-[14px]': true,
      },
    );
  }, [match, level]);

  const titleClassName = useMemo(() => {
    return clsx('fairys_admin_menu_item_title flex flex-1 items-center overflow-hidden gap-1', {});
  }, []);

  const titleTextClassName = useMemo(() => {
    return clsx('fairys_admin_menu_item_title_text flex-1 text-ellipsis overflow-hidden whitespace-nowrap', {});
  }, []);

  const titleStyle = useMemo(() => {
    return {
      paddingLeft: `${level * 20}px`,
    };
  }, [level]);

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isSubMenu) {
      //  如果是父级菜单渲染，则展开子菜单
      menuDataInstance.onToggleItems(item.path);
    } else if (!match) {
      navigate(item.path);
      tabBarInstance.addItem(item);
    }
  };

  const expandIcon = useMemo(() => {
    return clsx(
      'relative ms-1 w-[10px] after:bg-current before:bg-current after:-translate-y-[1px] before:-translate-y-[1px]',
      {
        expand: isExpand,
        close: !isExpand,
      },
    );
  }, [isExpand]);

  // 跳转后滚动到当前tab
  useEffect(() => {
    if (!!match && menuItemInstance.dom.current) {
      menuItemInstance.scrollIntoView();
    }
  }, [match, menuItemInstance.dom]);

  return (
    <div ref={menuItemInstance.dom} data-level={level} className={menuItemClassName} onClick={onClick}>
      <div className={titleClassName} style={titleStyle} title={item.title}>
        {item.icon ? (
          <span className="size-[16px]">
            <Icon icon={item.icon} className="size-[16px]" />
          </span>
        ) : (
          <Fragment />
        )}
        <span className={titleTextClassName}>{item.title}</span>
      </div>
      <div className="fairys_admin_menu_item_extra">{isSubMenu ? <div className={expandIcon} /> : <Fragment />}</div>
    </div>
  );
};

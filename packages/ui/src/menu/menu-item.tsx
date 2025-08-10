import { Fragment, useEffect, useMemo } from 'react';
import type { MenuItemType } from '../context/menu-data';
import { tabBarInstance } from '../context/tab-bar';
import { menuDataInstance, useMenuItemInstance, useMenuInstance } from './../context/menu-data';
import { useMatch, useNavigate } from 'react-router';
import clsx from 'clsx';

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
  const menuInstance = useMenuInstance();
  const menuItemInstance = useMenuItemInstance();
  menuItemInstance.item = item;
  menuItemInstance.isSubMenu = isSubMenu;

  useEffect(() => {
    const onMount = menuInstance.register(menuItemInstance);
    return () => onMount();
  }, []);

  const menuItemClassName = useMemo(() => {
    return clsx(
      'fairys_admin_menu_item transition rounded-sm h-[36px] box-border flex items-center justify-between cursor-pointer',
      {
        [`data-level=${level}`]: true,
        active: !!match,
        'bg-blue-500': !!match,
        'text-white': !!match,
        'px-[14px]': true,
      },
    );
  }, [match, level]);

  const titleClassName = useMemo(() => {
    return clsx('fairys_admin_menu_item_title flex-1 text-ellipsis overflow-hidden whitespace-nowrap', {});
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
      'relative ms-1 w-[10px] after:absolute before:absolute after:h-[1.5px] after:w-[6px] before:h-[1.5px] before:w-[6px] after:bg-current before:bg-current after:transition-transform-200 before:transition-transform-200 after:content-empty before:content-empty after:-translate-y-[1px] before:-translate-y-[1px]',
      {
        'before:-rotate-45 before:-translate-x-[2px] after:rotate-45 after:translate-x-[2px]': isExpand,
        'before:rotate-45 before:-translate-x-[2px] after:-rotate-45 after:translate-x-[2px]': !isExpand,
      },
    );
  }, [isExpand]);

  // 跳转后滚动到当前tab
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!!match && menuItemInstance.dom.current) {
        menuItemInstance.dom.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [match, menuItemInstance.dom]);
  return (
    <div ref={menuItemInstance.dom} data-level={level} className={menuItemClassName} onClick={onClick}>
      <div className={titleClassName} style={titleStyle} title={item.title}>
        {item.title}
      </div>
      <div className="fairys_admin_menu_item_extra">{isSubMenu ? <i className={expandIcon} /> : <Fragment />}</div>
    </div>
  );
};

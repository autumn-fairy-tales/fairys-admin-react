import { Fragment, useEffect, useMemo } from 'react';
import type { MenuItemType } from '../context/menu-data';
import { tabBarInstance } from '../context/tab-bar';
import { menuDataInstance, useMenuItemInstance, useMenuInstanceContext } from './../context/menu-data';
import { useMatch, useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import { useSetting } from '../context/setting';

export interface MenuItemProps {
  item: MenuItemType;
  level?: number;
  isSubMenu?: boolean;
  isExpand?: boolean;
}

export const MenuItem = (props: MenuItemProps) => {
  const { item, level = 0, isSubMenu = false, isExpand = false } = props;
  const match = useMatch(item.path);
  // const close = useClose();
  const navigate = useNavigate();
  const menuInstance = useMenuInstanceContext();
  const menuItemInstance = useMenuItemInstance();
  const location = useLocation();

  menuItemInstance.item = item;
  menuItemInstance.isSubMenu = isSubMenu;
  menuItemInstance.isActive = !!match;
  // menuItemInstance.close = close;
  const [settingState] = useSetting();
  const sideMenuMode = settingState.sideMenuMode;

  const isActive = useMemo(() => {
    if (sideMenuMode === 'close' && level === 0) {
      return menuDataInstance.isParentMenuItem(item.path, location.pathname);
    }
    return !!match;
  }, [location.pathname, sideMenuMode, match]);

  /**侧边菜单是否折叠*/
  const isCollapse = useMemo(() => {
    if (sideMenuMode !== 'close') {
      return true;
    }
    if (level === 0 && sideMenuMode === 'close') {
      return false;
    }
    return level > 0;
  }, [sideMenuMode, level]);

  useEffect(() => {
    const onMount = menuInstance.register(menuItemInstance);
    return () => onMount();
  }, [menuItemInstance]);

  const menuItemClassName = useMemo(() => {
    return clsx(
      'fairys_admin_menu_item shrink-0 transition-all duration-300  rounded-sm h-[36px] box-border flex items-center justify-between cursor-pointer gap-1 dark:text-gray-400',
      {
        [`data-level=${level}`]: true,
        active: !!isActive,
        'bg-blue-500': !!isActive,
        'text-white dark:text-white': !!isActive,
        'hover:bg-blue-100 dark:hover:bg-gray-600': !isActive,
        'px-[14px]': true,
      },
    );
  }, [isActive, level]);

  const titleClassName = useMemo(() => {
    return clsx('fairys_admin_menu_item_title flex flex-1 items-center justify-center overflow-hidden gap-1', {});
  }, []);

  const titleTextClassName = useMemo(() => {
    return clsx('fairys_admin_menu_item_title_text flex-1 text-ellipsis overflow-hidden whitespace-nowrap', {});
  }, []);

  const titleStyle = useMemo(() => {
    if (sideMenuMode === 'close') {
      return {};
    }
    return {
      paddingLeft: `${level * 20}px`,
    };
  }, [level]);

  const onClick = (e: React.MouseEvent) => {
    if (isSubMenu) {
      //  如果是父级菜单渲染，则展开子菜单
      menuDataInstance.onToggleItems(item.path);
    } else if (!match) {
      navigate(item.path);
      menuInstance.onClose(item.path);
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
    if (!!isActive && menuItemInstance.dom.current) {
      menuItemInstance.scrollIntoView();
    }
  }, [isActive, menuItemInstance.dom]);

  const iconClassName = useMemo(() => {
    return clsx('size-[16px]', {});
  }, [isCollapse]);

  return (
    <div ref={menuItemInstance.dom} data-level={level} className={menuItemClassName} onClick={onClick}>
      <div className={titleClassName} style={titleStyle} title={item.title}>
        {item.icon ? (
          <span className={iconClassName}>
            <Icon icon={item.icon} className={iconClassName} />
          </span>
        ) : (
          <Fragment />
        )}
        <span className={titleTextClassName}>{item.title}</span>
        {/* <Transition show={isCollapse}>
          <span className={titleTextClassName}>{item.title}</span>
        </Transition> */}
      </div>
      <div className="fairys_admin_menu_item_extra">{isSubMenu ? <div className={expandIcon} /> : <Fragment />}</div>
      {/* <Transition show={isCollapse}>
        <div className="fairys_admin_menu_item_extra">{isSubMenu ? <div className={expandIcon} /> : <Fragment />}</div>
      </Transition> */}
    </div>
  );
};

import { Fragment, useEffect, useMemo, forwardRef, Ref, useImperativeHandle } from 'react';
import type { MenuItemType } from 'context/menu-data';
import { tabBarInstance } from 'context/tab-bar';
import { menuDataInstance, useMenuItemInstance, useMenuInstanceContext } from 'context/menu-data';
import { useMatch, useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Icon } from '@iconify/react';

export interface MenuItemProps {
  item: MenuItemType;
  level?: number;
  isSubMenu?: boolean;
  isExpand?: boolean;
}

const menuItemBaseClassName =
  'fairys_admin_menu_item shrink-0 transition-all duration-300 rounded-sm h-[36px] box-border flex items-center justify-between cursor-pointer gap-1 dark:text-gray-400 px-[14px]';

const titleClassName = 'fairys_admin_menu_item_title flex flex-1 items-center justify-center overflow-hidden gap-1';
const titleTextClassName = 'fairys_admin_menu_item_title_text flex-1 text-ellipsis overflow-hidden whitespace-nowrap';

export const MainMenuItem = forwardRef((props: MenuItemProps, ref: Ref<HTMLDivElement>) => {
  const { item } = props;
  const [menuState] = useMenuInstanceContext();
  const sideMenuMode = menuState.menuModeExpandCollapse;
  const location = useLocation();
  const isActive = useMemo(() => {
    if (sideMenuMode === 'close') {
      return menuDataInstance.isParentMenuItem(item.path, location.pathname);
    }
    return false;
  }, [location.pathname, sideMenuMode]);

  const className = useMemo(() => {
    return clsx(menuItemBaseClassName, ['text-gray-400', 'dark:text-gray-600'], {
      'bg-[var(--theme-color)]': !!isActive,
      'text-white dark:text-white': !!isActive,
    });
  }, [isActive]);

  const iconRender = useMemo(() => {
    return item.icon ? (
      <span className={'size-[16px]'}>
        <Icon icon={item.icon} className={'size-[16px]'} />
      </span>
    ) : (
      <Fragment />
    );
  }, [item.icon]);

  const onClick = (e: React.MouseEvent) => {
    if (sideMenuMode === 'close') {
      //  如果是父级菜单渲染，则展开子菜单
      menuDataInstance.onToggleItems(item.path);
      menuDataInstance.updateMainExpandItem(item);
    }
  };

  return (
    <div className={className} ref={ref} onClick={onClick}>
      <div className={titleClassName} title={item.title}>
        {iconRender}
        {sideMenuMode === 'open' ? <span className={titleTextClassName}>{item.title}</span> : <Fragment />}
      </div>
    </div>
  );
});

export const MenuItem = forwardRef((props: MenuItemProps, ref: Ref<HTMLDivElement>) => {
  const { item, level = 0, isSubMenu = false, isExpand = false } = props;
  const match = useMatch(item.path);
  const navigate = useNavigate();
  const [menuState, menuInstance] = useMenuInstanceContext();
  const menuItemInstance = useMenuItemInstance();
  const location = useLocation();
  menuItemInstance.item = item;
  menuItemInstance.isSubMenu = isSubMenu;
  menuItemInstance.isActive = !!match;
  useImperativeHandle(ref, () => menuItemInstance.dom.current);
  const sideMenuMode = menuState.menuModeExpandCollapse;

  const isActive = useMemo(() => {
    if (sideMenuMode === 'close' && level === 0) {
      return menuDataInstance.isParentMenuItem(item.path, location.pathname);
    }
    return !!match;
  }, [location.pathname, sideMenuMode, match]);

  /**侧边菜单是否折叠*/
  const isExpandCollapse = useMemo(() => {
    if (sideMenuMode !== 'close') {
      return true;
    }
    if (level === 0 && sideMenuMode === 'close') {
      return false;
    }
    return level > 0;
  }, [sideMenuMode, level]);

  const menuItemClassName = useMemo(() => {
    return clsx(menuItemBaseClassName, {
      [`data-level=${level}`]: true,
      active: !!isActive,
      'bg-[var(--theme-color)]': !!isActive,
      'text-white dark:text-white': !!isActive,
      'hover:bg-gray-200/75 dark:hover:bg-gray-600': !isActive,
    });
  }, [isActive, level]);

  const titleStyle = useMemo(() => {
    if (sideMenuMode === 'close') {
      return {};
    }
    return {
      paddingLeft: `${level * 20}px`,
    };
  }, [level, sideMenuMode]);

  const onClick = (e: React.MouseEvent) => {
    if (isSubMenu) {
      //  如果是父级菜单渲染，则展开子菜单
      menuDataInstance.onToggleItems(item.path);
    } else if (!match) {
      navigate(item.path);
      tabBarInstance.addItem(item);
      menuDataInstance.updateMainExpandItem(undefined);
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

  const iconClassName = useMemo(() => {
    return clsx('size-[16px]', {});
  }, [isExpandCollapse]);

  useEffect(() => {
    const onMount = menuInstance.register(menuItemInstance);
    return () => onMount();
  }, [menuItemInstance]);

  // 跳转后滚动到当前tab
  useEffect(() => {
    if (!!isActive && menuItemInstance.dom.current) {
      menuItemInstance.scrollIntoView();
    }
  }, [isActive, menuItemInstance.dom]);

  const iconRender = useMemo(() => {
    return item.icon ? (
      <span className={iconClassName}>
        <Icon icon={item.icon} className={iconClassName} />
      </span>
    ) : (
      <Fragment />
    );
  }, [iconClassName, item.icon]);

  return useMemo(() => {
    return (
      <div
        ref={menuItemInstance.dom}
        data-level={level}
        title={item.title}
        className={menuItemClassName}
        onClick={onClick}
      >
        <div className={titleClassName} style={titleStyle}>
          {iconRender}
          {isExpandCollapse ? <span className={titleTextClassName}>{item.title}</span> : <Fragment />}
        </div>
        {isExpandCollapse ? (
          <div className="fairys_admin_menu_item_extra fairys_admin_down_up_icon">
            {isSubMenu ? <div className={expandIcon} /> : <Fragment />}
          </div>
        ) : (
          <Fragment />
        )}
      </div>
    );
  }, [
    iconRender,
    isExpandCollapse,
    isSubMenu,
    level,
    menuItemClassName,
    titleClassName,
    titleStyle,
    expandIcon,
    titleTextClassName,
  ]);
});

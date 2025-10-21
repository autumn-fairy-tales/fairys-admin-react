import { Fragment, useEffect, useMemo, forwardRef, Ref, useImperativeHandle } from 'react';
import type { MenuItemType } from 'context/menu-data';
import { tabBarDataInstance } from 'context/tab-bar';
import { menuDataInstance, useMenuItemInstance, useMenuInstanceContext } from 'context/menu-data';
import { useMatch, useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Icon, IconProps } from '@iconify/react';
import { useMergeRefs, useFloatingTree } from '@floating-ui/react';
import { useSettingDataInstance } from 'context/setting';
export interface MenuItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**
   * 菜单项
   */
  item: MenuItemType;
  /**
   * 菜单层级
   */
  level?: number;
  /**
   * 是否为子菜单
   */
  isSubMenu?: boolean;
  /**
   * 是否展开
   */
  isExpand?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
}

const menuItemBaseClassName =
  'fairys_admin_menu_item fairys:shrink-0 fairys:transition-all fairys:duration-300 fairys:rounded-sm fairys:h-[36px] fairys:box-border fairys:flex fairys:items-center fairys:justify-between fairys:cursor-pointer fairys:gap-1 fairys:dark:text-gray-400 fairys:px-[14px]';

const titleClassName =
  'fairys_admin_menu_item_title fairys:flex fairys:flex-1 fairys:items-center fairys:justify-center fairys:overflow-hidden fairys:gap-1';
const titleTextClassName =
  'fairys_admin_menu_item_title_text fairys:flex-1 fairys:text-ellipsis fairys:overflow-hidden fairys:whitespace-nowrap';

export const MainMenuItem = forwardRef((props: MenuItemProps, ref: Ref<HTMLDivElement>) => {
  const { item } = props;
  const iconProps = item.iconProps as IconProps;
  const _className = item.className;

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
    return clsx(menuItemBaseClassName, _className, ['fairys:text-gray-400', 'fairys:dark:text-gray-600'], {
      'fairys:bg-(--fairys-theme-color)': !!isActive,
      'fairys:text-white fairys:dark:text-white': !!isActive,
    });
  }, [isActive, _className]);

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
        {item.icon ? (
          <span className={'fairys:size-[16px]'}>
            <Icon {...iconProps} icon={item.icon} className={`fairys:size-[16px]  ${iconProps?.className || ''}`} />
          </span>
        ) : (
          <Fragment />
        )}
        {sideMenuMode === 'open' ? <span className={titleTextClassName}>{item.title}</span> : <Fragment />}
      </div>
    </div>
  );
});

export const MenuItem = forwardRef((props: MenuItemProps, ref: Ref<HTMLDivElement>) => {
  const { item, level = 0, isSubMenu = false, isExpand = false, ...rest } = props;
  const iconProps = item.iconProps as IconProps;
  const _className = item.className;

  const match = useMatch(item.path);
  const navigate = useNavigate();
  const [menuState, menuInstance] = useMenuInstanceContext();
  const menuItemInstance = useMenuItemInstance();
  const tree = useFloatingTree();

  const location = useLocation();
  menuItemInstance.item = item;
  menuItemInstance.isSubMenu = isSubMenu;
  menuItemInstance.isActive = !!match;
  const sideMenuMode = menuState.menuModeExpandCollapse;
  const [settingState] = useSettingDataInstance();
  const sideMenuMode2 = settingState.sideMenuMode;

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
    return clsx(menuItemBaseClassName, _className, {
      fairys_admin_menu_sub_menu: isSubMenu,
      [`data-level=${level}`]: true,
      active: !!isActive,
      'fairys:bg-(--fairys-theme-color)': !!isActive,
      'fairys:text-white fairys:dark:text-white': !!isActive,
      'fairys:hover:bg-gray-200/75 fairys:dark:hover:bg-gray-600': !isActive,
    });
  }, [isActive, level, _className, isSubMenu]);

  const titleStyle = useMemo(() => {
    if (sideMenuMode === 'close' || sideMenuMode2 === 'close') {
      return {};
    }
    return {
      paddingLeft: `${level * 20}px`,
    };
  }, [level, sideMenuMode, sideMenuMode2]);

  const onClick: MenuItemProps['onClick'] = async (e) => {
    if (props.disabled) {
      return;
    }
    // 打开浏览器新窗口
    if (item.isOpenNewWindow) {
      window.open(item.path, '_blank');
      return;
    }
    props.onClick?.(e);
    if (isSubMenu) {
      //  如果是父级菜单渲染，则展开子菜单
      menuDataInstance.onToggleItems(item.path);
    } else if (!match) {
      if (typeof item.onBeforeNavigate === 'function') {
        const isBool = await item.onBeforeNavigate(item);
        // 如果为 false 不进行跳转
        if (!isBool) {
          return;
        }
      }
      if (typeof menuDataInstance.onBeforeNavigate === 'function') {
        const isBool = await menuDataInstance.onBeforeNavigate(item);
        // 如果为 false 不进行跳转
        if (!isBool) {
          return;
        }
      }
      navigate(item.path);
      tabBarDataInstance.addItem(item);
      menuDataInstance.updateMainExpandItem(undefined);
      tree.events.emit('click');
    }
  };

  const expandIcon = useMemo(() => {
    return clsx(
      'fairys:relative fairys:ms-1 fairys:w-[10px] fairys:after:bg-current fairys:before:bg-current fairys:after:-translate-y-[1px] fairys:before:-translate-y-[1px]',
      {
        expand: isExpand,
        close: !isExpand,
      },
    );
  }, [isExpand]);

  const iconClassName = useMemo(() => {
    return clsx('fairys:size-[16px]', iconProps?.className, {});
  }, [isExpandCollapse, iconProps?.className]);

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

  const mergeRef = useMergeRefs([menuItemInstance.dom, ref]);

  return (
    <div {...rest} ref={mergeRef} data-level={level} title={item.title} className={menuItemClassName} onClick={onClick}>
      <div className={titleClassName} style={titleStyle}>
        {item.icon ? (
          <span className={iconClassName}>
            <Icon {...iconProps} icon={item.icon} className={iconClassName} />
          </span>
        ) : (
          <Fragment />
        )}
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
});

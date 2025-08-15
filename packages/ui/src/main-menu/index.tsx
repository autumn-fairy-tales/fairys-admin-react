/**
 *  主菜单分为 左侧主菜单 和 顶部主菜单
 */

import clsx from 'clsx';
import { useMemo, Fragment } from 'react';
import { useSetting } from 'context/setting';
import { useLocation, useNavigate } from 'react-router';
import { useMenuData, MenuItemType, menuDataInstance } from 'context/menu-data';
import { Icon } from '@iconify/react';
import { usePopoverInstance, Popover } from 'components/popover';
import { Menu } from 'menu';

export interface MainMenuProps {
  layoutMode?: 'vertical' | 'horizontal';
}

interface MainMenuItemProps extends MainMenuProps {
  item: MenuItemType;
}

const MainMenuItem = (props: MainMenuItemProps) => {
  const { item, layoutMode } = props;
  const location = useLocation();
  const [state, menuInstance] = useMenuData();
  const mainMenuItemSelected = state.mainMenuItemSelected;
  const mainExpandItem = state.mainExpandItem;
  const isActive = mainMenuItemSelected === item.path;
  const [settingState] = useSetting();
  const layoutModeState = settingState.layoutMode;
  const popoverInstance = usePopoverInstance();

  const isExpand = useMemo(() => {
    return mainExpandItem?.path === item.path;
  }, [mainExpandItem, item]);

  const className = useMemo(() => {
    return clsx(
      'fairys_admin_main_menu_item transition-all duration-300 px-[8px] py-[4px] shrink-0 transition-all duration-300 rounded-sm box-border flex items-center cursor-pointer gap-1 dark:text-gray-400',
      {
        active: isActive,
        'bg-[var(--theme-color)]': !!isActive,
        'text-white dark:text-white': isActive,
        'hover:bg-gray-200/75 dark:hover:bg-gray-600': !isActive,
        'flex-col ': layoutMode === 'vertical',
        'flex-row': layoutMode === 'horizontal',
      },
    );
  }, [isActive, layoutMode]);

  const onClickMainMenuItem = () => {
    menuInstance.updateMainExpandItem(item);
    if (!isActive) {
      menuDataInstance.onExpandItems(location.pathname);
      menuInstance.onMainMenu(item.path);
    }
  };

  const iconClassName = useMemo(() => {
    return clsx('', {
      'size-[20px]': layoutMode === 'horizontal',
      'size-[26px]': layoutMode === 'vertical',
    });
  }, [layoutMode]);

  const render = useMemo(() => {
    return (
      <div className={className} onClick={onClickMainMenuItem} title={item.title}>
        {item.icon ? (
          <span className={iconClassName}>
            <Icon icon={item.icon} className={iconClassName} />
          </span>
        ) : (
          <Fragment />
        )}
        <div>{item.title}</div>
      </div>
    );
  }, [className, iconClassName, item, onClickMainMenuItem]);

  if (['main_top_header', 'main_left'].includes(layoutModeState)) {
    return (
      <Popover
        className="fairys_admin_main_menu_popover"
        placement={layoutMode === 'vertical' ? 'right-start' : 'bottom-start'}
        open={isExpand}
        content={<Menu />}
        popoverInstance={popoverInstance}
        onOpenChange={(open) => {
          if (open === false) {
            menuDataInstance.updateMainExpandItem(undefined);
          }
        }}
      >
        {render}
      </Popover>
    );
  }
  return render;
};

const MainMenuItems = (props: MainMenuProps) => {
  const { layoutMode } = props;
  const [state] = useMenuData();
  const mainMenuItems = state.mainMenuItems || [];

  const menuRender = useMemo(() => {
    return mainMenuItems.map((item) => <MainMenuItem layoutMode={layoutMode} item={item} key={item.path} />);
  }, [mainMenuItems, layoutMode]);
  return menuRender;
};

export const MainMenu = (props: MainMenuProps) => {
  const { layoutMode } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [state] = useSetting();

  const mainMenuClassName = useMemo(() => {
    return clsx('fairys_admin_main_menu flex box-border overflow-auto items-center justify-between px-[8px]', {
      'fairys_admin_main_menu_vertical flex-col h-full': layoutMode === 'vertical',
      'fairys_admin_main_menu_horizontal flex-row overflow-auto shrink-0': layoutMode === 'horizontal',
    });
  }, [layoutMode]);

  const mainMenuBodyClassName = useMemo(() => {
    return clsx('fairys_admin_main_menu_body flex-1 w-full overflow-hidden flex gap-2 items-center', {
      'flex-col ': layoutMode === 'vertical',
      'flex-row': layoutMode === 'horizontal',
    });
  }, [layoutMode]);

  const projectNameClassName = useMemo(() => {
    return clsx('fairys_admin_main_menu_body_name cursor-pointer whitespace-nowrap', {
      'overflow-hidden w-full text-ellipsis': layoutMode === 'vertical',
      'px-2': layoutMode === 'horizontal',
    });
  }, [layoutMode]);

  const onClickHome = () => {
    if (location.pathname === '/') {
      return;
    }
    navigate('/');
  };

  const bodyMenusClassName = useMemo(() => {
    return clsx('fairys_admin_main_menu_body_menus flex', {
      'flex-col gap-y-2  w-full': layoutMode === 'vertical',
      'flex-row flex-1 gap-x-2': layoutMode === 'horizontal',
    });
  }, [layoutMode]);

  return (
    <div className={mainMenuClassName}>
      <div className={mainMenuBodyClassName}>
        <div className="fairys_admin_main_menu_body_logo flex items-center justify-center cursor-pointer">
          <img width={48} height={48} src={state.logo} alt={state.projectName} onClick={onClickHome} />
        </div>
        <div className={projectNameClassName} onClick={onClickHome}>
          {state.projectName}
        </div>
        <div className={bodyMenusClassName}>
          <MainMenuItems layoutMode={layoutMode} />
        </div>
      </div>
      <div className="fairys_admin_main_menu_extra">头像部分</div>
    </div>
  );
};

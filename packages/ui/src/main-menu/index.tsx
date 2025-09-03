/**
 *  主菜单分为 左侧主菜单 和 顶部主菜单
 */

import clsx from 'clsx';
import { useMemo, Fragment } from 'react';
import { useSetting } from 'context/setting';
import { useLocation } from 'react-router';
import { useMenuData, MenuItemType, menuDataInstance } from 'context/menu-data';
import { Icon } from '@iconify/react';
import { usePopoverInstance, Popover } from 'components/popover';
import { Menu } from 'menu';
import { Avatar } from 'avatar';
import { Logo } from 'logo';
import { PopoverBaseFloatingTreeParent, PopoverBase } from 'components/popover-base';
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
  const isActive = mainMenuItemSelected === item.path;
  const [settingState] = useSetting();
  const layoutModeState = settingState.layoutMode;

  const className = useMemo(() => {
    return clsx(
      'fairys_admin_main_menu_item fairys:px-[8px] fairys:py-[4px] fairys:shrink-0 fairys:transition-all fairys:duration-300 fairys:rounded-sm fairys:box-border fairys:flex fairys:items-center fairys:cursor-pointer fairys:gap-1 fairys:dark:text-gray-400',
      {
        active: isActive,
        'fairys:bg-(--fairys-theme-color)': !!isActive,
        'fairys:text-white fairys:dark:text-white': isActive,
        'fairys:hover:bg-gray-200/75 fairys:dark:hover:bg-gray-600': !isActive,
        'fairys:flex-col ': layoutMode === 'vertical',
        'fairys:flex-row': layoutMode === 'horizontal',
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
      'fairys:size-[20px]': layoutMode === 'horizontal',
      'fairys:size-[26px]': layoutMode === 'vertical',
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
      <PopoverBase
        className="fairys_admin_main_menu_popover"
        content={<Menu />}
        eventName="hover"
        placement={layoutMode === 'vertical' ? 'right-start' : 'bottom-start'}
        isNotMinWidth
        onOpenChange={(open) => {
          if (open) {
            onClickMainMenuItem();
          }
        }}
      >
        {render}
      </PopoverBase>
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

  return <PopoverBaseFloatingTreeParent>{menuRender}</PopoverBaseFloatingTreeParent>;
};

export const MainMenu = (props: MainMenuProps) => {
  const { layoutMode } = props;
  const [settingState] = useSetting();
  const layoutModeState = settingState.layoutMode;
  const mainMenuClassName = useMemo(() => {
    return clsx(
      'fairys_admin_main_menu fairys:flex fairys:box-border fairys:overflow-auto fairys:items-center fairys:justify-between fairys:px-[8px]',
      {
        'fairys_admin_main_menu_vertical fairys:flex-col fairys:h-full': layoutMode === 'vertical',
        'fairys_admin_main_menu_horizontal fairys:flex-row fairys:overflow-auto fairys:shrink-0':
          layoutMode === 'horizontal',
      },
    );
  }, [layoutMode]);

  const mainMenuBodyClassName = useMemo(() => {
    return clsx(
      'fairys_admin_main_menu_body fairys:flex-1 fairys:w-full fairys:overflow-hidden fairys:flex fairys:gap-2 fairys:items-center fairys:box-border fairys:py-[8px]',
      {
        'fairys:flex-col ': layoutMode === 'vertical',
        'fairys:flex-row': layoutMode === 'horizontal',
      },
    );
  }, [layoutMode]);

  const bodyMenusClassName = useMemo(() => {
    return clsx('fairys_admin_main_menu_body_menus fairys:flex', {
      'fairys:flex-col fairys:gap-y-2 fairys:w-full': layoutMode === 'vertical',
      'fairys:flex-row fairys:flex-1 fairys:gap-x-2': layoutMode === 'horizontal',
    });
  }, [layoutMode]);

  return (
    <div className={mainMenuClassName}>
      <div className={mainMenuBodyClassName}>
        <Logo
          isHeader={layoutMode === 'horizontal'}
          logoSize={layoutMode === 'horizontal' ? 32 : 48}
          mode={layoutMode === 'horizontal' ? 'open' : 'close'}
        />
        {layoutModeState === 'left_header' ? (
          <Fragment />
        ) : (
          <div className={bodyMenusClassName}>
            <MainMenuItems layoutMode={layoutMode} />
          </div>
        )}
      </div>
      <div className="fairys_admin_main_menu_extra">
        <Avatar mode={layoutMode === 'horizontal' ? 'header' : 'sider'} />
      </div>
    </div>
  );
};

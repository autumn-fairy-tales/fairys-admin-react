/**
 *  主菜单分为 左侧主菜单 和 顶部主菜单
 */

import clsx from 'clsx';
import { useMemo, Fragment } from 'react';
import { useSetting } from '../context/setting';
import { useLocation, useNavigate } from 'react-router';
import { useMenuData, MenuItemType } from '../context/menu-data';
import { Icon } from '@iconify/react';

export interface MainMenuProps {
  layoutMode?: 'vertical' | 'horizontal';
}

interface MainMenuItemProps {
  item: MenuItemType;
}

const MainMenuItem = (props: MainMenuItemProps) => {
  const { item } = props;
  const [state, menuInstance] = useMenuData();
  const mainMenuItemSelected = state.mainMenuItemSelected;
  const isActive = mainMenuItemSelected === item.path;

  const className = useMemo(() => {
    return clsx(
      'fairys_admin_main_menu_item px-[8px] py-[4px] shrink-0 transition-all duration-300 rounded-sm box-border flex flex-col items-center cursor-pointer gap-1 dark:text-gray-400',
      {
        active: isActive,
        'bg-blue-500': isActive,
        'text-white dark:text-white': isActive,
        'hover:bg-blue-100 dark:hover:bg-gray-600': !isActive,
      },
    );
  }, [isActive]);

  const onClickMainMenuItem = () => {
    if (!isActive) menuInstance.onMainMenu(item.path);
  };

  return (
    <div className={className} onClick={onClickMainMenuItem}>
      {item.icon ? (
        <span className="size-[26px]">
          <Icon icon={item.icon} className="size-[26px]" />
        </span>
      ) : (
        <Fragment />
      )}
      <div>{item.title}</div>
    </div>
  );
};

const MainMenuItems = () => {
  const [state] = useMenuData();
  const mainMenuItems = state.mainMenuItems || [];
  const menuRender = useMemo(() => {
    return mainMenuItems.map((item) => <MainMenuItem item={item} key={item.path} />);
  }, [mainMenuItems]);
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
      'fairys_admin_main_menu_horizontal flex-row w-full': layoutMode === 'horizontal',
    });
  }, [layoutMode]);

  const mainMenuBodyClassName = useMemo(() => {
    return clsx('fairys_admin_main_menu_body flex-1 w-full overflow-hidden flex gap-2 items-center', {
      'flex-col ': layoutMode === 'vertical',
      'flex-row': layoutMode === 'horizontal',
    });
  }, [layoutMode]);

  const projectNameClassName = useMemo(() => {
    return clsx('fairys_admin_main_menu_body_name overflow-hidden whitespace-nowrap cursor-pointer', {
      'w-full  text-ellipsis': layoutMode === 'vertical',
    });
  }, [layoutMode]);

  const onClickHome = () => {
    if (location.pathname === '/') {
      return;
    }
    navigate('/');
  };

  const bodyMenusClassName = useMemo(() => {
    return clsx('fairys_admin_main_menu_body_menus flex gap-y-2 w-full', {
      'flex-col': layoutMode === 'vertical',
      'flex-row': layoutMode === 'horizontal',
    });
  }, [layoutMode]);

  return (
    <div className={mainMenuClassName}>
      {/* 左侧主菜单 */}
      <div className={mainMenuBodyClassName}>
        <div className="fairys_admin_main_menu_body_logo flex items-center justify-center cursor-pointer">
          <img width={48} height={48} src={state.logo} alt={state.projectName} onClick={onClickHome} />
        </div>
        <div className={projectNameClassName} onClick={onClickHome}>
          {state.projectName}
        </div>
        <div className={bodyMenusClassName}>
          <MainMenuItems />
        </div>
      </div>
      <div className="fairys_admin_main_menu_extra">头像部分</div>
      {/* 顶部主菜单 */}
      {/* <div>
      <div>logo</div>
      <div>项目名</div>
      <div>菜单</div>
    </div>
    <div>头像部分</div> */}
    </div>
  );
};

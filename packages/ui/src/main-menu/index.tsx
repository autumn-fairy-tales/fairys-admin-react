/**
 *  主菜单分为 左侧主菜单 和 顶部主菜单
 */

import clsx from 'clsx';
import { useMemo, Fragment, useCallback } from 'react';
import { useSettingDataInstance } from 'context/setting';
import { useLocation } from 'react-router';
import { useMenuDataInstance, MenuItemType, menuDataInstance } from 'context/menu-data';
import { Menu } from 'menu';
import { Avatar } from 'avatar';
import { Logo } from 'logo';
import { FairysPopoverBaseFloatingTreeParent, FairysPopoverBase } from 'components/popover-base';
import { LayoutMenuMobile } from 'layout/sider';
import { FairysIcon, FairysIconPropsType } from 'components/icon';
import { useAppPluginDataInstance } from 'context';

export interface MainMenuProps {
  layoutMode?: 'vertical' | 'horizontal';
}

interface MainMenuItemProps extends MainMenuProps {
  item: MenuItemType;
}

const MainMenuItem = (props: MainMenuItemProps) => {
  const { item, layoutMode } = props;
  const _className = item.className;
  const location = useLocation();
  const [state, menuInstance] = useMenuDataInstance();
  const mainMenuItemSelected = state.mainMenuItemSelected;
  const isActive = mainMenuItemSelected === item.path;
  const [settingState] = useSettingDataInstance();
  const layoutModeState = settingState.layoutMode;
  const iconProps = item.iconProps as FairysIconPropsType;

  const className = useMemo(() => {
    return clsx(
      'fairys_admin_main_menu_item fairys:px-[8px] fairys:py-[4px] fairys:shrink-0 fairys:transition-all fairys:duration-300 fairys:rounded-sm  fairys:flex fairys:items-center fairys:cursor-pointer fairys:gap-1 fairys:dark:text-gray-400',
      _className,
      {
        active: isActive,
        'fairys:bg-(--fairys-theme-color)': !!isActive,
        'fairys:text-white fairys:dark:text-white': isActive,
        'fairys:hover:bg-gray-200/75 fairys:dark:hover:bg-gray-600': !isActive,
        'fairys:flex-col ': layoutMode === 'vertical',
        'fairys:flex-row': layoutMode === 'horizontal',
      },
    );
  }, [isActive, layoutMode, _className]);

  const onClickMainMenuItem = useCallback(async () => {
    // 打开浏览器新窗口
    if (item.isOpenNewWindow) {
      window.open(item.path, '_blank');
      return;
    }
    if (typeof item.onBeforeNavigate === 'function') {
      const isBool = await item.onBeforeNavigate(item);
      // 如果为 false 不进行跳转
      if (!isBool) {
        return;
      }
    }
    if (typeof menuInstance.onBeforeNavigate === 'function') {
      const isBool = await menuInstance.onBeforeNavigate(item);
      // 如果为 false 不进行跳转
      if (!isBool) {
        return;
      }
    }
    menuInstance.updateMainExpandItem(item);
    if (!isActive) {
      menuDataInstance.onExpandItems(location.pathname);
      menuInstance.onMainMenu(item.path);
    }
  }, [item, isActive, location, menuDataInstance, menuInstance]);

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
            <FairysIcon className={iconClassName} icon={item.icon} iconProps={iconProps} />
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
      <FairysPopoverBase
        className="fairys_admin_main_menu_popover"
        content={<Menu />}
        // eventName="hover"
        placement={layoutMode === 'vertical' ? 'right-start' : 'bottom-start'}
        isNotMinWidth
        onOpenChange={(open) => {
          if (open) {
            onClickMainMenuItem();
          }
        }}
      >
        {render}
      </FairysPopoverBase>
    );
  }
  return render;
};

const MainMenuItems = (props: MainMenuProps) => {
  const { layoutMode } = props;
  const [state] = useMenuDataInstance();
  const mainMenuItems = state.mainMenuItems || [];

  const menuRender = useMemo(() => {
    return mainMenuItems.map((item) => <MainMenuItem layoutMode={layoutMode} item={item} key={item.path} />);
  }, [mainMenuItems, layoutMode]);

  return <FairysPopoverBaseFloatingTreeParent>{menuRender}</FairysPopoverBaseFloatingTreeParent>;
};

export const MainMenu = (props: MainMenuProps) => {
  const { layoutMode } = props;
  const [settingState] = useSettingDataInstance();
  const layoutModeState = settingState.layoutMode;
  const [snapshot] = useAppPluginDataInstance();
  const header = snapshot?.header;
  const mainMenuBottom = snapshot?.['main-menu-bottom'];

  const [menuState] = useMenuDataInstance();
  const mainMenuItems = menuState.mainMenuItems;

  const mainMenuClassName = useMemo(() => {
    return clsx(
      'fairys_admin_main_menu fairys:flex  fairys:overflow-auto fairys:items-center fairys:justify-between fairys:px-[8px]',
      {
        'fairys_admin_main_menu_vertical fairys:flex-col fairys:h-full': layoutMode === 'vertical',
        'fairys_admin_main_menu_horizontal fairys:flex-row fairys:overflow-auto fairys:shrink-0':
          layoutMode === 'horizontal',
      },
    );
  }, [layoutMode]);

  const mainMenuBodyClassName = useMemo(() => {
    return clsx(
      'fairys_admin_main_menu_body fairys:flex-1 fairys:w-full fairys:overflow-hidden fairys:flex fairys:gap-2 fairys:items-center  fairys:py-[8px]',
      {
        'fairys:flex-col ': layoutMode === 'vertical',
        'fairys:flex-row': layoutMode === 'horizontal',
      },
    );
  }, [layoutMode]);

  const bodyMenusClassNameBase = useMemo(() => {
    return clsx('fairys:flex', {
      'fairys:flex-col fairys:gap-y-2 fairys:w-full fairys:items-center': layoutMode === 'vertical',
      'fairys:flex-row fairys:flex-1 fairys:gap-x-2': layoutMode === 'horizontal',
    });
  }, [layoutMode]);

  const bodyMenusClassName = useMemo(() => {
    return clsx('fairys_admin_main_menu_body_menus', bodyMenusClassNameBase);
  }, [bodyMenusClassNameBase]);

  return (
    <div className={mainMenuClassName}>
      {layoutModeState === 'mobile' ? <LayoutMenuMobile /> : <Fragment />}
      <div className={mainMenuBodyClassName}>
        <Logo
          isHeader={layoutMode === 'horizontal'}
          logoSize={layoutMode === 'horizontal' ? 32 : 48}
          mode={layoutMode === 'horizontal' ? 'open' : 'close'}
        />
        {['left_header', 'mobile'].includes(layoutModeState) ? (
          <Fragment />
        ) : (
          <div className={bodyMenusClassName}>
            {mainMenuItems?.length ? <MainMenuItems layoutMode={layoutMode} /> : <Fragment />}
          </div>
        )}
      </div>
      <div className="fairys_admin_main_menu_body_menus_bottom">{mainMenuBottom?.render || <Fragment />}</div>
      {layoutMode === 'horizontal' && header?.render ? header?.render : <Fragment />}
      <div className="fairys_admin_main_menu_extra">
        <Avatar mode={layoutMode === 'horizontal' ? 'header' : 'sider'} />
      </div>
    </div>
  );
};

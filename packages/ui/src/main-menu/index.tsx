/**
 *  主菜单分为 左侧主菜单 和 顶部主菜单
 */

import clsx from 'clsx';
import { useMemo, Fragment, useCallback } from 'react';
import { useSettingDataInstance } from 'context/setting';
import { useMenuDataInstance, MenuItemType, menuDataInstance } from 'context/menu-data';
import { Avatar } from 'avatar';
import { Logo } from 'logo';
import { LayoutMenuMobile } from 'layout/sider';
import { routerDataInstance, useAppPluginDataInstance, tabBarDataInstance } from 'context';
import { FairysMenu } from 'components/menu';
import type { FairysMenuProps } from 'components/menu';

export interface MainMenuProps {
  layoutMode?: 'vertical' | 'horizontal';
}

const MainMenuItems = (props: MainMenuProps) => {
  const { layoutMode } = props;
  const [state, menuInstance] = useMenuDataInstance();
  const mainMenuItems = state.mainMenuItems || [];
  const [settingState] = useSettingDataInstance();
  const layoutModeState = settingState.layoutMode;

  const onClickItem = useCallback(
    async (item: MenuItemType) => {
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
      if (typeof menuDataInstance.onBeforeNavigate === 'function') {
        const isBool = await menuDataInstance.onBeforeNavigate(item);
        // 如果为 false 不进行跳转
        if (!isBool) {
          return;
        }
      }
      routerDataInstance.navigate(item.path);
      tabBarDataInstance.addItem(item as any);
    },
    [menuDataInstance],
  );

  const onClickSubItem = useCallback(
    async (item: MenuItemType) => {
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
      menuInstance.onMainMenu(item.path);
    },
    [menuInstance],
  );

  const propsConfig: FairysMenuProps = useMemo(() => {
    if (layoutModeState === 'main_left') {
      return {
        collapsed: true,
        firstGroupMode: 'hover',
        firstLevelSize: 'large',
      };
    } else if (layoutModeState === 'main_sub_left') {
      return {
        collapsed: true,
        firstGroupMode: 'onlyGroup',
        firstLevelSize: 'large',
      };
    } else if (layoutModeState === 'main_top_header') {
      return {
        mode: 'horizontal',
        firstGroupMode: 'hover',
        firstLevelSize: 'small',
      };
    }
    if (layoutModeState === 'main_top_sub_left_header') {
      return {
        mode: 'horizontal',
        firstGroupMode: 'onlyGroup',
        firstLevelSize: 'small',
      };
    }
    return {};
  }, [layoutModeState]);

  return (
    <FairysMenu
      {...propsConfig}
      activeMotionPrefixCls="fairys-main-menu-item-active"
      selectedKey={state.mainMenuItemSelected}
      items={mainMenuItems}
      mode={layoutMode}
      onClickItem={onClickItem}
      onClickSubItem={onClickSubItem}
      onClickGroupItem={(item: MenuItemType) => {
        if (layoutModeState === 'main_left' || layoutModeState === 'main_top_header') {
          return;
        }
        onClickSubItem(item);
      }}
      maxWidth={220}
    />
  );
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
      'fairys_admin_main_menu_body fairys:flex-1 fairys:w-full fairys:overflow-hidden fairys:flex fairys:gap-2 fairys:items-center fairys:py-[8px]',
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

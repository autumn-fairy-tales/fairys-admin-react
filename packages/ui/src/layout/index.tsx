import { Fragment, useMemo } from 'react';
import { useSetting } from 'context/setting';
import clsx from 'clsx';
import { LayoutContent } from './content';
import { LayoutHeader } from './header';
import { LayoutSider } from './sider';
import { useLocation } from 'react-router';
import { menuDataInstance } from 'context/menu-data';
import { DarkModeInstanceContextProvider } from 'context/dark-mode';
import { SettingDrawer } from 'setting';

export const Layout = () => {
  const [state] = useSetting();
  /**
   * 1. main_sub_left:左侧主菜单 + 子菜单 + 无头部信息
   * 2. main_left:左侧主菜单 + 移入子菜单展示 + 无头部信息
   * // 3. main_left_sub_all:左侧主菜单 + 移入子菜单展示所有  + 无头部信息
   * 4. main_top_header:顶部菜单 +  移入子菜单展示 + 有头部信息
   * // 5. main_top_sub_all_header:顶部菜单 +  移入子菜单展示所有 + 有头部信息
   * 6. main_top_sub_left_header:顶部主菜单 + 侧边子菜单 + 有头部信息
   * 7. left:不区分主子菜单并且左侧显示 + 无头部信息(用户信息一起移入左侧显示)
   * 8. left_top_header:不区分主子菜单并且左侧显示 + 有头部信息
   */
  const layoutMode = state.layoutMode;
  const sideMenuMode = state.sideMenuMode;
  const theme = state.theme;
  const location = useLocation();

  useMemo(() => {
    menuDataInstance.updateChildMenus(location.pathname);
    if (sideMenuMode !== 'close') {
      menuDataInstance.onExpandItems(location.pathname);
    } else {
      menuDataInstance.clearExpandItems();
    }
  }, [location.pathname, sideMenuMode]);

  const isShowHeader = useMemo(() => {
    return ['main_top_header', 'main_top_sub_left_header', 'left_top_header'].includes(`${layoutMode}`);
  }, [layoutMode]);

  const isShowSider = useMemo(() => {
    return ['main_sub_left', 'main_left', 'left', 'main_top_sub_left_header', 'left_top_header'].includes(
      `${layoutMode}`,
    );
  }, [layoutMode]);

  const isSiderFull = useMemo(() => {
    return ['main_sub_left', 'main_left', 'left'].includes(`${layoutMode}`);
  }, [layoutMode]);

  const layoutCls = useMemo(() => {
    return clsx('fairys_admin_layout transition-all duration-300 overflow-hidden w-full h-full flex box-border ', {
      [`fairys_admin_layout_${layoutMode}`]: !!layoutMode,
      'flex-col': !isSiderFull,
      'flex-row': isSiderFull,
      [theme]: true,
    });
  }, [layoutMode, isSiderFull, theme]);

  const headerRender = useMemo(() => {
    return isShowHeader ? <LayoutHeader /> : null;
  }, [isShowHeader]);

  const siderRender = useMemo(() => {
    return isShowSider ? <LayoutSider /> : null;
  }, [isShowSider]);

  const contentRender = useMemo(() => {
    return <LayoutContent />;
  }, []);

  return (
    <DarkModeInstanceContextProvider darkMode={theme === 'dark'}>
      <div className={layoutCls}>
        {isSiderFull ? (
          <Fragment>
            {isShowSider ? (
              <div className="fairys_admin_layout_sider overflow-hidden h-full box-border ">{siderRender}</div>
            ) : (
              <Fragment />
            )}
            <div className="fairys_admin_layout_main overflow-hidden flex flex-col flex-1 h-full box-border">
              {isShowHeader ? (
                <div className="fairys_admin_layout_main_header overflow-hidden w-full box-border">{headerRender}</div>
              ) : (
                <Fragment />
              )}
              <div className="fairys_admin_layout_main_content overflow-hiddenflex-1 w-full box-border">
                {contentRender}
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {isShowHeader ? (
              <div className="fairys_admin_layout_header overflow-hidden w-full box-border ">{headerRender}</div>
            ) : (
              <Fragment />
            )}
            <div className="fairys_admin_layout_main overflow-hidden flex flex-row flex-1 w-full box-border">
              {isShowSider ? (
                <div className="fairys_admin_layout_main_sider overflow-hidden h-full box-border">{siderRender}</div>
              ) : (
                <Fragment />
              )}
              <div className="fairys_admin_layout_main_content overflow-hidden flex-1 h-full box-border">
                {contentRender}
              </div>
            </div>
          </Fragment>
        )}
      </div>
      <SettingDrawer />
    </DarkModeInstanceContextProvider>
  );
};

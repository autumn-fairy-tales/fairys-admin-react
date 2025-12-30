import { Fragment, useEffect, useMemo } from 'react';
import { useSettingDataInstance } from 'context/setting';
import clsx from 'clsx';
import { LayoutContent } from './content';
import { LayoutHeader } from './header';
import { LayoutSider } from './sider';
import { useLocation } from 'react-router';
import { menuDataInstance } from 'context/menu-data';
import { DarkModeInstanceContextProvider } from 'context/dark-mode';
import { SettingDrawer } from 'setting';

export const Layout = () => {
  const [state, settingDataInstance] = useSettingDataInstance();
  /**
   * 1. main_sub_left:左侧主菜单 + 子菜单 + 无头部信息
   * 2. main_left:左侧主菜单 + 移入子菜单展示 + 无头部信息
   * // 3. main_left_sub_all:左侧主菜单 + 移入子菜单展示所有  + 无头部信息
   * 4. main_top_header:顶部菜单 +  移入子菜单展示 + 有头部信息
   * // 5. main_top_sub_all_header:顶部菜单 +  移入子菜单展示所有 + 有头部信息
   * 6. main_top_sub_left_header:顶部主菜单 + 侧边子菜单 + 有头部信息
   * 7. left:不区分主子菜单并且左侧显示 + 无头部信息(用户信息一起移入左侧显示)
   * 8. left_header:不区分主子菜单并且左侧显示 + 有头部信息
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

  useEffect(settingDataInstance.autoListenScreen, []);

  const isShowHeader = useMemo(() => {
    return ['main_top_header', 'main_top_sub_left_header', 'left_header', 'mobile'].includes(`${layoutMode}`);
  }, [layoutMode]);

  const isShowSider = useMemo(() => {
    return ['main_sub_left', 'main_left', 'left', 'main_top_sub_left_header', 'left_header'].includes(`${layoutMode}`);
  }, [layoutMode]);

  const isSiderFull = useMemo(() => {
    return ['main_sub_left', 'main_left', 'left'].includes(`${layoutMode}`);
  }, [layoutMode]);

  const layoutCls = useMemo(() => {
    return clsx(
      'fairys_admin_layout fairys:bg-modal fairys:transition-all fairys:duration-300 fairys:overflow-hidden fairys:w-full fairys:h-full fairys:flex  ',
      {
        [`fairys_admin_layout_${layoutMode}`]: !!layoutMode,
        'fairys:flex-col': !isSiderFull,
        'fairys:flex-row': isSiderFull,
        [theme]: true,
      },
    );
  }, [layoutMode, isSiderFull, theme]);

  return (
    <DarkModeInstanceContextProvider theme={theme}>
      <div className={layoutCls} data-theme={theme}>
        {isSiderFull ? (
          <Fragment>
            {isShowSider ? (
              <div className="fairys_admin_layout_sider fairys:overflow-hidden fairys:h-full  ">
                <LayoutSider />
              </div>
            ) : (
              <Fragment />
            )}
            <div className="fairys_admin_layout_main fairys:overflow-hidden fairys:flex fairys:flex-col fairys:flex-1 fairys:h-full ">
              {isShowHeader ? (
                <div className="fairys_admin_layout_main_header fairys:overflow-hidden fairys:w-full ">
                  <LayoutHeader />
                </div>
              ) : (
                <Fragment />
              )}
              <div className="fairys_admin_layout_main_content fairys:overflow-hidden fairys:flex-1 fairys:w-full ">
                <LayoutContent />
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {isShowHeader ? (
              <div className="fairys_admin_layout_header fairys:overflow-hidden fairys:w-full  ">
                <LayoutHeader />
              </div>
            ) : (
              <Fragment />
            )}
            <div className="fairys_admin_layout_main fairys:overflow-hidden fairys:flex fairys:flex-row fairys:flex-1 fairys:w-full ">
              {isShowSider ? (
                <div className="fairys_admin_layout_main_sider fairys:overflow-hidden fairys:h-full ">
                  <LayoutSider />
                </div>
              ) : (
                <Fragment />
              )}
              <div className="fairys_admin_layout_main_content fairys:overflow-hidden fairys:flex-1 fairys:h-full ">
                <LayoutContent />
              </div>
            </div>
          </Fragment>
        )}
      </div>
      <SettingDrawer />
    </DarkModeInstanceContextProvider>
  );
};

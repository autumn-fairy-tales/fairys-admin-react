import { Menu } from 'menu';
import { MainMenu } from 'main-menu';
import { useSetting } from 'context/setting';
import { Fragment, useMemo } from 'react';
import clsx from 'clsx';
import { DarkModeInstanceContextProvider } from 'context/dark-mode';

const LayoutSiderMainMenu = () => {
  const [state] = useSetting();
  const layoutMode = state.layoutMode;

  const isShow = useMemo(() => {
    return ['main_sub_left', 'main_left_sub_all', 'main_left'].includes(layoutMode);
  }, [layoutMode]);
  // 判断是否显示
  if (!isShow) {
    return <Fragment />;
  }
  return (
    <div className="border-r border-gray-200 h-full dark:border-gray-800! transition-all duration-300 w-[80px] overflow-hidden">
      <MainMenu layoutMode="vertical" />
    </div>
  );
};

export const LayoutSider = () => {
  const [state, settingInstance] = useSetting();
  const sideMenuMode = state.sideMenuMode;
  const layoutMode = state.layoutMode;
  const darkMode = state.darkMenu;
  const theme = state.theme;
  const _darkMode = darkMode || theme === 'dark';

  const hideSideMenu = useMemo(() => {
    return ['main_left'].includes(layoutMode);
  }, [layoutMode]);

  const bodyClassName = useMemo(() => {
    return clsx(
      'flex flex-col h-full border-r border-gray-200 dark:border-gray-800! transition-all duration-300 dark:text-gray-400 overflow-hidden',
      {
        'w-[60px]': sideMenuMode === 'close',
        'w-[220px]': sideMenuMode !== 'close',
      },
    );
  }, [sideMenuMode]);

  const render = useMemo(() => {
    if (hideSideMenu) {
      return <Fragment />;
    }
    return (
      <div className={bodyClassName}>
        <div>hhhhh</div>
        <div className="fairys_admin_layout_sider_menu flex-1 overflow-hidden">
          <Menu />
        </div>
        <div>
          <button
            onClick={() => {
              settingInstance.updated({ sideMenuMode: sideMenuMode === 'close' ? 'open' : 'close' });
            }}
          >
            切换
          </button>
        </div>
      </div>
    );
  }, [bodyClassName, sideMenuMode, hideSideMenu]);

  const clssName = useMemo(() => {
    return clsx(
      'fairys_admin_layout_sider transition-all duration-300 flex flex-row h-full dark:text-gray-400 dark:bg-gray-900!',
      {
        dark: _darkMode,
      },
    );
  }, [_darkMode]);

  return (
    <DarkModeInstanceContextProvider darkMode={_darkMode}>
      <div className={clssName}>
        <LayoutSiderMainMenu />
        {render}
      </div>
    </DarkModeInstanceContextProvider>
  );
};

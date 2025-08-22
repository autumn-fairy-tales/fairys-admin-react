import { Menu } from 'menu';
import { MainMenu } from 'main-menu';
import { useSetting } from 'context/setting';
import { Fragment, useMemo } from 'react';
import clsx from 'clsx';
import { DarkModeInstanceContextProvider } from 'context/dark-mode';
import { Avatar } from 'avatar';
import { ButtonBase } from 'components/button';
import { Logo } from 'logo';

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

const LayoutSubSider = () => {
  const [state, settingInstance] = useSetting();
  const sideMenuMode = state.sideMenuMode;
  const layoutMode = state.layoutMode;
  const bodyClassName = useMemo(() => {
    return clsx(
      'flex flex-col h-full border-r border-gray-200 dark:border-gray-800! transition-all duration-300 dark:text-gray-400 overflow-hidden',
      {
        'w-[60px]': sideMenuMode === 'close',
        'w-[220px]': sideMenuMode !== 'close',
      },
    );
  }, [sideMenuMode]);

  const avatarRender = useMemo(() => {
    if (layoutMode === 'left') return <Avatar mode="sider" nameMode={sideMenuMode === 'open' ? 'show' : 'node'} />;
    return <Fragment />;
  }, [sideMenuMode]);

  const iconClassName = useMemo(() => {
    return clsx('size-[20px]', {
      'icon-[ant-design--menu-fold-outlined]': sideMenuMode === 'open',
      'icon-[ant-design--menu-unfold-outlined]': sideMenuMode === 'close',
    });
  }, [sideMenuMode]);

  const headerRender = useMemo(() => {
    if (layoutMode === 'main_sub_left' || layoutMode === 'left')
      return (
        <div className="box-border border-b border-gray-200 dark:border-gray-800">
          <Logo
            isOnlyName={layoutMode === 'main_sub_left'}
            logoSize={32}
            className="mx-[8px] my-[8px] box-border"
            mode={sideMenuMode === 'open' ? 'open' : 'close'}
          />
        </div>
      );
    return <Fragment />;
  }, [layoutMode, sideMenuMode]);

  return (
    <div className={bodyClassName}>
      {headerRender}
      <div className="fairys_admin_layout_sider_menu flex-1 overflow-hidden">
        <Menu />
      </div>
      <div className="flex flex-col border-t border-gray-200 dark:border-gray-800 ">
        <div
          className={`flex ${sideMenuMode === 'close' ? 'justify-center' : 'justify-end'} ${
            layoutMode === 'left' ? ' mt-[8px]' : 'my-[8px]'
          } items-center box-border mx-[8px] cursor-pointer`}
        >
          <ButtonBase
            title={sideMenuMode === 'close' ? '打开菜单' : '关闭菜单'}
            isBg
            onClick={() => {
              settingInstance.updated({ sideMenuMode: sideMenuMode === 'close' ? 'open' : 'close' });
            }}
          >
            <span className={iconClassName} />
          </ButtonBase>
        </div>
        {avatarRender}
      </div>
    </div>
  );
};

export const LayoutSider = () => {
  const [state] = useSetting();
  const layoutMode = state.layoutMode;
  const darkMode = state.darkMenu;
  const theme = state.theme;
  const _darkMode = darkMode || theme === 'dark';
  const hideSideMenu = useMemo(() => {
    return ['main_left'].includes(layoutMode);
  }, [layoutMode]);

  const render = useMemo(() => {
    if (hideSideMenu) {
      return <Fragment />;
    }
    return <LayoutSubSider />;
  }, [hideSideMenu]);

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

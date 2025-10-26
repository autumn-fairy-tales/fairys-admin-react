import { Menu } from 'menu';
import { MainMenu } from 'main-menu';
import { useSettingDataInstance } from 'context/setting';
import { Fragment, memo, useMemo } from 'react';
import clsx from 'clsx';
import { DarkModeInstanceContextProvider } from 'context/dark-mode';
import { Avatar } from 'avatar';
import { FairysButtonBase } from 'components/button';
import { Logo } from 'logo';
import { FairysPopoverBase } from 'components/popover-base';
import { appPluginDataInstance } from 'context';

const LayoutSiderMainMenu = () => {
  const [state] = useSettingDataInstance();
  const layoutMode = state.layoutMode;

  const isShow = useMemo(() => {
    return ['main_sub_left', 'main_left'].includes(layoutMode);
  }, [layoutMode]);
  // 判断是否显示
  if (!isShow) {
    return <Fragment />;
  }
  return (
    <div className="fairys:border-r fairys:border-gray-200 fairys:h-full fairys:dark:border-gray-800! fairys:transition-all fairys:duration-300 fairys:w-[80px] fairys:overflow-hidden">
      <MainMenu layoutMode="vertical" />
    </div>
  );
};

const LayoutSubSider = () => {
  const [state, settingDataInstance] = useSettingDataInstance();
  const childMenuBottom = appPluginDataInstance.appPlugins['child-menu-bottom'];
  const mainMenuBottom = appPluginDataInstance.appPlugins['main-menu-bottom'];

  const sideMenuMode = state.sideMenuMode;
  const layoutMode = state.layoutMode;
  const bodyClassName = useMemo(() => {
    return clsx(
      'fairys:flex fairys:flex-col fairys:h-full fairys:border-r fairys:border-gray-200 fairys:dark:border-gray-800! fairys:transition-all fairys:duration-300 fairys:dark:text-gray-400 fairys:overflow-hidden',
      {
        'fairys:w-[60px]': sideMenuMode === 'close',
        'fairys:w-[220px]': sideMenuMode !== 'close',
      },
    );
  }, [sideMenuMode]);

  const avatarRender = useMemo(() => {
    if (layoutMode === 'left')
      return (
        <Fragment>
          {mainMenuBottom?.render || <Fragment />}
          <Avatar mode="sider" nameMode={sideMenuMode === 'open' ? 'show' : 'node'} />
        </Fragment>
      );
    return <Fragment />;
  }, [sideMenuMode]);

  const iconClassName = useMemo(() => {
    return clsx('fairys:size-[20px]', {
      'fairys:icon-[ant-design--menu-fold-outlined]': sideMenuMode === 'open',
      'fairys:icon-[ant-design--menu-unfold-outlined]': sideMenuMode === 'close',
    });
  }, [sideMenuMode]);

  const headerRender = useMemo(() => {
    if (layoutMode === 'main_sub_left' || layoutMode === 'left')
      return (
        <div className=" fairys:border-b fairys:border-gray-200 fairys:dark:border-gray-800">
          <Logo
            isOnlyName={layoutMode === 'main_sub_left'}
            logoSize={32}
            className="fairys:mx-[8px] fairys:my-[8px] "
            mode={sideMenuMode === 'open' ? 'open' : 'close'}
          />
        </div>
      );
    return <Fragment />;
  }, [layoutMode, sideMenuMode]);

  return (
    <div className={bodyClassName}>
      {headerRender}
      <div className="fairys_admin_layout_sider_menu fairys:flex-1 fairys:overflow-hidden">
        <Menu />
      </div>
      <div className="fairys:flex fairys:flex-col fairys:border-t fairys:border-gray-200 fairys:dark:border-gray-800">
        {childMenuBottom?.['top-render'] || <Fragment />}
        <div
          className={`fairys:flex ${sideMenuMode === 'close' ? 'fairys:justify-center' : 'fairys:justify-end'} ${
            layoutMode === 'left' ? ' fairys:mt-[8px]' : 'fairys:my-[8px]'
          } fairys:items-center  fairys:mx-[8px] fairys:cursor-pointer`}
        >
          <FairysButtonBase
            title={sideMenuMode === 'close' ? '打开菜单' : '关闭菜单'}
            isBg
            onClick={() => {
              settingDataInstance.updated({ sideMenuMode: sideMenuMode === 'close' ? 'open' : 'close' });
            }}
          >
            <span className={iconClassName} />
          </FairysButtonBase>
        </div>
        {childMenuBottom?.['bottom-render'] || <Fragment />}
        {avatarRender}
      </div>
    </div>
  );
};

export const LayoutSider = memo(() => {
  const [state] = useSettingDataInstance();
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
      'fairys_admin_layout_sider fairys:transition-all fairys:duration-300 fairys:flex fairys:flex-row fairys:h-full fairys:dark:text-gray-400 fairys:dark:bg-gray-900!',
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
});

export const LayoutMenuMobile = () => {
  return (
    <FairysPopoverBase content={<Menu />} placement="bottom-end">
      <FairysButtonBase className="fairys_admin_layout_menu_mobile_btn fairys:relative">
        <span className="fairys:icon-[ant-design--appstore-outlined] fairys:size-[18px] fairys:text-[var(--fairys-theme-color)]" />
      </FairysButtonBase>
    </FairysPopoverBase>
  );
};

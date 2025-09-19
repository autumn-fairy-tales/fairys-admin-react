import { Breadcrumb } from 'breadcrumb';
import { useSetting } from 'context/setting';
import { Fragment, useMemo, useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { FairysButtonBase } from 'components/button';
import { MenuSearch } from './menu-search';
import { appPluginDataInstance } from 'context/app-plugins-data';
import { appDataInstance } from 'context/app-data';
import { useLocation } from 'react-router-dom';
import { NotificationBtn } from './notification';
import { FavoritesBtn } from './favorites';

const MenuDarkLight = () => {
  const [state, settingInstance] = useSetting();
  const theme = state.theme;

  const onToggleTheme = () => {
    settingInstance.updated({
      theme: theme === 'dark' ? 'light' : 'dark',
    });
    settingInstance.onToggleAutoListenSystemTheme(false);
  };

  const className = useMemo(() => {
    return clsx('fairys:size-[18px]', {
      'fairys:icon-[ant-design--moon-outlined]': theme !== 'dark',
      'fairys:icon-[ant-design--sun-outlined]': theme === 'dark',
    });
  }, [theme]);

  return (
    <FairysButtonBase className="fairys_admin_tool_bar_dark_light" onClick={onToggleTheme}>
      <span className={className} />
    </FairysButtonBase>
  );
};

const FairysFullScreen = () => {
  const [state, settingInstance] = useSetting();
  const isFullScreen = state.isFullScreen;

  useEffect(settingInstance.addEventListenerFullscreenChange, []);

  const className = useMemo(() => {
    return clsx('fairys:size-[18px]', {
      'fairys:icon-[ant-design--fullscreen-outlined]': !isFullScreen,
      'fairys:icon-[ant-design--fullscreen-exit-outlined]': isFullScreen,
    });
  }, [isFullScreen]);

  return (
    <FairysButtonBase className="fairys_admin_tool_bar_full_screen" onClick={settingInstance.onToggleFullScreen}>
      <span className={className} />
    </FairysButtonBase>
  );
};

const Reload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const timer = useRef<NodeJS.Timeout>();
  const location = useLocation();

  const onClick = () => {
    appDataInstance.aliveController?.refreshScope?.(location.pathname);
    setIsLoading(true);
    timer.current = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(timer.current);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <FairysButtonBase className="fairys_admin_tool_bar_reload" onClick={onClick}>
      <span
        className={clsx('fairys-icon fairys:icon-[ant-design--sync-outlined] fairys:size-[18px]', {
          'fairys-spin': isLoading,
        })}
      />
    </FairysButtonBase>
  );
};

export const ToolBar = () => {
  const plugin = appPluginDataInstance.appPlugins?.['toolBar-right'];
  const [state] = useSetting();
  const enableToolBarFavorites = state.enableToolBarFavorites;
  const enableToolBarNotification = state.enableToolBarNotification;
  const enableToolBarFullScreen = state.enableToolBarFullScreen;
  const enableToolBarRefresh = state.enableToolBarRefresh;

  const rightRender = useMemo(() => {
    if (plugin?.override) {
      return plugin?.override([
        <MenuSearch key="menu-search" />,
        <FavoritesBtn key="menu-favorites" />,
        <NotificationBtn key="menu-notification" />,
        <FairysFullScreen key="menu-full-screen" />,
        <Reload key="menu-reload" />,
        <MenuDarkLight key="menu-dark-light" />,
      ]);
    }
    return (
      <Fragment>
        <MenuSearch key="menu-search" />
        {enableToolBarFavorites ? <FavoritesBtn key="menu-favorites" /> : <Fragment />}
        {enableToolBarNotification ? <NotificationBtn key="menu-notification" /> : <Fragment />}
        {enableToolBarFullScreen ? <FairysFullScreen key="menu-full-screen" /> : <Fragment />}
        {enableToolBarRefresh ? <Reload key="menu-reload" /> : <Fragment />}
        {plugin?.render ? plugin?.render : <Fragment />}
        <MenuDarkLight key="menu-dark-light" />
      </Fragment>
    );
  }, [plugin, enableToolBarFavorites, enableToolBarNotification, enableToolBarFullScreen, enableToolBarRefresh]);

  return (
    <div className="fairys_admin_tool_bar fairys:transition-all fairys:duration-300 fairys:overflow-hidden fairys:w-full fairys:flex fairys:flex-row fairys:items-center fairys:px-[8px] fairys:border-b fairys:border-gray-200 fairys:dark:border-gray-800">
      <div className="fairys_admin_tool_bar_left">
        <Breadcrumb />
      </div>
      <div className="fairys_admin_tool_bar_body fairys:overflow-auto fairys:flex fairys:flex-row fairys:flex-1"></div>
      <div className="fairys_admin_tool_bar_right fairys:flex fairys:items-center fairys:gap-2 fairys:dark:text-gray-200 fairys:pr-[2px]">
        {rightRender}
      </div>
    </div>
  );
};

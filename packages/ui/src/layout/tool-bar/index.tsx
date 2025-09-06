import { Breadcrumb } from 'breadcrumb';
import { useSetting } from 'context/setting';
import { Fragment, useMemo, useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { ButtonBase } from 'components/button';
import { MenuSearch } from './menu-search';
import { appPluginDataInstance } from 'context/app-plugins-data';
import { appDataInstance } from 'context/app-data';
import { useLocation } from 'react-router-dom';

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
    return clsx('fairys:size-[16px]', {
      'fairys:icon-[ant-design--moon-outlined]': theme !== 'dark',
      'fairys:icon-[ant-design--sun-outlined]': theme === 'dark',
    });
  }, [theme]);

  return (
    <ButtonBase className="fairys_admin_tool_bar_dark_light" onClick={onToggleTheme}>
      <span className={className} />
    </ButtonBase>
  );
};

const FullScreen = () => {
  const [state, settingInstance] = useSetting();
  const isFullScreen = state.isFullScreen;

  useEffect(settingInstance.addEventListenerFullscreenChange, []);

  const className = useMemo(() => {
    return clsx('fairys:size-[16px]', {
      'fairys:icon-[ant-design--fullscreen-outlined]': !isFullScreen,
      'fairys:icon-[ant-design--fullscreen-exit-outlined]': isFullScreen,
    });
  }, [isFullScreen]);

  return (
    <ButtonBase className="fairys_admin_tool_bar_full_screen" onClick={settingInstance.onToggleFullScreen}>
      <span className={className} />
    </ButtonBase>
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
    <ButtonBase className="fairys_admin_tool_bar_reload" onClick={onClick}>
      <span className={clsx('fairys-icon fairys:icon-[ant-design--sync-outlined]', { 'fairys-spin': isLoading })} />
    </ButtonBase>
  );
};

export const ToolBar = () => {
  const plugin = appPluginDataInstance.appPlugins?.['toolBar-right'];
  const rightRender = useMemo(() => {
    if (plugin?.override) {
      return plugin?.override([
        <MenuSearch key="menu-search" />,
        <FullScreen key="menu-full-screen" />,
        <Reload key="menu-reload" />,
        <MenuDarkLight key="menu-dark-light" />,
      ]);
    }
    return (
      <Fragment>
        <MenuSearch key="menu-search" />
        <FullScreen key="menu-full-screen" />
        <Reload key="menu-reload" />
        {plugin?.render ? plugin?.render : <Fragment />}
        <MenuDarkLight key="menu-dark-light" />
      </Fragment>
    );
  }, [plugin]);

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

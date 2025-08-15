import { MainMenu } from '../../main-menu';
import { DarkModeInstanceContext, useDarkModeInstance } from '../../context/dark-mode';
import { useSetting } from '../../context/setting';
import { useEffect, useMemo } from 'react';
import clsx from 'clsx';
export const LayoutHeader = () => {
  const [state] = useSetting();
  const darkModeInstance = useDarkModeInstance();
  const theme = state.theme;

  const headerCls = useMemo(() => {
    return clsx('fairys_admin_layout_header h-[48px] border-b border-gray-200 dark:border-gray-800', {
      [theme]: true,
    });
  }, [theme]);

  useEffect(() => {
    darkModeInstance.setDarkMode(theme === 'dark');
  }, [theme, darkModeInstance]);

  return (
    <DarkModeInstanceContext.Provider value={darkModeInstance}>
      <div className={headerCls}>
        <MainMenu layoutMode="horizontal" />
      </div>
    </DarkModeInstanceContext.Provider>
  );
};

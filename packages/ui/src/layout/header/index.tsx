import { MainMenu } from '../../main-menu';
import { DarkModeInstanceContextProvider } from '../../context/dark-mode';
import { useSetting } from '../../context/setting';
import { useMemo } from 'react';
import clsx from 'clsx';
export const LayoutHeader = () => {
  const [state] = useSetting();
  const theme = state.theme;

  const headerCls = useMemo(() => {
    return clsx('fairys_admin_layout_header h-[48px] border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900!', {
      [theme]: true,
    });
  }, [theme]);

  return (
    <DarkModeInstanceContextProvider darkMode={theme === 'dark'}>
      <div className={headerCls}>
        <MainMenu layoutMode="horizontal" />
      </div>
    </DarkModeInstanceContextProvider>
  );
};

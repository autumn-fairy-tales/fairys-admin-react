import { MainMenu } from 'main-menu';
import { DarkModeInstanceContextProvider } from 'context/dark-mode';
import { useSettingDataInstance } from 'context/setting';
import { memo, useMemo } from 'react';
import clsx from 'clsx';
import { UtilsColor } from 'utils/utils.color';

export const LayoutHeader = memo(() => {
  const [state] = useSettingDataInstance();
  const theme = state.theme;

  const headerCls = useMemo(() => {
    return clsx(
      'fairys_admin_layout_header fairys:transition-all fairys:duration-300 fairys:h-[48px] fairys:border-b  fairys:dark:bg-gray-900!',
      {
        [UtilsColor.otherBorderClassNameBase]: true,
        [theme]: true,
      },
    );
  }, [theme]);

  return (
    <DarkModeInstanceContextProvider darkMode={theme === 'dark'}>
      <div className={headerCls}>
        <MainMenu layoutMode="horizontal" />
      </div>
    </DarkModeInstanceContextProvider>
  );
});

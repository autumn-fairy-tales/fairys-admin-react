import { Breadcrumb } from 'breadcrumb';
import { useSetting } from 'context/setting';
import { useMemo } from 'react';
import clsx from 'clsx';
import { ButtonBase } from 'components/button';
import { MenuSearch } from './menu-search';

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
    return clsx('size-[16px]', {
      'icon-[ant-design--moon-outlined]': theme !== 'dark',
      'icon-[ant-design--sun-outlined]': theme === 'dark',
    });
  }, [theme]);

  return (
    <ButtonBase className="fairys_admin_tool_bar_dark_light" onClick={onToggleTheme}>
      <span className={className} />
    </ButtonBase>
  );
};

export const ToolBar = () => {
  return (
    <div className="fairys_admin_tool_bar transition-all duration-300 overflow-hidden w-full flex flex-row items-center px-[8px] border-b border-gray-200 dark:border-gray-800">
      <div className="fairys_admin_tool_bar_left">
        <Breadcrumb />
      </div>
      <div className="fairys_admin_tool_bar_body overflow-auto flex flex-row flex-1"></div>
      <div className="fairys_admin_tool_bar_right flex items-center gap-2 dark:text-gray-200 pr-[2px]">
        <MenuSearch />
        <MenuDarkLight />
      </div>
    </div>
  );
};

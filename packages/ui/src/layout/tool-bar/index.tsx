import { Breadcrumb } from 'breadcrumb';
import { useSetting } from 'context/setting';
import { useMemo } from 'react';
import clsx from 'clsx';
import { ButtonBase } from 'button';

const MenuDarkLight = () => {
  const [state, settingInstance] = useSetting();
  const theme = state.theme;

  const onToggleTheme = () => {
    settingInstance.updated({
      theme: theme === 'dark' ? 'light' : 'dark',
    });
  };

  const className = useMemo(() => {
    return clsx('', {
      'icon-[ant-design--moon-outlined]': theme !== 'dark',
      'icon-[ant-design--sun-outlined] text-gray-200': theme === 'dark',
    });
  }, [theme]);

  return (
    <ButtonBase>
      <span className={className} onClick={onToggleTheme} />
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
      <div className="fairys_admin_tool_bar_right">
        <MenuDarkLight />
      </div>
    </div>
  );
};

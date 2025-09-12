import { useSetting } from 'context/setting';
import { useMemo } from 'react';
import { FairysButtonBase } from 'components/button';
import { LayoutItem } from './base';

export const SettingThemeBase = () => {
  const [state, settingInstance] = useSetting();
  const theme = state.theme;
  const autoListenSystemTheme = state.autoListenSystemTheme;
  const isCheckTheme = useMemo(() => {
    const data = {
      dark: false,
      light: false,
      system: false,
    };
    if (autoListenSystemTheme) {
      data.system = true;
    } else {
      data[theme] = true;
    }
    return data;
  }, [theme, autoListenSystemTheme]);

  return (
    <LayoutItem isDivider label="主题风格">
      <div className="fairys:flex fairys:items-center fairys:justify-center fairys:gap-2">
        <FairysButtonBase
          className="fairys:w-[80px]"
          bordered
          isBg={isCheckTheme.dark}
          onClick={() => settingInstance.onToggleTheme('dark')}
        >
          <span className="fairys:icon-[ri--moon-line] fairys:text-[18px]"></span>
          <span className="fairys:text-[14px] fairys:pl-2">暗黑</span>
        </FairysButtonBase>
        <FairysButtonBase
          className="fairys:w-[80px]"
          bordered
          isBg={isCheckTheme.light}
          onClick={() => settingInstance.onToggleTheme('light')}
        >
          <span className="fairys:icon-[ri--sun-line] fairys:text-[18px]"></span>
          <span className="fairys:text-[14px] fairys:pl-2">亮色</span>
        </FairysButtonBase>
        <FairysButtonBase
          className="fairys:w-[80px]"
          bordered
          isBg={isCheckTheme.system}
          onClick={() => settingInstance.onToggleTheme('system')}
        >
          <span className="fairys:icon-[codicon--color-mode] fairys:text-[18px]"></span>
          <span className="fairys:text-[14px] fairys:pl-2">系统</span>
        </FairysButtonBase>
      </div>
    </LayoutItem>
  );
};

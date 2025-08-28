import { useSetting } from 'context/setting';
import { useMemo } from 'react';
import { ButtonBase } from 'components/button';
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
      <div className="flex items-center justify-center gap-2">
        <ButtonBase
          className="w-[80px]"
          bordered
          isBg={isCheckTheme.dark}
          onClick={() => settingInstance.onToggleTheme('dark')}
        >
          <span className="icon-[ri--moon-line] text-[18px]"></span>
          <span className="text-[14px] pl-2">暗黑</span>
        </ButtonBase>
        <ButtonBase
          className="w-[80px]"
          bordered
          isBg={isCheckTheme.light}
          onClick={() => settingInstance.onToggleTheme('light')}
        >
          <span className="icon-[ri--sun-line] text-[18px]"></span>
          <span className="text-[14px] pl-2">亮色</span>
        </ButtonBase>
        <ButtonBase
          className="w-[80px]"
          bordered
          isBg={isCheckTheme.system}
          onClick={() => settingInstance.onToggleTheme('system')}
        >
          <span className="icon-[codicon--color-mode] text-[18px]"></span>
          <span className="text-[14px] pl-2">系统</span>
        </ButtonBase>
      </div>
    </LayoutItem>
  );
};

import { useSettingDataInstance } from 'context/setting';
import { useMemo } from 'react';
import { FairysButtonBase } from 'components/button';
import { LayoutItem } from './base';

export const SettingSiderThemeBase = () => {
  const [state, settingDataInstance] = useSettingDataInstance();
  const siderTheme = state.siderTheme;

  const isCheckTheme = useMemo(() => {
    const data = {
      dark: false,
      light: false,
      system: false,
    };
    if (siderTheme !== 'dark' && siderTheme !== 'light') {
      data.system = true;
    } else {
      data[siderTheme] = true;
    }
    return data;
  }, [siderTheme]);

  return (
    <LayoutItem isDivider label="侧边栏主题风格">
      <div className="fairys:flex fairys:items-center fairys:justify-center fairys:gap-2">
        <FairysButtonBase
          className="fairys:w-[80px]"
          bordered
          isBg={isCheckTheme.dark}
          onClick={() => settingDataInstance.onToggleSiderTheme('dark')}
        >
          <span className="fairys:icon-[ri--moon-line] fairys:text-[18px]"></span>
          <span className="fairys:text-[14px] fairys:pl-2">暗黑</span>
        </FairysButtonBase>
        <FairysButtonBase
          className="fairys:w-[80px]"
          bordered
          isBg={isCheckTheme.light}
          onClick={() => settingDataInstance.onToggleSiderTheme('light')}
        >
          <span className="fairys:icon-[ri--sun-line] fairys:text-[18px]"></span>
          <span className="fairys:text-[14px] fairys:pl-2">亮色</span>
        </FairysButtonBase>
        <FairysButtonBase
          className="fairys:w-[80px]"
          bordered
          isBg={isCheckTheme.system}
          onClick={() => settingDataInstance.onToggleSiderTheme('system')}
        >
          <span className="fairys:icon-[codicon--color-mode] fairys:text-[18px]"></span>
          <span className="fairys:text-[14px] fairys:pl-2">系统</span>
        </FairysButtonBase>
      </div>
    </LayoutItem>
  );
};

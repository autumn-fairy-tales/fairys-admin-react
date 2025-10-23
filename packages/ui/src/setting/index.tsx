import { useSettingDataInstance } from 'context/setting';
import { FairysModalBase } from 'components/modal-base';
import { SettingThemeBase } from './base/theme';
import { SettingLayoutMode } from './base/layout-mode';
import { SettingPageTransitionMode } from './base/page-transition-mode';
import { SettingColor } from './base/color';
import hotkeys from 'hotkeys-js';
import { memo, useEffect } from 'react';
import { appPluginDataInstance } from 'context/app-plugins-data';

export const SettingDrawer = memo(() => {
  const [state, settingDataInstance] = useSettingDataInstance();
  const settingPlugin = appPluginDataInstance.appPlugins?.['setting'];

  useEffect(() => {
    if (state.open) {
      hotkeys('esc', (e) => {
        e.preventDefault();
        settingDataInstance.onToggleOpen();
      });
    }
    return () => {
      hotkeys.unbind('esc');
    };
  }, [state.open]);

  return (
    <FairysModalBase onClose={settingDataInstance.onToggleOpen} open={state.open} title="偏好设置" mode="drawer">
      <div className="fairys:h-full fairys:overflow-auto">
        <div className="fairys:flex fairys:flex-col fairys:gap-4 ">
          <SettingThemeBase />
          <SettingColor />
          <SettingLayoutMode />
          <SettingPageTransitionMode />
          {settingPlugin?.render}
        </div>
      </div>
    </FairysModalBase>
  );
});

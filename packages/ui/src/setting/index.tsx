import { useSettingDataInstance } from 'context/setting';
import { FairysModalBase } from 'components/modal-base';
import { SettingThemeBase } from './base/theme';
import { SettingLayoutMode } from './base/layout-mode';
import { SettingPageTransitionMode } from './base/page-transition-mode';
import { SettingColor } from './base/color';
import { memo, useEffect } from 'react';
import { useAppPluginDataInstance } from 'context/app-plugins-data';
import { SettingSiderThemeBase } from './base/sider-theme';

export const SettingDrawer = memo(() => {
  const [state, settingDataInstance] = useSettingDataInstance();
  const [snapshot] = useAppPluginDataInstance();
  const settingPlugin = snapshot?.['setting'];

  useEffect(() => {
    if (!state.open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        settingDataInstance.onToggleOpen();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [state.open]);

  return (
    <FairysModalBase onClose={settingDataInstance.onToggleOpen} open={state.open} title="偏好设置" mode="drawer">
      <div className="fairys-admin-setting-content fairys:h-full fairys:overflow-auto">
        <div className="fairys:flex fairys:flex-col fairys:gap-4 ">
          <SettingThemeBase />
          <SettingSiderThemeBase />
          <SettingColor />
          <SettingLayoutMode />
          <SettingPageTransitionMode />
          {settingPlugin?.render}
        </div>
      </div>
    </FairysModalBase>
  );
});

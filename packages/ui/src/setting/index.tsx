import { useSetting } from 'context/setting';
import { FairysModalBase } from 'components/modal-base';
import { SettingThemeBase } from './base/theme';
import { SettingLayoutMode } from './base/layout-mode';
import { SettingPageTransitionMode } from './base/page-transition-mode';
import hotkeys from 'hotkeys-js';
import { memo, useEffect } from 'react';

export const SettingDrawer = memo(() => {
  const [state, settingInstance] = useSetting();

  useEffect(() => {
    if (state.open) {
      hotkeys('esc', (e) => {
        e.preventDefault();
        settingInstance.onToggleOpen();
      });
    }
    return () => {
      hotkeys.unbind('esc');
    };
  }, [state.open]);

  return (
    <FairysModalBase onClose={settingInstance.onToggleOpen} open={state.open} title="偏好设置" mode="drawer">
      <div className="fairys:h-full fairys:overflow-auto">
        <div className="fairys:flex fairys:flex-col fairys:gap-4 fairys:box-border">
          <SettingThemeBase />
          <SettingLayoutMode />
          <SettingPageTransitionMode />
        </div>
      </div>
    </FairysModalBase>
  );
});

import { useSetting } from 'context/setting';
import { ModalBase } from 'components/modal-base';
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
    <ModalBase onClose={settingInstance.onToggleOpen} open={state.open} title="偏好设置" mode="drawer">
      <div className="h-full overflow-auto">
        <div className="flex flex-col gap-4 box-border">
          <SettingThemeBase />
          <SettingLayoutMode />
          <SettingPageTransitionMode />
        </div>
      </div>
    </ModalBase>
  );
});

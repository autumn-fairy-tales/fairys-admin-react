import { useSetting } from 'context/setting';
import { ModalBase } from 'components/modal-base';
import { SettingThemeBase } from './base/theme';
import { SettingLayoutMode } from './base/layout-mode';
import { SettingPageTransitionMode } from './base/page-transition-mode';

export const SettingDrawer = () => {
  const [state, settingInstance] = useSetting();
  return (
    <ModalBase onClose={settingInstance.onToggleOpen} open={state.open} title="偏好设置" mode="drawer">
      <div className="flex flex-col gap-4 box-border">
        <SettingThemeBase />
        <SettingLayoutMode />
        <SettingPageTransitionMode />
      </div>
    </ModalBase>
  );
};

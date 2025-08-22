import { useSetting } from 'context/setting';
import { ModalBase } from 'components/modal-base';

export const SettingDrawer = () => {
  const [state, settingInstance] = useSetting();
  return (
    <ModalBase onClose={settingInstance.onToggleOpen} open={state.open} title="偏好设置" mode="drawer">
      <div>21121212</div>
    </ModalBase>
  );
};

import { useSettingDataInstance } from 'context/setting';
import { FairysSelectBase } from 'components/select';
import { LayoutItem } from './base';
import { motionAnimationDataInstance } from 'context/motion-animation';
import { useMemo } from 'react';

export const SettingPageTransitionMode = () => {
  const [state, settingDataInstance] = useSettingDataInstance();
  const items = useMemo(() => {
    return (motionAnimationDataInstance.state || []).map((item) => {
      return { title: item.name, value: item.name };
    });
  }, []);
  return (
    <LayoutItem label="页面切换模式">
      <FairysSelectBase
        value={state.pageTransitionMode}
        items={items}
        onChange={(value: string) => settingDataInstance.updated({ pageTransitionMode: value })}
      />
    </LayoutItem>
  );
};

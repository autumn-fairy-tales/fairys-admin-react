import { useSetting } from 'context/setting';
import { SelectBase } from 'components/select';
import { LayoutItem } from './base';
import { motionAnimationInstance } from 'context/motion-animation';
import { useMemo } from 'react';

export const SettingPageTransitionMode = () => {
  const [state, settingInstance] = useSetting();
  const items = useMemo(() => {
    return (motionAnimationInstance.state || []).map((item) => {
      return { title: item.name, value: item.name };
    });
  }, []);
  return (
    <LayoutItem label="页面切换模式">
      <SelectBase
        value={state.pageTransitionMode}
        items={items}
        onChange={(value: string) => settingInstance.updated({ pageTransitionMode: value })}
      />
    </LayoutItem>
  );
};

import { LayoutMode, useSetting } from 'context/setting';
import { SelectBase } from 'components/select';
import { LayoutItem } from './base';

export const SettingLayoutMode = () => {
  const [state, settingInstance] = useSetting();
  return (
    <LayoutItem label="布局模式">
      <SelectBase
        value={state.layoutMode}
        items={[
          { title: '主子菜单侧边', value: 'main_sub_left' },
          { title: '主菜单左侧+移入显示子菜单', value: 'main_left' },
          { title: '主菜单顶部+移入显示子菜单', value: 'main_top_header' },
          { title: '主菜单顶部+子菜单侧边', value: 'main_top_sub_left_header' },
          { title: '主子菜单合并侧边展示', value: 'left' },
          { title: '主子菜单合并侧边展示+顶部信息', value: 'left_header' },
          { title: '移动', value: 'mobile', disabled: true },
        ]}
        onChange={(value: LayoutMode) => settingInstance.updated({ layoutMode: value })}
      />
    </LayoutItem>
  );
};

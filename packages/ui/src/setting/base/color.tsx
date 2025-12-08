import { useSettingDataInstance } from 'context/setting';
import { LayoutItem } from './base';
import { FairysPopoverBase } from 'components/popover-base';
import { getHexadecimalColor } from 'utils/getHexadecimalColor';
import { useMemo } from 'react';
import Sketch from '@uiw/react-color-sketch';

const PRESET_COLORS = [
  '#D0021B',
  '#F5A623',
  '#f8e61b',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#af52de',
  '#4A90E2',
  '#1677ff',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
];

export const SettingColor = () => {
  const [state, settingDataInstance] = useSettingDataInstance();
  const themeColor = useMemo(() => getHexadecimalColor(state.themeColor), [state.themeColor]);

  return (
    <LayoutItem label="主题颜色">
      <FairysPopoverBase
        content={
          <Sketch
            color={themeColor}
            disableAlpha
            presetColors={PRESET_COLORS}
            onChange={(color) => {
              settingDataInstance.updatedThemeColor(color.hex);
            }}
          />
        }
      >
        <div
          className="fairys:w-[100px] fairys:h-[32px] fairys:rounded-sm fairys:flex fairys:items-center fairys:justify-center fairys:cursor-pointer"
          style={{ backgroundColor: themeColor }}
        >
          <span className="fairys:text-white">{themeColor}</span>
        </div>
      </FairysPopoverBase>
    </LayoutItem>
  );
};

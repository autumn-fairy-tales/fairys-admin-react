import { useSettingDataInstance } from 'context/setting';
import { LayoutItem } from './base';
import { FairysPopoverBase } from 'components/popover-base';
import { getHexadecimalColor } from 'utils/getHexadecimalColor';
import { useMemo } from 'react';
import Sketch from '@uiw/react-color-sketch';

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

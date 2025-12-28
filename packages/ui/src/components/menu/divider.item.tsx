import { useMemo } from 'react';
import { FairysDividerMenuItemType } from './interface';
import clsx from 'clsx';
import { UtilsColor } from 'utils/utils.color';

export interface FairysDividerMenuItemProps {
  item: FairysDividerMenuItemType;
  level?: number;
}
export const FairysDividerMenuItem = (props: FairysDividerMenuItemProps) => {
  const { item } = props;
  const { className, style } = item;
  const _class = useMemo(() => {
    return clsx(
      'fairys_admin_menu_base-divider-item fairys:shrink-0 fairys:border-t fairys:border-solid fairys:mt-[2px] fairys:mb-[2px] ',
      UtilsColor.componentBorderClassNameBase,
      className,
    );
  }, [className]);
  return <div className={_class} style={style} />;
};

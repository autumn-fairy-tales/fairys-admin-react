import { useMemo } from 'react';
import { FairysDividerMenuItemType } from './interface';
import clsx from 'clsx';
export interface FairysDividerMenuItemProps {
  item: FairysDividerMenuItemType;
  level?: number;
}
export const FairysDividerMenuItem = (props: FairysDividerMenuItemProps) => {
  const { item, level } = props;
  const { className, style } = item;
  const _class = useMemo(() => {
    return clsx('fairys-menu-divider-item fairys:shrink-0', className);
  }, [className]);
  return <div className={_class} style={style} />;
};

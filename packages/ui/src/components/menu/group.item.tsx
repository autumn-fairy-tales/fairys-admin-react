import { useMemo } from 'react';
import { FairysGroupMenuItemType } from './interface';
import { renderItems } from './utils';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export interface FairysGroupMenuItemProps {
  item: FairysGroupMenuItemType;
  level?: number;
}
export const FairysGroupMenuItem = (props: FairysGroupMenuItemProps) => {
  const { item, level = 0 } = props;
  const { items, className, style } = item;

  const render = useMemo(() => {
    return renderItems(items, level);
  }, [items, level]);

  const _class = useMemo(() => {
    return clsx('fairys-menu-group-item fairys:shrink-0', className);
  }, [className]);

  return (
    <motion.div style={style} className={_class}>
      {render}
    </motion.div>
  );
};

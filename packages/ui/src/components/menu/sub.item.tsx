import { Fragment, useMemo } from 'react';
import { FairysMenuItemType } from './interface';
import { renderItems } from './utils';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { FairysMenuItem } from './item';
import { useFairysMenuInstanceContext } from './instance';
import { FairysDisclosureItem } from 'components/disclosure';

export interface FairysSubMenuItemProps {
  item: FairysMenuItemType;
  level?: number;
}

export const FairysSubMenuItem = (props: FairysSubMenuItemProps) => {
  const { item, level = 0 } = props;
  const { items, className, style } = item;
  const [state, instance] = useFairysMenuInstanceContext();
  const openKeys = state.openKeys;
  const isOpen = useMemo(() => instance.isOpen(item.path), [item.path, openKeys]);

  const render = useMemo(() => {
    return renderItems(items, level);
  }, [items, level]);

  const _class = useMemo(() => {
    return clsx('fairys-sub-menu-item fairys:shrink-0 fairys:gap-y-[1px]', className);
  }, [className]);

  return (
    <motion.div style={style} className={_class}>
      <FairysMenuItem item={item} isExpandCollapse expandCollapse={isOpen} level={level} />
      <FairysDisclosureItem
        open={isOpen}
        className="fairys-sub-menu-item_body fairys:shrink-0 fairys:flex fairys:flex-col fairys:gap-y-[1px]"
      >
        {render}
      </FairysDisclosureItem>
    </motion.div>
  );
};

import { Fragment, useMemo } from 'react';
import { FairysMenuItemType } from './interface';
import { renderItems, UtilsItemOptions } from './utils';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { FairysMenuItem } from './item';
import { useFairysMenuInstanceContext } from './instance';

export interface FairysGroupMenuItemProps {
  item: FairysMenuItemType;
  utilsItemOptions?: UtilsItemOptions;
}

export const FairysGroupMenuItem = (props: FairysGroupMenuItemProps) => {
  const { item, utilsItemOptions } = props;
  const { items, className, style } = item;

  const [state] = useFairysMenuInstanceContext();
  const collapsedMode = state.collapsedMode;
  /**判断菜单是否缩放*/
  const _isCollapsed = collapsedMode === 'icon' || collapsedMode === 'inline';

  console.log('utilsItemOptions', utilsItemOptions);

  const render = useMemo(() => {
    return renderItems(items, utilsItemOptions);
  }, [items, utilsItemOptions]);

  const _class = useMemo(() => {
    return clsx('fairys-menu-group-item fairys:shrink-0', className);
  }, [className]);

  return (
    <motion.div style={style} className={_class}>
      <FairysMenuItem item={item} utilsItemOptions={utilsItemOptions} />
      <div className="fairys-sub-menu-item_body fairys:shrink-0 fairys:flex fairys:flex-col fairys:gap-y-[2px]">
        {render}
      </div>
    </motion.div>
  );
};

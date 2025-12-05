import { useMemo, useState } from 'react';
import { FairysMenuItemType } from './interface';
import { renderItems, UtilsItemOptions } from './utils';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { FairysMenuItem } from './item';
import { useFairysMenuInstanceContext } from './instance';
import { FairysDisclosureItem } from 'components/disclosure';
import { FairysPopoverBase } from 'components/popover-base';

export interface FairysSubMenuItemProps {
  item: FairysMenuItemType;
  utilsItemOptions?: UtilsItemOptions;
}

export const FairysSubMenuItem = (props: FairysSubMenuItemProps) => {
  const { item, utilsItemOptions } = props;
  const { items, className, style, type } = item;
  const [state, instance] = useFairysMenuInstanceContext();
  const openKeys = state.openKeys;
  const collapsedMode = state.collapsedMode;
  /**判断菜单是否缩放*/
  const isCollapsed = collapsedMode === 'icon' || collapsedMode === 'inline';

  const [open, setOpen] = useState(false);
  const isOpen = useMemo(() => instance.isOpen(item.path), [item.path, openKeys]);

  const render = useMemo(() => {
    return renderItems(items, utilsItemOptions);
  }, [items, utilsItemOptions]);

  const _class = useMemo(() => {
    return clsx('fairys-sub-menu-item fairys:shrink-0 fairys:gap-y-[2px]', className);
  }, [className]);

  if (isCollapsed) {
    return (
      <FairysPopoverBase
        className="fairys-sub-menu-item_popover"
        eventName="hover"
        content={
          <div className="fairys-sub-menu-item_popover_content fairys:shrink-0 fairys:flex fairys:flex-col fairys:gap-y-[2px] fairys:p-[5px]">
            {render}
          </div>
        }
        onOpenChange={setOpen}
        placement="right-start"
        isNotMinWidth
      >
        <FairysMenuItem
          item={item}
          isExpandCollapse
          expandCollapse={isCollapsed ? open : isOpen}
          utilsItemOptions={utilsItemOptions}
        />
      </FairysPopoverBase>
    );
  }

  return (
    <motion.div style={style} className={_class}>
      <FairysMenuItem item={item} isExpandCollapse expandCollapse={isOpen} utilsItemOptions={utilsItemOptions} />
      <FairysDisclosureItem
        open={isOpen}
        className="fairys-sub-menu-item_body fairys:shrink-0 fairys:flex fairys:flex-col fairys:gap-y-[2px]"
      >
        {render}
      </FairysDisclosureItem>
    </motion.div>
  );
};

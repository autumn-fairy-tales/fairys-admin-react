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
  const { items, className, style } = item;
  const [state, instance] = useFairysMenuInstanceContext();
  const openKeys = state.openKeys;
  const collapsedMode = state.collapsedMode;
  const disabledShowChildItem = state.disabledShowChildItem;
  const mode = state.mode;
  const maxWidth = state.maxWidth;

  /**判断是否显示弹框*/
  const isPopover = collapsedMode === 'icon' || collapsedMode === 'vertical' || mode === 'horizontal';

  const [open, setOpen] = useState(false);
  const isOpen = useMemo(() => instance.isOpen(item.path), [item.path, openKeys]);

  const render = useMemo(() => {
    return renderItems(items, utilsItemOptions);
  }, [items, utilsItemOptions]);

  const _class = useMemo(() => {
    return clsx('fairys-sub-menu-item fairys:shrink-0 fairys:gap-y-2', className);
  }, [className]);

  if (disabledShowChildItem) {
    return (
      <motion.div style={style} className={_class}>
        <FairysMenuItem item={item} utilsItemOptions={utilsItemOptions} isExpandCollapse />
      </motion.div>
    );
  }
  if (isPopover) {
    return (
      <FairysPopoverBase
        className="fairys-sub-menu-item_popover"
        eventName="hover"
        content={
          <div
            style={{ maxWidth }}
            className="fairys-sub-menu-item_popover_content fairys:shrink-0 fairys:flex fairys:flex-col fairys:gap-y-2 fairys:p-[5px]"
          >
            {render}
          </div>
        }
        onOpenChange={setOpen}
        placement="right-start"
        isNotMinWidth
      >
        <motion.div style={style} className={_class}>
          <FairysMenuItem
            item={item}
            isExpandCollapse
            expandCollapse={isPopover ? open : isOpen}
            utilsItemOptions={utilsItemOptions}
          />
        </motion.div>
      </FairysPopoverBase>
    );
  }

  return (
    <motion.div style={style} className={_class}>
      <FairysMenuItem item={item} isExpandCollapse expandCollapse={isOpen} utilsItemOptions={utilsItemOptions} />
      <FairysDisclosureItem
        open={isOpen}
        className="fairys-sub-menu-item_body fairys:shrink-0 fairys:flex fairys:flex-col fairys:gap-y-2"
      >
        {render}
      </FairysDisclosureItem>
    </motion.div>
  );
};

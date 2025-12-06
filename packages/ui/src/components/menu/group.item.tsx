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
  const mode = state.mode;

  /**判断菜单是否缩放*/
  const _isCollapsed = collapsedMode === 'icon' || collapsedMode === 'inline';

  const collapsedLevel = useMemo(
    () => [...utilsItemOptions.menuTypes].reverse().findIndex((type) => type === 'subMenu'),
    [utilsItemOptions.menuTypes],
  );

  const render = useMemo(() => {
    return renderItems(items, utilsItemOptions);
  }, [items, utilsItemOptions]);

  const _class = useMemo(() => {
    return clsx('fairys-menu-group-item fairys:shrink-0', className, {});
  }, [className]);

  const _classBody = useMemo(() => {
    return clsx('fairys-group-menu-item_body fairys:shrink-0 fairys:flex', {
      'fairys:flex-col fairys:gap-y-[2px]': mode === 'vertical' || collapsedLevel !== -1,
      'fairys:flex-row fairys:gap-x-[2px]': mode === 'horizontal' && collapsedLevel === -1,
    });
  }, [mode, collapsedLevel]);
  // 横向的不显示分组，和折叠一样

  return (
    <motion.div style={style} className={_class}>
      {mode === 'horizontal' ? (
        <Fragment />
      ) : _isCollapsed ? (
        <Fragment />
      ) : (
        <FairysMenuItem item={item} utilsItemOptions={utilsItemOptions} />
      )}
      <div className={_classBody}>{render}</div>
    </motion.div>
  );
};

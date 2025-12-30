import { Fragment, useMemo, useState } from 'react';
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
  const mode = state.mode;
  const maxWidth = state.maxWidth;
  const [open, setOpen] = useState(false);
  const isOpen = useMemo(() => instance.isOpen(item.path), [item.path, openKeys]);
  const render = useMemo(() => {
    return renderItems(items, utilsItemOptions);
  }, [items, utilsItemOptions]);

  const _class = useMemo(() => {
    return clsx(
      type === 'group' ? 'fairys_admin_menu_base-group-menu-item' : 'fairys_admin_menu_base-sub-menu-item',
      'fairys:shrink-0 fairys:gap-y-1',
      className,
    );
  }, [className]);

  const collapsed = state.collapsed;
  const firstGroupMode = state.firstGroupMode;

  /**判断是否显示弹框*/
  const isPopover = collapsed || mode === 'horizontal';

  /**获取折叠情况下，当前所在位置，
   * 如果不存在 subMenu 则是平铺子菜单
   * 否则是在subMenu 菜单中
   */
  const collapsedSubMenuIndex = useMemo(
    () => [...utilsItemOptions.menuTypes].reverse().findIndex((type) => type === 'subMenu'),
    [utilsItemOptions.menuTypes],
  );

  /**
   * 1. collapsed === true , 第一层只显示 图标+标题 或 图标
   * 2. collapsed === true , 如果是 组菜单，则默认第一层组菜单隐藏，子菜单平铺显示，图标+标题 或 图标，可以通过参数控制，
   *    1. 移入显示子菜单
   *    2. 点击显示子菜单
   *    3. 点击不做任何显示子菜单，只触发事件
   *    4. 怎么判断平铺问题？
   * 3. collapsed === true , 如果是 subMenu 菜单，则使用 弹框显示子菜单，子菜单正常显示，显示 图标+标题，其子菜单如果有 subMenu 菜单继续弹框显示
   * 4. collapsed === false , 所有菜单都显示，图标+标题 或 图标
   * **/
  const _classBody = useMemo(() => {
    return clsx('fairys_admin_menu_base-group-menu-item_body fairys:shrink-0 fairys:flex', {
      'fairys:flex-col fairys:gap-y-1': mode === 'vertical' || collapsedSubMenuIndex !== -1,
      'fairys:flex-row fairys:gap-x-1': mode === 'horizontal' && collapsedSubMenuIndex === -1,
    });
  }, [mode, collapsedSubMenuIndex]);
  // 横向的不显示分组，和折叠一样

  /**
   * 折叠 并且是 组菜单
   */
  if (item.type === 'group') {
    if (collapsedSubMenuIndex === -1) {
      // 移入或者点击显示子菜单
      if (firstGroupMode === 'hover' || firstGroupMode === 'click') {
        return (
          <FairysPopoverBase
            className="fairys_admin_menu_base-group-menu-item_popover"
            eventName={firstGroupMode}
            content={
              <div
                style={{ maxWidth }}
                className="fairys-group-menu-item_popover_content fairys:shrink-0 fairys:flex fairys:flex-col fairys:gap-y-1 fairys:p-[5px]"
              >
                {render}
              </div>
            }
            onOpenChange={setOpen}
            placement="right-start"
            isNotMinWidth
          >
            <motion.div style={style} className={_class}>
              <FairysMenuItem item={item} isExpandCollapse utilsItemOptions={utilsItemOptions} />
            </motion.div>
          </FairysPopoverBase>
        );
      }
      // 只显示分组菜单，子菜单不进行任何操作
      if (firstGroupMode === 'onlyGroup') {
        return (
          <motion.div style={style} className={_class}>
            <FairysMenuItem item={item} isExpandCollapse utilsItemOptions={utilsItemOptions} />
          </motion.div>
        );
      }
    }
    // 平铺子菜单
    return (
      <motion.div style={style} className={_class}>
        {(mode === 'horizontal' && collapsedSubMenuIndex === -1) || (collapsed && collapsedSubMenuIndex === -1) ? (
          <Fragment />
        ) : (
          <FairysMenuItem item={item} utilsItemOptions={utilsItemOptions} />
        )}
        <div className={_classBody}>{render}</div>
      </motion.div>
    );
  }
  if (isPopover) {
    return (
      <FairysPopoverBase
        className="fairys-sub-menu-item_popover"
        eventName="hover"
        // eventName="click"
        content={
          <div
            style={{ maxWidth }}
            className="fairys_admin_menu_base-sub-menu-item_popover_content fairys:shrink-0 fairys:flex fairys:flex-col fairys:gap-y-1 fairys:p-[5px]"
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
        className="fairys_admin_menu_base-sub-menu-item_body fairys:shrink-0 fairys:flex fairys:flex-col fairys:gap-y-1"
      >
        {render}
      </FairysDisclosureItem>
    </motion.div>
  );
};

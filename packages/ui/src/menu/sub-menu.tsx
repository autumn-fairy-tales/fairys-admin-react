import { useMemo, useState } from 'react';
import type { MenuItemType } from 'context/menu-data';
import { useMenuData } from 'context/menu-data';
import { MenuItem, MainMenuItem } from './menu-item';
import { useSetting } from 'context/setting';
import { FairysDisclosureItem } from 'components/disclosure';
import { FairysPopoverBase } from 'components/popover-base';

export interface MenuItemProps {
  /**
   * 子菜单项
   */
  item: MenuItemType;
  /**
   * 子菜单层级
   */
  level?: number;
  /**
   * 是否为主菜单
   */
  isMain?: boolean;
}

const subMenuClassName = 'fairys_admin_sub_menu fairys:shrink-0 fairys:flex fairys:flex-col fairys:gap-y-[2px] ';
const childClassName = 'fairys_admin_sub_menu_body fairys:shrink-0 fairys:flex fairys:flex-col fairys:gap-y-[2px]';
const popoverChildClassName =
  'fairys_admin_sub_menu_body fairys:shrink-0 fairys:flex fairys:flex-col fairys:gap-y-[2px] fairys:p-[5px]';

export const SubMenu = (props: MenuItemProps) => {
  const { item, level = 0, isMain = false } = props;
  const [state] = useMenuData();
  const expandItems = state.expandItems;
  const mainExpandItem = state.mainExpandItem;
  const [settingState] = useSetting();
  const sideMenuMode = settingState.sideMenuMode;
  const [isOpen, setIsOpen] = useState(false);
  const isExpand = useMemo(() => {
    if (isMain) {
      return mainExpandItem?.path === item.path;
    }
    return !!expandItems.find((i) => i.path === item.path);
  }, [expandItems, item.path, isMain, mainExpandItem]);

  const child = useMemo(() => {
    return item.items?.map((child) => {
      if (Array.isArray(child.items)) {
        return <SubMenu key={child.path} item={child} level={level + 1} />;
      }
      return <MenuItem key={child.path} item={child} level={level + 1} />;
    });
  }, [item.items, level, isMain]);

  if (sideMenuMode !== 'close') {
    return (
      <div className={subMenuClassName}>
        {isMain ? <MainMenuItem item={item} /> : <MenuItem item={item} level={level} isSubMenu isExpand={isExpand} />}
        <FairysDisclosureItem open={isMain ? true : isExpand} className={childClassName}>
          {child}
        </FairysDisclosureItem>
      </div>
    );
  }
  return (
    <div className={subMenuClassName}>
      <FairysPopoverBase
        className="fairys_admin_sub_menu_popover"
        eventName="hover"
        content={<div className={popoverChildClassName}>{child}</div>}
        onOpenChange={setIsOpen}
        placement="right-start"
        isNotMinWidth
      >
        {isMain ? <MainMenuItem item={item} /> : <MenuItem item={item} level={level} isSubMenu isExpand={isOpen} />}
      </FairysPopoverBase>
    </div>
  );
};

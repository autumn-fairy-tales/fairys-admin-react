import { useMemo, useState } from 'react';
import type { MenuItemType } from 'context/menu-data';
import { useMenuData } from 'context/menu-data';
import { MenuItem, MainMenuItem } from './menu-item';
import { useSetting } from 'context/setting';
import { DisclosureItem } from 'components/disclosure';
import { PopoverBase } from 'components/popover-base';

export interface MenuItemProps {
  item: MenuItemType;
  level?: number;
  isMain?: boolean;
}

const subMenuClassName = 'fairys_admin_sub_menu fairys:shrink-0 fairys:flex fairys:flex-col fairys:gap-y-[2px] ';
const childClassName = 'fairys_admin_sub_menu_body fairys:shrink-0 fairys:flex fairys:flex-col fairys:gap-y-[2px]';
const popoverChildClassName =
  'fairys_admin_sub_menu_body fairys:shrink-0 fairys:flex fairys:flex-col fairys:gap-y-[2px] fairys:p-[5px] fairys:dark:border fairys:dark:border-gray-700';

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

  const render = useMemo(() => {
    if (sideMenuMode !== 'close') {
      return (
        <div className={subMenuClassName}>
          {isMain ? <MainMenuItem item={item} /> : <MenuItem item={item} level={level} isSubMenu isExpand={isExpand} />}
          <DisclosureItem open={isMain ? true : isExpand} className={childClassName}>
            {child}
          </DisclosureItem>
        </div>
      );
    }
    return (
      <div className={subMenuClassName}>
        <PopoverBase
          className="fairys_admin_sub_menu_popover"
          eventName="hover"
          content={<div className={popoverChildClassName}>{child}</div>}
          onOpenChange={setIsOpen}
          placement="right-start"
          isNotMinWidth
        >
          {isMain ? <MainMenuItem item={item} /> : <MenuItem item={item} level={level} isSubMenu isExpand={isOpen} />}
        </PopoverBase>
      </div>
    );
  }, [child, isMain, isExpand, item, level, sideMenuMode, isOpen]);
  return render;
};

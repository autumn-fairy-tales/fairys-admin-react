import { useMemo } from 'react';
import type { MenuItemType } from 'context/menu-data';
import { useMenuData, menuDataInstance } from 'context/menu-data';
import { MenuItem, MainMenuItem } from './menu-item';
import { useSetting } from 'context/setting';
import { DisclosureItem } from 'components/disclosure';
import { Popover } from 'components/popover';

export interface MenuItemProps {
  item: MenuItemType;
  level?: number;
  isMain?: boolean;
}

const subMenuClassName = 'fairys_admin_sub_menu shrink-0 flex flex-col gap-y-[2px] ';
const childClassName = 'fairys_admin_sub_menu_body shrink-0 flex flex-col gap-y-[2px]';
const popoverChildClassName =
  'fairys_admin_sub_menu_body shrink-0 flex flex-col gap-y-[2px] p-[5px] dark:border dark:border-gray-700';

export const SubMenu = (props: MenuItemProps) => {
  const { item, level = 0, isMain = false } = props;
  const [state] = useMenuData();
  const expandItems = state.expandItems;
  const mainExpandItem = state.mainExpandItem;
  const [settingState] = useSetting();
  const sideMenuMode = settingState.sideMenuMode;

  const isExpand = useMemo(() => {
    if (isMain) {
      return mainExpandItem?.path === item.path;
    }
    return !!expandItems.find((i) => i.path === item.path);
  }, [expandItems, item.path, isMain, mainExpandItem]);

  const child = useMemo(() => {
    return item.children?.map((child) => {
      if (Array.isArray(child.children)) {
        return <SubMenu key={child.path} item={child} level={level + 1} />;
      }
      return <MenuItem key={child.path} item={child} level={level + 1} />;
    });
  }, [item.children, level, isMain]);

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
        <Popover
          className="fairys_admin_sub_menu_popover"
          onOpenChange={(open) => {
            if (open === false) {
              menuDataInstance.clearExpandItems();
              menuDataInstance.updateMainExpandItem(undefined);
            }
          }}
          open={isExpand}
          content={<div className={popoverChildClassName}>{child}</div>}
        >
          {isMain ? <MainMenuItem item={item} /> : <MenuItem item={item} level={level} isSubMenu isExpand={isExpand} />}
        </Popover>
      </div>
    );
  }, [child, isMain, isExpand, item, level, sideMenuMode]);
  return render;
};

import { useMemo } from 'react';
import type { MenuItemType } from '../context/menu-data';
import { useMenuData, menuDataInstance } from '../context/menu-data';
import { MenuItem } from './menu-item';
import clsx from 'clsx';
import { useSetting } from '../context/setting';
import { DisclosureItem } from '../components/disclosure';
import { Popover } from '../components/popover';

export interface MenuItemProps {
  item: MenuItemType;
  level?: number;
}

export const SubMenu = (props: MenuItemProps) => {
  const { item, level = 0 } = props;
  const [state] = useMenuData();
  const expandItems = state.expandItems;
  const [settingState] = useSetting();
  const sideMenuMode = settingState.sideMenuMode;
  const sideMenuDark = settingState.darkMenu;

  const child = useMemo(() => {
    return item.children?.map((child) => {
      if (Array.isArray(child.children)) {
        return <SubMenu key={child.path} item={child} level={level + 1} />;
      }
      return <MenuItem key={child.path} item={child} level={level + 1} />;
    });
  }, [item.children, level]);

  const isExpand = useMemo(() => {
    return !!expandItems.find((i) => i.path === item.path);
  }, [expandItems, item.path]);

  const childClassName = useMemo(() => {
    return clsx('fairys_admin_sub_menu_body shrink-0 flex flex-col gap-y-[2px]');
  }, [sideMenuDark]);

  const popoverClassName = useMemo(() => {
    return clsx('fairys_admin_sub_menu_popover', {
      dark: !!sideMenuDark,
    });
  }, [sideMenuDark]);

  if (sideMenuMode !== 'close') {
    return (
      <div className="fairys_admin_sub_menu shrink-0 flex flex-col gap-y-[2px] ">
        <MenuItem item={item} level={level} isSubMenu isExpand={isExpand} />
        <DisclosureItem open={isExpand} className={childClassName}>
          {child}
        </DisclosureItem>
      </div>
    );
  }

  return (
    <div className="fairys_admin_sub_menu shrink-0 flex flex-col gap-y-[2px]">
      <Popover
        className={popoverClassName}
        onOutsidePress={(open) => {
          if (open === false) menuDataInstance.clearExpandItems();
        }}
        open={isExpand}
        content={<div className={childClassName}>{child}</div>}
      >
        <MenuItem item={item} level={level} isSubMenu isExpand={isExpand} />
      </Popover>
    </div>
  );
};

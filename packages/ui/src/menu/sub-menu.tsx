import { useMemo } from 'react';
import type { MenuItemType } from '../context/menu-data';
import { useMenuData, menuDataInstance } from '../context/menu-data';
import { MenuItem, MainMenuItem } from './menu-item';
import clsx from 'clsx';
import { useSetting } from '../context/setting';
import { DisclosureItem } from '../components/disclosure';
import { Popover } from '../components/popover';
import { useDarkModeInstanceContext } from '../context/dark-mode';

export interface MenuItemProps {
  item: MenuItemType;
  level?: number;
  isMain?: boolean;
}

export const SubMenu = (props: MenuItemProps) => {
  const { item, level = 0, isMain = false } = props;
  const [state] = useMenuData();
  const expandItems = state.expandItems;
  const mainExpandItem = state.mainExpandItem;
  const [settingState] = useSetting();
  const sideMenuMode = settingState.sideMenuMode;
  const [darkModeState] = useDarkModeInstanceContext();
  const darkMode = darkModeState.darkMode;

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

  const childClassName = useMemo(() => {
    return clsx('fairys_admin_sub_menu_body shrink-0 flex flex-col gap-y-[2px]');
  }, []);

  const popoverClassName = useMemo(() => {
    return clsx('fairys_admin_sub_menu_popover', {
      dark: !!darkMode,
    });
  }, [darkMode]);

  const render = useMemo(() => {
    if (sideMenuMode !== 'close') {
      return (
        <div className="fairys_admin_sub_menu shrink-0 flex flex-col gap-y-[2px] ">
          {isMain ? <MainMenuItem item={item} /> : <MenuItem item={item} level={level} isSubMenu isExpand={isExpand} />}
          <DisclosureItem open={isMain ? true : isExpand} className={childClassName}>
            {child}
          </DisclosureItem>
        </div>
      );
    }
    return (
      <div className="fairys_admin_sub_menu shrink-0 flex flex-col gap-y-[2px]">
        <Popover
          className={popoverClassName}
          onOpenChange={(open) => {
            if (open === false) {
              menuDataInstance.clearExpandItems();
              menuDataInstance.updateMainExpandItem(undefined);
            }
          }}
          open={isExpand}
          content={<div className={childClassName}>{child}</div>}
        >
          {isMain ? <MainMenuItem item={item} /> : <MenuItem item={item} level={level} isSubMenu isExpand={isExpand} />}
        </Popover>
      </div>
    );
  }, [child, childClassName, isMain, isExpand, item, level, popoverClassName, sideMenuMode]);
  return render;
};

import { Fragment, useEffect, useMemo } from 'react';
import { useMenuData, MenuInstanceContext, useMenuInstance, MenuItemType } from 'context/menu-data';
import { SubMenu } from './sub-menu';
import { MenuItem } from './menu-item';
import { useSetting } from 'context/setting';

const createChildMenu = (item: MenuItemType, level?: number) => {
  if (Array.isArray(item.children)) {
    return <SubMenu key={item.path} item={item} level={level} />;
  }
  return <MenuItem key={item.path} item={item} level={level} />;
};

const createChildMenus = (childMenuItems: MenuItemType[], level?: number) => {
  const child = childMenuItems.map((childItem) => createChildMenu(childItem, level));
  return child;
};

export const Menu = () => {
  const [state, menuDataInstance] = useMenuData();
  const menuItems = state.menuItems;
  const menuInstance = useMenuInstance();
  const [settingState] = useSetting();
  const sideMenuMode = settingState.sideMenuMode;
  const layoutMode = settingState.layoutMode;

  const isAllMenuItems = useMemo(() => {
    return ['left', 'mobile', 'left_header'].includes(layoutMode);
  }, [layoutMode]);

  const render = useMemo(() => {
    if (isAllMenuItems) {
      const _menuItems = menuDataInstance._menuItems || [];
      let isRenderMainFirst = false;
      return _menuItems.map((item) => {
        const childMenuItems = item.children || [];
        if (item.isMain) {
          if (isRenderMainFirst) {
            return <SubMenu key={item.path} item={item} isMain />;
          }
          isRenderMainFirst = true;
          const child = createChildMenus(childMenuItems);
          return <Fragment key={item.path}>{child}</Fragment>;
        }
        return createChildMenu(item);
      });
    }
    return menuItems.map((item) => createChildMenu(item));
  }, [menuItems, isAllMenuItems]);

  useEffect(() => {
    const unMount = menuInstance.addEventListener();
    return () => unMount();
  }, [menuInstance.dom]);

  useEffect(() => {
    if (['main_top_header'].includes(layoutMode)) {
      menuInstance.setMenuModeExpandCollapse('open');
    } else {
      menuInstance.setMenuModeExpandCollapse(sideMenuMode);
    }
  }, [sideMenuMode, layoutMode]);

  return useMemo(() => {
    return (
      <MenuInstanceContext.Provider value={menuInstance}>
        <div
          ref={menuInstance.dom}
          className="fairys_admin_menu transition-all duration-300 box-border flex flex-col gap-y-2 p-[8px] overflow-auto h-full no-scrollbar max-w-[220px]"
        >
          {render}
        </div>
      </MenuInstanceContext.Provider>
    );
  }, [render, menuInstance]);
};

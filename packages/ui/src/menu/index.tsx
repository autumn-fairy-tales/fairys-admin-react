import { Fragment, useEffect, useMemo } from 'react';
import { useMenuData, MenuInstanceContext, useMenuInstance, MenuItemType } from 'context/menu-data';
import { SubMenu } from './sub-menu';
import { MenuItem } from './menu-item';
import { useSetting } from 'context/setting';
import { PopoverBaseFloatingTreeParent } from 'components/popover-base';

const createChildMenu = (item: MenuItemType, level?: number) => {
  if (Array.isArray(item.items)) {
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
      return _menuItems.map((item) => {
        const childMenuItems = item.items || [];
        if (item.isMain) {
          if (item.left_isMainShow) {
            return <SubMenu key={item.path} item={item} isMain />;
          }
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
        <PopoverBaseFloatingTreeParent key={layoutMode}>
          <div
            ref={menuInstance.dom}
            className="fairys_admin_menu fairys:transition-all fairys:duration-300 fairys:box-border fairys:flex fairys:flex-col fairys:gap-y-2 fairys:p-[8px] fairys:overflow-auto fairys:h-full no-scrollbar fairys:max-w-[220px]"
          >
            {render}
          </div>
        </PopoverBaseFloatingTreeParent>
      </MenuInstanceContext.Provider>
    );
  }, [render, menuInstance, layoutMode]);
};

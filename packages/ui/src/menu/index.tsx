import { useMemo } from 'react';
import { useMenuData, menuDataInstance } from './../context/menu-data';
import { useLocation } from 'react-router';
import { SubMenu } from './sub-menu';
import { MenuItem } from './menu-item';

export const Menu = () => {
  const [state] = useMenuData();
  const menuItems = state.menuItems;
  const location = useLocation();

  useMemo(() => {
    menuDataInstance.onExpandItems(location.pathname);
  }, [location.pathname]);

  const render = useMemo(() => {
    return menuItems.map((item) => {
      // 是否存在子集
      if (Array.isArray(item.children)) {
        return <SubMenu key={item.path} item={item} />;
      }
      return <MenuItem key={item.path} item={item} />;
    });
  }, [menuItems]);

  return <div className="fairys_admin_menu box-border p-[8px] overflow-auto h-full no-scrollbar">{render}</div>;
};

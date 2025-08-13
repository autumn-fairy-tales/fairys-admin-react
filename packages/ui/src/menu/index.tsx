import { useEffect, useMemo } from 'react';
import { useMenuData, MenuInstanceContext, useMenuInstance } from './../context/menu-data';
import { SubMenu } from './sub-menu';
import { MenuItem } from './menu-item';

export const Menu = () => {
  const [state] = useMenuData();
  const menuItems = state.menuItems;
  const menuInstance = useMenuInstance();
  const render = useMemo(() => {
    return menuItems.map((item) => {
      // 是否存在子集
      if (Array.isArray(item.children)) {
        return <SubMenu key={item.path} item={item} />;
      }
      return <MenuItem key={item.path} item={item} />;
    });
  }, [menuItems]);

  useEffect(() => {
    const unMount = menuInstance.addEventListener();
    return () => unMount();
  }, [menuInstance.dom]);

  return (
    <MenuInstanceContext.Provider value={menuInstance}>
      <div
        ref={menuInstance.dom}
        className="fairys_admin_menu box-border flex flex-col gap-y-2 p-[8px] overflow-auto h-full no-scrollbar"
      >
        {render}
      </div>
    </MenuInstanceContext.Provider>
  );
};

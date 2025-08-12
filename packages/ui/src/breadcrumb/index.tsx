import { Fragment, useMemo } from 'react';
import { menuDataInstance } from './../context/menu-data';
import type { MenuItemType } from '../context/menu-data';
import { useLocation, useNavigate } from 'react-router';

export const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = useMemo(() => {
    return menuDataInstance._parentMenuItemMap.get(location.pathname);
  }, [location.pathname]);

  if (!menuItems) {
    return <Fragment />;
  }
  const _menuItems = location.pathname === '/' ? menuItems : [{ path: '/', title: '主页' }, ...menuItems];
  const onClick = (item: MenuItemType) => {
    if (item.path === '/') {
      navigate(item.path);
    }
  };

  return (
    <div className="fairys_admin_breadcrumb relative flex items-center min-h-[36px] p-[8px] box-border">
      {_menuItems.map((item, index) => {
        const isLast = index === _menuItems.length - 1;
        const cls = isLast ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 hover:text-gray-300';
        return (
          <div
            key={item.path}
            onClick={() => onClick(item)}
            className={`fairys_admin_breadcrumb_item rounded-sm py-[6px] transition px-[14px] bg-gray-100  hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-600 ${cls} relative cursor-pointer`}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

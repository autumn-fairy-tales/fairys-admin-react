import { Fragment, useMemo } from 'react';
import { menuDataInstance } from './../context/menu-data';
import type { MenuItemType } from '../context/menu-data';
import { useLocation, useNavigate } from 'react-router';
import clsx from 'clsx';

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
        const className = clsx(
          'fairys_admin_breadcrumb_item transition-all duration-300 relative cursor-pointer rounded-sm py-[6px]  px-[14px] ',
          {
            'text-gray-500 hover:text-gray-500': isLast,
            'text-gray-400 hover:text-gray-500': !isLast,
            'bg-gray-100 hover:bg-gray-100': isLast,
            'bg-gray-100 hover:bg-gray-200': !isLast,
            'dark:text-gray-300 dark:hover:text-gray-200': isLast,
            'dark:text-gray-400 dark:hover:text-gray-300': !isLast,
            'dark:bg-gray-800 dark:hover:bg-gray-700': true,
          },
        );
        return (
          <div key={item.path} onClick={() => onClick(item)} className={className}>
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

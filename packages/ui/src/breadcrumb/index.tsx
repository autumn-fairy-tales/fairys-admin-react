import { Fragment, useMemo } from 'react';
import { menuDataInstance, useMenuDataInstance } from 'context/menu-data';
import { useLocation } from 'react-router';
import { FairysBreadcrumbBase } from 'components/breadcrumb';

export const Breadcrumb = () => {
  const location = useLocation();
  const [menuState] = useMenuDataInstance();
  const menuItems = useMemo(() => {
    return menuDataInstance.get_parent_menuItems(location.pathname);
  }, [location.pathname, menuState.menuItems, menuState.mainMenuItemSelected]);
  if (!menuItems) {
    return <Fragment />;
  }
  return <FairysBreadcrumbBase className="fairys-admin-breadcrumb" items={menuItems} />;
};

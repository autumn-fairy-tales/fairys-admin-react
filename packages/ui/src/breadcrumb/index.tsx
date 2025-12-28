import { Fragment, useMemo } from 'react';
import { menuDataInstance } from 'context/menu-data';
import { useLocation } from 'react-router';
import { FairysBreadcrumbBase } from 'components/breadcrumb';

export const Breadcrumb = () => {
  const location = useLocation();
  const menuItems = useMemo(() => {
    return menuDataInstance._parentMenuItemMap.get(location.pathname);
  }, [location.pathname]);
  if (!menuItems) {
    return <Fragment />;
  }
  return <FairysBreadcrumbBase className="fairys-admin-breadcrumb" items={menuItems} />;
};

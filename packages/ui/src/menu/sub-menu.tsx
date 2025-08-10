import { Fragment, useMemo } from 'react';
import type { MenuItemType } from '../context/menu-data';
import { useMenuData } from '../context/menu-data';
import { MenuItem } from './menu-item';

export interface MenuItemProps {
  item: MenuItemType;
  level?: number;
}

export const SubMenu = (props: MenuItemProps) => {
  const { item, level = 0 } = props;
  const [state] = useMenuData();
  const expandItems = state.expandItems;

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

  return (
    <div className="fairys_admin_sub_menu">
      <MenuItem item={item} level={level} isSubMenu isExpand={isExpand} />
      {isExpand ? <div className="fairys_admin_sub_menu_body">{child}</div> : <Fragment />}
    </div>
  );
};

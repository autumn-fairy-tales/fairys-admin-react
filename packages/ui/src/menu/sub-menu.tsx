import { Fragment, useMemo } from 'react';
import type { MenuItemType } from '../context/menu-data';
import { useMenuData } from '../context/menu-data';
import { MenuItem } from './menu-item';
import { Transition, TransitionChild } from '@headlessui/react';
import clsx from 'clsx';
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

  const childClassName = useMemo(() => {
    return clsx('fairys_admin_sub_menu_body shrink-0 flex flex-col gap-y-[2px]', [
      'data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-150 data-leave:ease-in',
    ]);
  }, []);

  return (
    <div className="fairys_admin_sub_menu shrink-0 flex flex-col gap-y-[2px] ">
      <MenuItem item={item} level={level} isSubMenu isExpand={isExpand} />
      <Transition transition show={isExpand}>
        <div className={childClassName}>{child}</div>
      </Transition>
    </div>
  );
};

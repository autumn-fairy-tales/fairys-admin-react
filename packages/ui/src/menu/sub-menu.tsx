import { useMemo } from 'react';
import type { MenuItemType } from '../context/menu-data';
import { useMenuData } from '../context/menu-data';
import { MenuItem } from './menu-item';
import clsx from 'clsx';
import { useSetting } from '../context/setting';
import { Popover, PopoverButton, PopoverPanel, useClose, Transition } from '@headlessui/react';
export interface MenuItemProps {
  item: MenuItemType;
  level?: number;
}

export const SubMenu = (props: MenuItemProps) => {
  const { item, level = 0 } = props;
  const [state] = useMenuData();
  const expandItems = state.expandItems;
  const [settingState] = useSetting();
  const sideMenuMode = settingState.sideMenuMode;

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
      'data-closed:scale-95 data-closed:transform-all data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in',
    ]);
  }, []);

  if (sideMenuMode !== 'close') {
    return (
      <div className="fairys_admin_sub_menu shrink-0 flex flex-col gap-y-[2px] ">
        <MenuItem item={item} level={level} isSubMenu isExpand={isExpand} />
        <Transition transition show={isExpand}>
          <div className={childClassName}>{child}</div>
        </Transition>
      </div>
    );
  }

  return (
    <div className="fairys_admin_sub_menu shrink-0 flex flex-col gap-y-[2px] ">
      <Popover>
        <PopoverButton as="div" className="shrink-0">
          <MenuItem item={item} level={level} isSubMenu isExpand={isExpand} />
        </PopoverButton>
        <PopoverPanel
          transition
          anchor={{ to: 'right start', padding: '20px' }}
          className="bg-white dark:bg-gray-800! rounded-sm shadow-xl inset-shadow-sm transition duration-300 ease-in-out [--anchor-gap:--spacing(1)] data-closed:-translate-y-1 data-closed:opacity-0"
        >
          <div className={childClassName}>{child}</div>
        </PopoverPanel>
      </Popover>
    </div>
  );
};

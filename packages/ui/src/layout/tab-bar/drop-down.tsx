import { Fragment, useMemo, useState } from 'react';
import { useTabBar, TabBarItemType, tabBarInstance } from '../../context/tab-bar';
import { Icon } from '@iconify/react';
import { useNavigate, matchPath, useLocation } from 'react-router';
import { Popover, usePopoverInstanceContext } from './../../components/popover';

const Items = () => {
  const [state] = useTabBar();
  const navigate = useNavigate();
  const list = state.dropDownTabBarItems;
  const location = useLocation();
  const popoverInstance = usePopoverInstanceContext();

  const onNativeClick = (item: TabBarItemType, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(item.path);
    popoverInstance.onOpenChange?.(false);
  };

  const onClose = (item: TabBarItemType, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const match = matchPath(item.path, location.pathname);
    tabBarInstance.remove(item.path, !!match, navigate);
    popoverInstance.onOpenChange?.(false);
  };

  const render = useMemo(() => {
    return (list || []).map((item) => {
      return (
        <div
          onClick={(e) => onNativeClick(item, e)}
          key={item.path}
          className="shrink-0 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100 transition flex flex-row items-center gap-1 px-[20px] py-[10px] cursor-pointer"
        >
          {item.icon ? (
            <span className="size-[16px]">
              <Icon icon={item.icon} className="size-[16px]" />
            </span>
          ) : (
            <Fragment />
          )}
          <div className="flex-1  whitespace-nowrap">{item.title}</div>
          <span
            className="icon-[ant-design--close-outlined] ml-5 text-gray-400 hover:text-gray-600"
            onClick={(e) => onClose(item, e)}
          />
        </div>
      );
    });
  }, [list]);

  return <div className="flex flex-col relative">{render}</div>;
};

const PopoverButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} placement="left-start" content={<Items />} onOpenChange={setOpen}>
      <div
        onClick={() => setOpen(!open)}
        className="w-[25px] h-[25px] flex justify-center items-center text-sm/6 font-semibold  bg-white dark:bg-gray-600 text-gray-400 hover:text-gray-600 cursor-pointer dark:text-gray-400 dark:hover:text-white"
      >
        <span className="icon-[ant-design--caret-down-outlined]" />
      </div>
    </Popover>
  );
};

export const DropDownTabBarItems = () => {
  const [state] = useTabBar();
  const list = state.dropDownTabBarItems;
  const isEmpty = list.length === 0;

  return useMemo(() => {
    if (isEmpty) {
      return <Fragment />;
    }
    return (
      <div className="h-full  flex items-center justify-center w-[50px]">
        <PopoverButton />
      </div>
    );
  }, [isEmpty]);
};

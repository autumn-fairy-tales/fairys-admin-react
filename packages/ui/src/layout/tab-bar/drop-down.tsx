import { Popover, PopoverButton, PopoverPanel, useClose } from '@headlessui/react';
import { Fragment, useMemo } from 'react';
import { useTabBar, TabBarItemType, tabBarInstance } from '../../context/tab-bar';
import { Icon } from '@iconify/react';
import { useNavigate, matchPath, useLocation } from 'react-router';

const Items = () => {
  const close = useClose();
  const [state] = useTabBar();
  const navigate = useNavigate();
  const list = state.dropDownTabBarItems;
  const location = useLocation();

  const onNativeClick = (item: TabBarItemType, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(item.path);
    close();
  };

  const onClose = (item: TabBarItemType, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const match = matchPath(item.path, location.pathname);
    tabBarInstance.remove(item.path, !!match, navigate);
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
  }, [list, close]);

  return <div className="flex flex-col relative">{render}</div>;
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
      <Fragment>
        <Popover className="h-full  flex items-center justify-center w-[50px]">
          <PopoverButton className="w-[25px] h-[25px] text-sm/6 font-semibold focus:outline-none bg-white dark:bg-gray-600 text-gray-400 hover:text-gray-600 cursor-pointer dark:text-gray-400 dark:hover:text-white">
            <span className="icon-[ant-design--caret-down-outlined]" />
          </PopoverButton>
          <PopoverPanel
            transition
            anchor={{ to: 'left start', gap: '4px' }}
            className="rounded-sm bg-white dark:bg-gray-800! shadow-xl inset-shadow-sm text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
          >
            <Items />
          </PopoverPanel>
        </Popover>
      </Fragment>
    );
  }, [isEmpty]);
};

import { Popover, PopoverButton, PopoverPanel, useClose } from '@headlessui/react';
import { Fragment, useMemo } from 'react';
import { useTabBar, TabBarItemType } from '../../context/tab-bar';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router';

const Items = () => {
  const close = useClose();
  const [state] = useTabBar();
  const navigate = useNavigate();
  const list = state.dropDownTabBarItems;

  const onNativeClick = (item: TabBarItemType) => {
    navigate(item.path);
    close();
  };

  const render = useMemo(() => {
    return (list || []).map((item) => {
      return (
        <div
          onClick={() => onNativeClick(item)}
          key={item.path}
          className="shrink-0 text-gray-400 transition-[background-color] flex flex-row items-center gap-1 px-[20px] py-[10px] cursor-pointer"
        >
          {item.icon ? (
            <span className="size-[16px]">
              <Icon icon={item.icon} className="size-[16px]" />
            </span>
          ) : (
            <Fragment />
          )}
          <div className="flex-1  whitespace-nowrap">{item.title}</div>
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
        <Popover className="h-full border-s border-gray-200">
          <PopoverButton className="h-full text-sm/6 font-semibold focus:outline-none w-[50px] text-gray-400 hover:text-gray-600 cursor-pointer">
            <span className="icon-[ant-design--caret-down-outlined] " />
          </PopoverButton>
          <PopoverPanel
            transition
            anchor={{ to: 'bottom start', gap: '4px' }}
            className="rounded-sm  bg-white shadow-xl text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
          >
            <Items />
          </PopoverPanel>
        </Popover>
      </Fragment>
    );
  }, [isEmpty]);
};

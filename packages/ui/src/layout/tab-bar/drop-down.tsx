import { Fragment, useMemo, useState } from 'react';
import { useTabBar, tabBarInstance } from 'context/tab-bar';
import { useNavigate, matchPath, useLocation } from 'react-router';
import { Popover, usePopoverInstanceContext } from 'components/popover';
import { PopoverMenu, PopoverMenuItem } from 'components/popover-menu';

const Items = () => {
  const [state] = useTabBar();
  const navigate = useNavigate();
  const list = state.dropDownTabBarItems as PopoverMenuItem[];
  const location = useLocation();
  const popoverInstance = usePopoverInstanceContext();

  const onNativeClick = (item: PopoverMenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(item.path);
    popoverInstance.onOpenChange?.(false);
  };

  const onClose = (item: PopoverMenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const match = matchPath(item.path, location.pathname);
    tabBarInstance.remove(item.path, !!match, navigate);
    /**最后一个关闭*/
    if (list.length === 1) {
      popoverInstance.onOpenChange?.(false);
    }
  };
  return <PopoverMenu items={list} onClick={onNativeClick} onClose={onClose} />;
};

const PopoverButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      className="border border-gray-100 dark:border-gray-700"
      open={open}
      placement="left-start"
      content={<Items />}
      onOpenChange={setOpen}
    >
      <div
        onClick={() => setOpen(!open)}
        className="w-[25px] h-[25px] flex justify-center items-center text-sm/6 font-semibold bg-white dark:bg-gray-600 text-gray-400 hover:text-gray-600 cursor-pointer dark:text-gray-400 dark:hover:text-white"
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

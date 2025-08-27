import { Fragment, useMemo } from 'react';
import { useTabBar, tabBarInstance } from 'context/tab-bar';
import { useNavigate, matchPath, useLocation } from 'react-router';
import { PopoverMenu, PopoverMenuItem } from 'components/popover-menu/popover-menu';

const PopoverButton = () => {
  const [state] = useTabBar();
  const navigate = useNavigate();
  const list = state.dropDownTabBarItems as PopoverMenuItem[];
  const location = useLocation();

  const onNativeClick = (item: PopoverMenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(item.path);
  };

  const onClose = (item: PopoverMenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const match = matchPath(item.path, location.pathname);
    tabBarInstance.remove(item.path, !!match, navigate);
  };

  return (
    <PopoverMenu items={list} onClickItem={onNativeClick} onCloseItem={onClose} isHideClose={false}>
      <div className="w-[25px] h-[25px] flex justify-center items-center text-sm/6 font-semibold bg-white dark:bg-gray-600 text-gray-400 hover:text-gray-600 cursor-pointer dark:text-gray-400 dark:hover:text-white">
        <span className="icon-[ant-design--caret-down-outlined]" />
      </div>
    </PopoverMenu>
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

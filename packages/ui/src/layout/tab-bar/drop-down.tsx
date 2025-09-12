import { Fragment, useMemo } from 'react';
import { useTabBar, tabBarInstance } from 'context/tab-bar';
import { useNavigate, matchPath, useLocation } from 'react-router';
import { FairysPopoverMenu, FairysPopoverMenuItemType } from 'components/popover-menu';

const PopoverButton = () => {
  const [state] = useTabBar();
  const navigate = useNavigate();
  const list = state.dropDownTabBarItems as FairysPopoverMenuItemType[];
  const location = useLocation();

  const onNativeClick = (item: FairysPopoverMenuItemType, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(item.path);
  };

  const onClose = (item: FairysPopoverMenuItemType, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const match = matchPath(item.path, location.pathname);
    tabBarInstance.remove(item.path, !!match);
  };

  return (
    <FairysPopoverMenu items={list} onClickItem={onNativeClick} onCloseItem={onClose} isHideClose={false}>
      <div className="fairys:w-[25px] fairys:h-[25px] fairys:flex fairys:justify-center fairys:items-center fairys:text-sm/6 fairys:font-semibold fairys:bg-white fairys:dark:bg-gray-600 fairys:text-gray-400 fairys:hover:text-gray-600 fairys:cursor-pointer fairys:dark:text-gray-400 fairys:dark:hover:text-white">
        <span className="fairys:icon-[ant-design--caret-down-outlined]" />
      </div>
    </FairysPopoverMenu>
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
      <div className="fairys:h-full  fairys:flex fairys:items-center fairys:justify-center fairys:w-[50px]">
        <PopoverButton />
      </div>
    );
  }, [isEmpty]);
};

import { useTabBar, TabBarItemType } from '../../context/tab-bar';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useMatch, useNavigate } from 'react-router';
import { Icon } from '@iconify/react';

interface TabBarItemProps {
  item: TabBarItemType;
}

const TabBarItem = (props: TabBarItemProps) => {
  const { item } = props;
  const navigate = useNavigate();
  const match = useMatch(item.path);
  // transition: background-color 0.3s ease-in-out;
  //
  const itemClassName = useMemo(() => {
    return clsx(
      'fairys_admin_tab_bar_item transition-[background-color] duration-150 ease-in-out relative flex flex-row items-center gap-1 px-[20px] py-[10px] cursor-pointer',
      {
        'hover:bg-gray-200': !match,
        'bg-white': !!match,
        active: !!match,
      },
    );
  }, [match]);

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(item.path);
  };

  const onClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('close');
  };

  return (
    <div className={itemClassName} onClick={onClick}>
      <Icon icon={item.icon} className="size-[16px]" />
      <div className="fairys_admin_tab_bar_item_title">{item.title}</div>
      <span
        className="icon-[ant-design--close-outlined] ml-5 text-gray-400 hover:text-gray-600"
        onClick={onClose}
      ></span>
    </div>
  );
};

export const TabBar = () => {
  const [state] = useTabBar();

  const tabBarItems = state.tabBarItems;

  const tabBarClassName = useMemo(() => {
    return clsx('fairys_admin_tab_bar flex bg-gray-300/25 ');
  }, []);

  const render = useMemo(() => {
    return tabBarItems.map((item) => {
      return <TabBarItem key={item.path} item={item} />;
    });
  }, [tabBarItems]);

  return <div className={tabBarClassName}>{render}</div>;
};

import { useFavoritesDataInstance } from 'context/favorites-data';
import { FairysButtonBase } from 'components/button';
import { FairysPopoverBase } from 'components/popover-base';
import { FairysMenuItemBase } from 'components/menu-item-base';
import { useMemo } from 'react';
import { tabBarDataInstance } from 'context';
import { useFloatingTree } from '@floating-ui/react';
import { useNavigate } from 'react-router';

export const Favorites = () => {
  const [state, favoritesDataInstance] = useFavoritesDataInstance();
  const dataList = state.dataList;
  const isEmpty = !dataList?.length;
  const tree = useFloatingTree();
  const navigate = useNavigate();

  const itemsRender = useMemo(() => {
    return dataList?.map((item) => {
      return (
        <FairysMenuItemBase
          key={item.path}
          icon={item.icon}
          iconProps={item.iconProps}
          onClick={() => {
            tabBarDataInstance.add(item.path);
            navigate(item.path);
            tree.events?.emit?.('click');
          }}
          onCloseItem={() => {
            favoritesDataInstance.removeItem(item);
          }}
        >
          {item.title}
        </FairysMenuItemBase>
      );
    });
  }, [dataList]);

  return (
    <div className="fairys_admin_tool_bar_favorites fairys:w-[300px] fairys:h-[400px] fairys:flex fairys:flex-col fairys:box-border">
      <div className="fairys_admin_tool_bar_favorites_title fairys:flex fairys:items-center fairys:justify-start fairys:p-3 fairys:font-medium fairys:border-b fairys:border-gray-200 fairys:dark:border-gray-800">
        我的收藏夹
      </div>
      <div className="fairys_admin_tool_bar_favorites_list fairys:flex-1 fairys:overflow-auto no-scrollbar fairys:box-border">
        {isEmpty ? (
          <div className="fairys:py-20 fairys:text-center fairys:text-[14px] fairys:text-gray-400">暂无收藏</div>
        ) : (
          <div className="fairys_admin_tool_bar_favorites_list_items fairys:grid fairys:grid-cols-2 fairys:p-3">
            {itemsRender}
          </div>
        )}
      </div>
    </div>
  );
};
export const FavoritesBtn = () => {
  return (
    <FairysPopoverBase placement="bottom" content={<Favorites />}>
      <FairysButtonBase className="fairys_admin_tool_bar_favorites_btn fairys:relative">
        <span className="fairys:icon-[ant-design--star-outlined] fairys:size-[18px]" />
      </FairysButtonBase>
    </FairysPopoverBase>
  );
};

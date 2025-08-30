import { ModalBase } from 'components/modal-base';
import { ButtonBase } from 'components/button';
import { Fragment } from 'react/jsx-runtime';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMenuData, MenuItemType, menuDataInstance } from 'context/menu-data';
import { Icon } from '@iconify/react';
import { BreadcrumbBase } from 'components/breadcrumb';
import { useNavigate } from 'react-router';
import hotkeys from 'hotkeys-js';

interface SearchItemProps {
  rowItemData: MenuItemType;
  onClose: (e: React.MouseEvent) => void;
}

const SearchItem = (props: SearchItemProps) => {
  const { rowItemData, onClose } = props;
  const navigate = useNavigate();

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onClose(e);
    navigate(rowItemData.path);
  };

  const parentItemsRender = useMemo(() => {
    const list = menuDataInstance._parentMenuItemMap.get(rowItemData.path);
    return (
      <BreadcrumbBase
        className="fairys:py-0! fairys:min-h-[auto]!"
        itemClassName="fairys:py-0! fairys:text-[12px]!"
        items={list}
        separate="slash"
      />
    );
  }, [rowItemData.path]);

  return (
    <div
      onClick={onClick}
      className="fairys_admin_tool_bar_menu_search_item fairys:hover:bg-gray-100 fairys:dark:hover:bg-gray-700 fairys:hover:*:first:text-(--theme-color) fairys:flex fairys:items-center fairys:flex-row fairys:min-h-[70px] fairys:transition-all fairys:duration-300 fairys:border fairys:rounded-sm fairys:box-border fairys:border-gray-200 fairys:dark:border-gray-700"
    >
      <div className="fairys:w-[65px] fairys:flex fairys:items-center fairys:justify-center fairys:icon  fairys:transition-all fairys:duration-300">
        <Icon icon={rowItemData.icon} className="fairys:size-[20px]" />
      </div>
      <div className="fairys:flex fairys:flex-col fairys:flex-1">
        <div className="fairys:px-[14px] fairys:font-medium fairys:text-gray-900 fairys:dark:text-gray-300">
          {rowItemData.title}
        </div>
        <div>{parentItemsRender}</div>
      </div>
    </div>
  );
};

const ModalBody = (props: { onClose: (e: React.MouseEvent) => void }) => {
  const [state, menuDataInstance] = useMenuData();
  const timer = useRef<NodeJS.Timeout>();
  const searchMenuItems = state.searchMenuItems || [];

  const onSearch: React.FormEventHandler<HTMLInputElement> = (event) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      // @ts-ignore
      menuDataInstance.onSearch(event.target.value);
    }, 500);
  };

  return (
    <div className="fairys:flex fairys:flex-col fairys:gap-2 fairys:h-full fairys:w-[670px] fairys:px-5 fairys:py-5 fairys:overflow-hidden fairys:box-border">
      <div className="fairys:flex fairys:items-center fairys:border fairys:border-gray-200 fairys:dark:border-gray-700 fairys:rounded-md ">
        <div className="fairys:pl-4 fairys:flex fairys:items-center fairys:justify-center">
          <span className="fairys:icon-[ant-design--search-outlined] fairys:size-[26px] fairys:text-gray-600 fairys:dark:text-gray-200" />
        </div>
        <input
          placeholder="搜索菜单"
          onInput={onSearch}
          className="fairys:flex-1 fairys:px-4 fairys:py-2 fairys:h-[48px] fairys:text-[16px] fairys:border-0 fairys:outline-0 fairys:bg-transparent"
        />
      </div>
      <div className="fairys:flex fairys:flex-col fairys:gap-2 fairys:overflow-auto fairys:flex-1 no-scrollbar">
        {searchMenuItems.map((ite) => {
          return <SearchItem onClose={props.onClose} key={ite.path} rowItemData={ite} />;
        })}
        {searchMenuItems.length === 0 && (
          <div className="fairys:text-center fairys:text-[14px] fairys:text-gray-500 fairys:flex fairys:items-center fairys:justify-center fairys:min-h-[150px]">
            暂无搜索结果
          </div>
        )}
      </div>
    </div>
  );
};

/**菜单搜索*/
export const MenuSearch = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      hotkeys('esc', (e) => {
        e.preventDefault();
        setOpen(false);
      });
    }
    return () => {
      hotkeys.unbind('esc');
    };
  }, [open]);

  useEffect(() => {
    hotkeys('command+k, ctrl+k', (e) => {
      e.preventDefault();
      setOpen(true);
    });
    return () => {
      hotkeys.unbind('command+k, ctrl+k');
    };
  }, [open]);

  return (
    <Fragment>
      <ButtonBase
        bordered
        className="fairys_admin_tool_bar_menu_search fairys:px-4 fairys:flex fairys:flex-row fairys:gap-x-2"
        onClick={() => setOpen(true)}
      >
        <span className="fairys:icon-[ant-design--search-outlined] fairys:size-[18px] fairys:text-gray-600 fairys:dark:text-gray-200 fairys:transition-all fairys:duration-300" />
        <span className="fairys:text-gray-400">搜索</span>
        <span className="fairys:text-gray-500 fairys:bg-gray-100 fairys:dark:bg-gray-800 fairys:px-2 fairys:rounded-sm fairys:transition-all fairys:duration-300">
          ⌘ K
        </span>
      </ButtonBase>
      <ModalBase outsidePressClose={false} open={open} onClose={() => setOpen(false)}>
        <ModalBody onClose={() => setOpen(false)} />
      </ModalBase>
    </Fragment>
  );
};

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
        className="py-0! min-h-[auto]!"
        itemClassName="py-0! text-[12px]!"
        items={list}
        separate="slash"
      />
    );
  }, [rowItemData.path]);

  return (
    <div
      onClick={onClick}
      className="fairys_admin_tool_bar_menu_search_item hover:bg-gray-100 dark:hover:bg-gray-700 hover:*:first:text-[var(--theme-color)] flex items-center flex-row min-h-[70px] transition-all duration-300 border rounded-sm box-border border-gray-200 dark:border-gray-700"
    >
      <div className="w-[65px] flex items-center justify-center icon  transition-all duration-300">
        <Icon icon={rowItemData.icon} className="size-[20px]" />
      </div>
      <div className="flex flex-col flex-1">
        <div className="px-[14px] font-medium text-gray-900 dark:text-gray-300">{rowItemData.title}</div>
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
    <div className="flex flex-col gap-2 h-full w-[670px] px-5 py-5 overflow-hidden box-border">
      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md ">
        <div className="pl-4 flex items-center justify-center">
          <span className="icon-[ant-design--search-outlined] size-[26px] text-gray-600 dark:text-gray-200" />
        </div>
        <input
          placeholder="搜索菜单"
          onInput={onSearch}
          className="flex-1 px-4 py-2 h-[48px] text-[16px] border-0 outline-0"
        />
      </div>
      <div className="flex flex-col gap-2 overflow-auto flex-1 no-scrollbar">
        {searchMenuItems.map((ite) => {
          return <SearchItem onClose={props.onClose} key={ite.path} rowItemData={ite} />;
        })}
        {searchMenuItems.length === 0 && (
          <div className="text-center text-[14px] text-gray-500 flex items-center justify-center min-h-[150px]">
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
        className="fairys_admin_tool_bar_menu_search px-4 flex flex-row gap-x-2"
        onClick={() => setOpen(true)}
      >
        <span className="icon-[ant-design--search-outlined] size-[18px] text-gray-600 dark:text-gray-200" />
        <span className="text-gray-400">搜索</span>
        <span className="text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 rounded-sm">⌘ K</span>
      </ButtonBase>
      <ModalBase open={open} onClose={() => setOpen(false)}>
        <ModalBody onClose={() => setOpen(false)} />
      </ModalBase>
    </Fragment>
  );
};

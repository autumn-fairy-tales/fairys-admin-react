import { useRef, Fragment, useMemo, createContext, useContext } from 'react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { proxy, useSnapshot } from 'valtio';

export interface PopoverMenuItem {
  /**图标*/
  icon?: string;
  /**标题*/
  title?: string;
  /**是否禁用*/
  disabled?: boolean;
  /**分割线*/
  isDivider?: boolean;
  /**是否显示*/
  visible?: boolean;
  /**自定义内容*/
  children?: React.ReactNode;
  /**点击当前项*/
  onClick?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  /**删除按钮事件*/
  onClose?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  /**value值*/
  value?: string;
  /**子项*/
  items?: PopoverMenuItem[];
  [key: string]: any;
}

export interface PopoverMenuProps {
  mode?: 'single' | 'multiple';
  onClick?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  onClose?: (item: PopoverMenuItem, event: React.MouseEvent) => void;
  items: PopoverMenuItem[];
  isHideClose?: boolean;
  className?: string;
  /**点击外部关闭(在弹框类中使用，用于关闭弹框)*/
  onOpenChange?: (open: boolean) => void;
  /**当使用这个时items每一项必须需要value值*/
  value?: string | string[];
  instance?: PopoverMenuInstance;
}

interface PopoverMenuInstanceState {
  value?: PopoverMenuProps['value'];
  __defaultValue?: string;
}

class PopoverMenuInstance {
  isHideClose?: PopoverMenuItem['isHideClose'];
  onClick?: PopoverMenuItem['onClick'];
  onClose?: PopoverMenuItem['onClose'];
  /**点击外部关闭(在弹框类中使用，用于关闭弹框)*/
  onOpenChange?: PopoverMenuProps['onOpenChange'];
  items: PopoverMenuProps['items'];
  mode: PopoverMenuProps['mode'];
  state = proxy<PopoverMenuInstanceState>({
    value: undefined,
  });
  /**判断是否选中*/
  isChecked = (item: PopoverMenuItem) => {
    if (this.state.value) {
      if (Array.isArray(this.state.value)) {
        return this.state.value.includes(item.value || '');
      }
      return this.state.value === item.value;
    }
    return false;
  };
}

const usePopoverMenuInstance = (instance?: PopoverMenuInstance) => {
  const ref = useRef<PopoverMenuInstance>();
  if (!ref.current) {
    if (instance) {
      ref.current = instance;
    } else {
      ref.current = new PopoverMenuInstance();
    }
  }
  return ref.current;
};

const PopoverMenuContext = createContext(new PopoverMenuInstance());

const usePopoverMenuContext = () => {
  const instance = useContext(PopoverMenuContext);
  const state = useSnapshot(instance.state);
  return [state, instance, state.__defaultValue] as [PopoverMenuInstanceState, PopoverMenuInstance, string];
};

const popoverMenuItemBaseCls = `shrink-0 text-gray-400 transition-all duration-300 flex flex-row items-center gap-1 py-[5px] px-[8px] mx-[5px] rounded-sm`;
const popoverMenuItemBaseClsDisabled = `opacity-70 select-none`;
const popoverMenuItemBaseClsNotDisabled = `text-gray-600 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100`;
const popoverMenuItemBaseClsActive = `active bg-(--theme-color)! text-white!`;

interface PopoverMenuItemProps {
  item: PopoverMenuItem;
  level?: number;
}

const Item = (props: PopoverMenuItemProps & { isSubMenu?: boolean }) => {
  const { item, level = 0, isSubMenu = false } = props;
  const [, instance] = usePopoverMenuContext();
  const isHideClose = instance.isHideClose;
  const onClickItem = (e: React.MouseEvent) => {
    if (item.disabled || isSubMenu) {
      return;
    }
    e.preventDefault();
    item.onClick?.(item, e);
    instance.onClick?.(item, e);
    if (instance.mode === 'multiple') {
      return;
    }
    instance.onOpenChange?.(false);
  };

  const onCloseItem = (e: React.MouseEvent) => {
    if (item.disabled || isSubMenu) {
      return;
    }
    e.preventDefault();
    item.onClose?.(item, e);
    instance.onClose?.(item, e);
    if (instance.mode === 'multiple') {
      return;
    }
    instance.onOpenChange?.(false);
  };

  const itemStyle = useMemo(() => {
    if (level) {
      return { paddingLeft: `${level * 10 + 8}px` };
    }
    return {};
  }, [level]);

  const expandIcon = useMemo(() => {
    return clsx(
      'close relative ms-1 w-[10px] after:bg-current before:bg-current after:-translate-y-[1px] before:-translate-y-[1px]',
    );
  }, []);

  return (
    <div
      onClick={onClickItem}
      style={itemStyle}
      className={clsx(popoverMenuItemBaseCls, {
        [popoverMenuItemBaseClsDisabled]: item.disabled,
        [popoverMenuItemBaseClsNotDisabled]: !item.disabled,
        [popoverMenuItemBaseClsActive]: instance.isChecked(item),
        'dark:bg-gray-700/75 bg-gray-100/75 text-gray-500!': isSubMenu,
      })}
      title={item.title}
    >
      {item.icon ? (
        <span className="size-[16px] mr-2">
          <Icon icon={item.icon} className="size-[16px]" />
        </span>
      ) : (
        <Fragment />
      )}
      <div className="flex-1 whitespace-nowrap">{item.title}</div>
      {isSubMenu ? (
        <div className="fairys_admin_down_up_icon">
          <div className={expandIcon} />
        </div>
      ) : (
        <Fragment />
      )}
      {!isHideClose && !isSubMenu ? (
        <span
          className="icon-[ant-design--close-outlined] ml-5 text-gray-400 hover:text-gray-600 dark:hover:text-white dark:text-gray-500 transition-all duration-300"
          onClick={onCloseItem}
        />
      ) : (
        <Fragment />
      )}
    </div>
  );
};

const SubItem = (props: PopoverMenuItemProps) => {
  const { item, level = 0 } = props;
  const { items } = item;
  const child = useMemo(() => {
    return (items || []).map((item, index) => createChildMenu(item, index, level + 1));
  }, [items, level]);

  return (
    <div className="flex flex-col relative">
      <Item item={item} isSubMenu level={level} />
      <div className="flex flex-col relative gap-1 py-[5px]">{child}</div>
    </div>
  );
};

const createChildMenu = (item: PopoverMenuItem, index: number, level?: number) => {
  if (item.children) {
    return <Fragment key={item.path || item.title || item.key || index}>{item.children}</Fragment>;
  } else if (item.visible === false) {
    return <Fragment key={item.path || item.title || item.key || index} />;
  } else if (item.isDivider) {
    return (
      <div key={item.path || item.title || item.key || index} className="w-full h-[1px] bg-gray-100 dark:bg-gray-700" />
    );
  } else if (Array.isArray(item.items)) {
    return <SubItem key={item.path || item.title || item.key || index} item={item} level={level} />;
  }
  return <Item key={item.path || item.title || item.key || index} item={item} level={level} />;
};

export const PopoverMenu = (props: PopoverMenuProps) => {
  const { onClick, onClose, items, isHideClose = false, className, onOpenChange, value, mode = 'single' } = props;
  const popoverMenuInstance = usePopoverMenuInstance();
  popoverMenuInstance.items = items;
  popoverMenuInstance.mode = mode;
  popoverMenuInstance.onClick = onClick;
  popoverMenuInstance.isHideClose = isHideClose;
  popoverMenuInstance.onClose = onClose;
  popoverMenuInstance.onOpenChange = onOpenChange;

  useMemo(() => {
    popoverMenuInstance.state.value = value;
  }, [value, popoverMenuInstance]);

  const render = useMemo(() => {
    return (items || []).map((item, index) => createChildMenu(item, index));
  }, [items]);
  const classNameBase = useMemo(() => {
    return clsx('flex flex-col relative gap-1 py-[5px]', className);
  }, [className]);

  return (
    <PopoverMenuContext.Provider value={popoverMenuInstance}>
      <div className={classNameBase}>{render}</div>
    </PopoverMenuContext.Provider>
  );
};

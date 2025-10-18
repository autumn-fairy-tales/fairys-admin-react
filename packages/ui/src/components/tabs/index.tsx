import { forwardRef, Ref, useMemo, Fragment } from 'react';
import {
  FairysTabsInstanceContext,
  useFairysTabsInstance,
  useFairysTabsInstanceContext,
  FairysTabsItemType,
} from './context';
import { Icon, IconProps } from '@iconify/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
export * from './context';

export interface FairysTabsItemProps {
  /**选项卡项*/
  item: FairysTabsItemType;
}

export interface FairysTabsProps {
  /**选项卡列表*/
  items: FairysTabsItemType[];
  /**当前选中的选项卡key*/
  activeKey?: string;
  /**选项卡选中回调*/
  onChange?: (key: string, item: FairysTabsItemType) => void;
}

export const FairysTabsItem = forwardRef((props: FairysTabsItemProps, ref: Ref<HTMLDivElement>) => {
  const { item } = props;
  const disabled = item.disabled;
  const [state, instance] = useFairysTabsInstanceContext();
  const selected = state.activeKey === item.key;
  const iconProps = item.iconProps as IconProps;

  const clsName = useMemo(() => {
    return clsx(
      'fairys_admin_tabs_item fairys:relative fairys:flex-1 fairys:cursor-pointer fairys:px-2 fairys:py-1 fairys:transition-all fairys:duration-300',
      {
        'fairys:opacity-50': disabled,
        'fairys:text-white': selected,
        'fairys:text-gray-600 fairys:dark:text-gray-400': !selected,
      },
    );
  }, [disabled, selected]);

  return (
    <motion.div
      ref={ref}
      className={clsName}
      onClick={(event) => {
        event.preventDefault();
        if (disabled) {
          return;
        }
        instance.onSelected(item);
      }}
    >
      {selected ? (
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            borderRadius: 15,
            top: 0,
            left: 0,
          }}
          layoutId="selected"
          initial={{ backgroundColor: 'var(--fairys-theme-color)' }}
          animate={{ backgroundColor: 'var(--fairys-theme-color)' }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        <Fragment />
      )}
      <div className="fairys_admin_tabs-item-content fairys:relative fairys:w-full fairys:h-full fairys:flex fairys:flex-row fairys:items-center fairys:justify-center fairys:gap-2">
        {item?.icon ? (
          <div className="fairys_admin_tabs-item-icon fairys:w-[26px] fairys:h-[26px] fairys:min-w-[26px] fairys:flex fairys:justify-center fairys:items-center">
            <Icon
              {...iconProps}
              icon={item.icon}
              className={`fairys:w-[16px] fairys:h-[16px] ${iconProps?.className || ''}`}
            />
          </div>
        ) : (
          <Fragment />
        )}
        <div>{item.title}</div>
      </div>
    </motion.div>
  );
});

export const FairysTabs = forwardRef((props: FairysTabsProps, ref: Ref<HTMLDivElement>) => {
  const { items, activeKey, onChange } = props;
  const instance = useFairysTabsInstance();
  instance.onChange = onChange;

  useMemo(() => {
    instance.state.activeKey = activeKey || '';
  }, [activeKey]);

  const itemRender = useMemo(() => {
    return items.map((item) => {
      return <FairysTabsItem key={item.key} item={item} />;
    });
  }, [items]);

  const clsName = useMemo(() => {
    return clsx('fairys_admin_tabs fairys:flex fairys:flex-row fairys:justify-evenly fairys:my-2');
  }, []);

  return (
    <FairysTabsInstanceContext.Provider value={instance}>
      <div ref={ref} className={clsName}>
        {itemRender}
      </div>
    </FairysTabsInstanceContext.Provider>
  );
});

import { forwardRef, Ref, Fragment, useId, useLayoutEffect, useMemo } from 'react';
import {
  FairysTabsInstanceContext,
  useFairysTabsInstance,
  useFairysTabsInstanceContext,
  FairysTabsItemType,
} from './context';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FairysIcon, FairysIconPropsType } from 'components/icon';
export * from './context';

export interface FairysTabsItemProps {
  /**选项卡项*/
  item: FairysTabsItemType;
  /**同一组 Tabs 的动画分组 id*/
  layoutGroupId?: string;
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
  const { item, layoutGroupId = 'fairys-tabs' } = props;
  const disabled = item.disabled;
  const [state, instance] = useFairysTabsInstanceContext();
  const selected = state.activeKey === item.key;
  const iconProps = item.iconProps as FairysIconPropsType;

  const clsName = useMemo(() => {
    return clsx(
      'fairys_admin_tabs_item fairys:relative fairys:flex-1 fairys:cursor-pointer fairys:px-2 fairys:py-1 fairys:transition-all fairys:duration-300',
      { 'fairys:opacity-50': disabled, active: selected },
    );
  }, [disabled, selected]);

  return (
    <motion.div
      ref={ref}
      className={clsName}
      role="tab"
      aria-selected={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={(event) => {
        event.preventDefault();
        if (disabled) {
          return;
        }
        instance.onSelected(item);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.currentTarget.click();
        }
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
          layoutId={`${layoutGroupId}-selected`}
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
            <FairysIcon className="fairys:w-[16px] fairys:h-[16px] " icon={item.icon} iconProps={iconProps} />
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
  const layoutGroupId = useId().replace(/:/g, '');
  instance.onChange = onChange;

  useLayoutEffect(() => {
    instance.state.activeKey = activeKey || '';
  }, [activeKey, instance]);

  const itemRender = useMemo(() => {
    return items.map((item) => {
      return <FairysTabsItem key={item.key} item={item} layoutGroupId={layoutGroupId} />;
    });
  }, [items]);

  const clsName = useMemo(() => {
    return clsx('fairys_admin_tabs fairys:flex fairys:flex-row fairys:justify-evenly fairys:my-2');
  }, []);

  return (
    <FairysTabsInstanceContext.Provider value={instance}>
      <div ref={ref} className={clsName} role="tablist">
        {itemRender}
      </div>
    </FairysTabsInstanceContext.Provider>
  );
});

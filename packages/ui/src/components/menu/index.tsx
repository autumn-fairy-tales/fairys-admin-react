/**
 * 菜单组件
 * 1. 支持水平和垂直方向
 * 2. 支持菜单展开和收起(横向变短)
 * 3. 支持菜单折叠(子菜单折叠)
 * 4. 支持菜单禁用
 * 5. 支持菜单展开单个父级
 * 6. 支持菜单展开多个父级
 * 7. 支持 移入/点击 菜单显示子菜单
 * 8. 支持分组菜单
 * 9. 支持分割线
 * 10. 默认展开子菜单
 * 11. 切换主题色
 * 12. 可以自定义 移入/点击菜单 弹出框渲染内容
 * 13. 自动滚动到选中菜单(单选菜单)
 * 14. 支持多选菜单
 */
import { forwardRef, useEffect, useMemo } from 'react';
import { FairysMenuProps } from './interface';
import { useFairysMenuInstance, FairysMenuInstanceContext } from './instance';
import { renderItems } from './utils';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { FairysPopoverBaseFloatingTreeParent } from 'components/popover-base';
import { useMergeRefs } from '@floating-ui/react';
export * from './interface';
export * from './instance';

export const FairysMenu = forwardRef((props: FairysMenuProps, ref: React.LegacyRef<HTMLDivElement>) => {
  const {
    className,
    style,
    items,
    menuInstance,
    mode = 'vertical',
    collapsedMode,
    selectedKey,
    openKeys,
    onClickItem,
    onClickSubItem,
    onClickGroupItem,
    isOnlyParentOpenKeys = false,
    size = 'default',
    activeMotionPrefixCls,
    firstLevelSize = 'default',
    maxWidth,
    firstGroupMode,
    collapsed,
    width,
  } = props;

  const propsKeys = Object.keys(props);
  const isOpenKeysField = propsKeys.includes('openKeys');
  const isSelectedKeyField = propsKeys.includes('selectedKey');
  const instance = useFairysMenuInstance(menuInstance);

  instance.propsKeys = propsKeys;
  instance.isOpenKeysField = isOpenKeysField;
  instance.isSelectedKeyField = isSelectedKeyField;
  instance.isOnlyParentOpenKeys = isOnlyParentOpenKeys;

  instance.onClickItem = onClickItem;
  instance.onClickSubItem = onClickSubItem;
  instance.onClickGroupItem = onClickGroupItem;

  const _class = useMemo(() => {
    return clsx(
      'fairys-menu fairys:transition-all fairys:duration-300 fairys:flex fairys:overflow-auto fairys:h-full no-scrollbar fairys:box-border',
      {
        'fairys:flex-col fairys:gap-y-1': mode === 'vertical',
        'fairys:flex-row fairys:gap-x-1': mode === 'horizontal',
        'fairys:max-w-[220px]': !collapsed && mode === 'vertical' && !width,
        'fairys:max-w-[80px]': collapsed && mode === 'vertical' && !width,
        'fairys:p-[8px]': size !== 'small' && firstLevelSize !== 'small',
      },
      className,
    );
  }, [mode, collapsed, size, className, !!width]);

  useMemo(() => instance.processMenuItems(items), [items]);
  useMemo(() => instance.setActiveMotionPrefixCls(activeMotionPrefixCls), [activeMotionPrefixCls]);
  useMemo(() => (instance.state.mode = mode), [mode]);
  useMemo(() => (instance.state.firstGroupMode = firstGroupMode), [firstGroupMode]);
  useMemo(() => (instance.state.collapsed = collapsed), [collapsed]);
  useMemo(() => (instance.state.maxWidth = maxWidth), [maxWidth]);
  useMemo(() => (instance.state.size = size), [size]);
  useMemo(() => (instance.state.firstLevelSize = firstLevelSize), [firstLevelSize]);
  useMemo(() => (instance.state.collapsedMode = collapsedMode), [collapsedMode]);
  // 当 selectedKey 传递时，根据 selectedKey 更新 selectedKey
  useMemo(() => {
    if (isSelectedKeyField) {
      instance.state.selectedKey = selectedKey;
    }
  }, [selectedKey, isSelectedKeyField]);

  // 当 openKeys 传递时，根据 openKeys 更新 selectedKey
  useMemo(() => {
    if (isOpenKeysField) {
      instance.state.openKeys = openKeys;
    }
  }, [openKeys, isOpenKeysField]);

  /**
   * 当 openKeys 未传递时，根据 selectedKey 更新 openKeys
   */
  useMemo(() => {
    if (!isOpenKeysField) {
      instance.updatedOpenKeys(selectedKey);
    }
  }, [selectedKey, isOpenKeysField, items, collapsedMode]);

  const render = useMemo(() => {
    return renderItems(items, { level: -1 });
  }, [items]);

  useEffect(() => {
    const unMount = instance.addEventListener();
    return () => unMount();
  }, [instance.dom]);

  const mergeRef = useMergeRefs([instance.dom, ref] as any[]);

  return (
    <FairysPopoverBaseFloatingTreeParent>
      <FairysMenuInstanceContext.Provider value={instance}>
        <motion.div ref={mergeRef} className={_class} style={{ maxWidth, width, ...style }}>
          {render}
        </motion.div>
      </FairysMenuInstanceContext.Provider>
    </FairysPopoverBaseFloatingTreeParent>
  );
});

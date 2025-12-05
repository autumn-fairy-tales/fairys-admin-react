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

export const FairysMenu = forwardRef((props: FairysMenuProps, ref: React.LegacyRef<HTMLDivElement>) => {
  const {
    items,
    menuInstance,
    mode = 'vertical',
    collapsedMode,
    selectedKey,
    openKeys,
    onClickItem,
    onClickSubItem,
    isOnlyParentOpenKeys = false,
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

  const isCollapsed = collapsedMode === 'icon' || collapsedMode === 'inline';

  const _class = useMemo(() => {
    return clsx(
      'fairys-menu fairys:transition-all fairys:duration-300 fairys:flex fairys:p-[8px] fairys:overflow-auto fairys:h-full no-scrollbar fairys:box-border',
      {
        'fairys:flex-col fairys:gap-y-[2px]': mode === 'vertical',
        'fairys:flex-row fairys:gap-x-[2px]': mode === 'horizontal',
        'fairys:max-w-[220px]': !isCollapsed && mode === 'vertical',
        'fairys:max-w-[80px]': isCollapsed && mode === 'vertical',
      },
    );
  }, [mode, isCollapsed]);

  useMemo(() => instance.processMenuItems(items), [items]);
  useMemo(() => (instance.state.mode = mode), [mode]);
  useMemo(() => (instance.state.collapsedMode = collapsedMode), [collapsedMode]);
  useMemo(() => {
    if (isSelectedKeyField) {
      instance.state.selectedKey = selectedKey;
    }
  }, [selectedKey, isSelectedKeyField]);

  useMemo(() => {
    if (isOpenKeysField) {
      instance.state.openKeys = openKeys;
    }
  }, [openKeys, isOpenKeysField]);

  useMemo(() => {
    if (!isOpenKeysField) {
      instance.updatedOpenKeys(selectedKey);
    }
  }, [selectedKey, isOpenKeysField]);

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
        <motion.div ref={mergeRef} className={_class}>
          {render}
        </motion.div>
      </FairysMenuInstanceContext.Provider>
    </FairysPopoverBaseFloatingTreeParent>
  );
});

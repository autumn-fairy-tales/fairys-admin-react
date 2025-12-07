import { forwardRef, Fragment, useEffect, useMemo } from 'react';
import { FairysMenuItemType } from './interface';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { FairysIcon } from 'components/icon';
import { useFairysMenuInstanceContext, useFairysMenuItemInstance } from './instance';
import { UtilsItemOptions } from './utils';
import { useMergeRefs, useFloatingTree } from '@floating-ui/react';

export interface FairysMenuItemProps {
  item: FairysMenuItemType;
  expandCollapse?: boolean;
  isExpandCollapse?: boolean;
  utilsItemOptions?: UtilsItemOptions;
}

const menuItemBaseClassName =
  'fairys:shrink-0 fairys:transition-all fairys:duration-300 fairys:rounded-sm fairys:flex fairys:items-center fairys:justify-between fairys:cursor-pointer fairys:dark:text-gray-400 fairys:relative fairys:gap-1 fairys:box-border';

const titleTextClassName =
  'fairys-menu-item_title-text fairys:flex-1 fairys:max-w-full fairys:text-ellipsis fairys:overflow-hidden fairys:whitespace-nowrap';

export const FairysMenuItem = forwardRef((props: FairysMenuItemProps, ref: React.LegacyRef<HTMLDivElement>) => {
  const { item, expandCollapse, isExpandCollapse, utilsItemOptions } = props;
  const { level: _level = 0, currentType, countGroupMenu, countSubMenu } = utilsItemOptions || {};
  const { className, style, iconProps, icon, extra, disabled, type } = item;

  const [state, instance] = useFairysMenuInstanceContext();
  const collapsedMode = state.collapsedMode;
  const selectedKey = state.selectedKey;
  const _size = state.size;
  const firstLevelSize = state.firstLevelSize;
  const mode = state.mode;
  const activeMotionPrefixCls = state.activeMotionPrefixCls;
  const collapsed = state.collapsed;
  const firstGroupMode = state.firstGroupMode;

  const floatingTree = useFloatingTree();
  // 选中项
  const _isActive = useMemo(() => instance.isActive(item.path), [item.path, selectedKey]);
  let isActive = _isActive;

  /**判断 菜单缩小模式 下 subMenu 选中情况*/
  const isCollapsedCheck = useMemo(() => instance.isCollapsed(item.path), [item.path, selectedKey]);

  let size = _size;
  let level = _level;

  const collapsedSubMenuIndex = useMemo(
    () => [...utilsItemOptions.menuTypes].reverse().findIndex((type) => type === 'subMenu'),
    [utilsItemOptions.menuTypes],
  );

  const isFlexCol = useMemo(() => {
    let isFlexCol = false;
    if (collapsed) {
      // 第一层/伪第一层  全部 Col
      // 1. 父级全是组菜单，并且没有 subMenu 菜单  firstGroupMode 为 hover 或 click，则 countGroupMenu 相当于 countSubMenu 值
      // 2. 父级组菜单，当前菜单是 subMenu 菜单
      // 3. 父级没有组菜单，也没有 subMenu 菜单
      if (_level === 0) {
        isFlexCol = true;
      } else if (utilsItemOptions.countSubMenu === 0 && utilsItemOptions.countGroupMenu === 0) {
        isFlexCol = true;
      } else if (utilsItemOptions.countSubMenu === 0) {
        if (firstGroupMode === 'hover' || firstGroupMode === 'click') {
          isFlexCol = utilsItemOptions.countGroupMenu === 1 && utilsItemOptions.currentType === 'group';
        } else {
          isFlexCol = true;
        }
      } else if (
        utilsItemOptions.countGroupMenu &&
        utilsItemOptions.countSubMenu === 1 &&
        utilsItemOptions.currentType === 'subMenu'
      ) {
        if (firstGroupMode === 'hover' || firstGroupMode === 'click') {
          isFlexCol = utilsItemOptions.countGroupMenu === 1 && utilsItemOptions.groupLevel === -1;
        } else {
          isFlexCol = true;
        }
      }
    }
    return isFlexCol;
  }, [collapsed, _level, firstGroupMode, utilsItemOptions]);

  // 菜单缩小模式 下计算缩进距离
  if (isFlexCol) {
    level = 0;
  }
  // 第一层菜单大小
  if (isFlexCol) {
    size = firstLevelSize;
  }

  /**菜单缩小模式 第一层 subMenu 菜单展示选中项*/
  if (isFlexCol || mode === 'horizontal') {
    isActive = _isActive || isCollapsedCheck;
  }

  const menuItemInstance = useFairysMenuItemInstance();
  menuItemInstance.item = item;
  menuItemInstance.isActive = isActive;

  useEffect(() => {
    const onMount = instance.register(menuItemInstance);
    return () => onMount();
  }, [menuItemInstance]);

  // 跳转后滚动到当前菜单
  useEffect(() => {
    if (!!isActive && menuItemInstance.dom.current) {
      menuItemInstance.scrollIntoView();
    }
  }, [isActive, menuItemInstance.dom]);

  const _class = useMemo(() => {
    return clsx('fairys-menu-item', menuItemBaseClassName, className, {
      'fairys:px-[8px] fairys:py-[4px] fairys:min-h-[36px]': size !== 'small',
      'fairys:px-[8px] fairys:py-[4px]': size !== 'default',
      active: !!isActive,
      'fairys:text-white fairys:dark:text-white': !!isActive,
      'fairys:hover:bg-gray-200/75 fairys:dark:hover:bg-gray-600': !isActive && !disabled && type !== 'group',
      'fairys:justify-center': isFlexCol,
      'fairys:opacity-90': type === 'group',
    });
  }, [className, isActive, collapsed, disabled, type, isFlexCol]);

  const expandIcon = useMemo(() => {
    return clsx(
      'fairys:relative fairys:ms-1 fairys:w-[10px] fairys:after:bg-current fairys:before:bg-current fairys:after:-translate-y-[1px] fairys:before:-translate-y-[1px]',
      {
        expand: expandCollapse,
        close: !expandCollapse,
      },
    );
  }, [expandCollapse]);

  const _classBody = useMemo(() => {
    const isRow = !collapsed;
    return clsx(
      'fairys-menu-item_body fairys:flex fairys:items-center fairys:relative fairys:gap-1 fairys:overflow-hidden',
      {
        [`data-level=${level}`]: true,
        'fairys:flex-col': isFlexCol,
        // 'fairys:flex-col': collapsed && (collapsedSubMenuIndex === -1 || (collapsedSubMenuIndex === 0 && level === 0)) && firstGroupMode !== 'click' && firstGroupMode !== 'hover',
        'fairys:flex-row': isRow,
        'fairys:opacity-50': disabled,
      },
    );
  }, [level, collapsed, disabled, isFlexCol]);

  const _styleBody = useMemo(() => {
    if (level === 0) {
      return {};
    }
    if (collapsed || mode === 'horizontal') {
      // 折叠模式下计算缩进距离
      if (collapsedSubMenuIndex === -1) {
        return {};
      }
      return {
        paddingLeft: `${(collapsedSubMenuIndex - 1) * 20}px`,
      };
    }
    return {
      paddingLeft: `${level * 20}px`,
    };
  }, [level, collapsed, collapsedSubMenuIndex, mode]);

  const _classExtra = useMemo(() => {
    return clsx('fairys-menu-item_extra', {
      'fairys:absolute fairys:top-1/2 fairys:-translate-y-1/2 fairys:me-2': collapsed,
    });
  }, [collapsed]);

  const _classIcon = useMemo(() => {
    // const isFlexCol  的时候， 图标大小为 26px
    return clsx({
      'fairys:size-[26px]': isFlexCol,
      'fairys:size-[16px]': !isFlexCol,
    });
  }, [collapsed, isFlexCol]);

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 禁用项 或 分组项 或 已选中项 不响应点击事件
    if (item.disabled || isActive) {
      return;
    }
    if (type === 'group') {
      instance.onClickGroupItem(item, event, instance);
    } else if (isExpandCollapse) {
      instance._onClickSubItem(item, event, instance);
    } else {
      instance._onClickItem(item, event, instance);
      floatingTree?.events?.emit?.('click');
    }
  };

  const mergeRef = useMergeRefs([menuItemInstance.dom, ref] as any[]);

  /**是否显示标题*/
  const isShowTitle = collapsedMode !== 'icon' || _level !== 0;

  /**是否显示折叠图标
   *
   * 1. collapsed === true 时， 第一层不显示
   * 2. collapsed === true 时， 分组菜单下的 subMenu 不显示
   *
   */
  const isShowExpandCollapse = useMemo(() => {
    if (collapsed) {
      return !isFlexCol && isExpandCollapse;
    } else if (mode === 'horizontal' && isExpandCollapse) {
      if ((countSubMenu === 0 && countGroupMenu === 1) || (countSubMenu === 1 && countGroupMenu === 0)) {
        return false;
      }
    }
    return isExpandCollapse;
  }, [collapsed, level, isExpandCollapse, countGroupMenu, countSubMenu]);

  return (
    <motion.div title={item.title} style={style} className={_class} onClick={onClick} ref={mergeRef}>
      {!!isActive ? (
        <motion.div
          className="fairys:rounded-sm w-full h-full fairys:absolute fairys:top-0 fairys:left-0"
          layoutId={`${activeMotionPrefixCls}-${currentType}-selected`}
          initial={{ backgroundColor: 'var(--fairys-theme-color)' }}
          animate={{ backgroundColor: 'var(--fairys-theme-color)' }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        <Fragment />
      )}
      <div className={_classBody} style={_styleBody}>
        {icon ? (
          <span className={_classIcon}>
            <FairysIcon className={_classIcon} icon={icon} iconProps={iconProps} />
          </span>
        ) : (
          <Fragment />
        )}
        {isShowTitle ? <span className={titleTextClassName}>{item.title}</span> : <Fragment />}
        {extra ? <div className={_classExtra}>{extra}</div> : <Fragment />}
      </div>
      {isShowExpandCollapse ? (
        <div className="fairys-menu-item_expand-icon fairys_admin_down_up_icon">
          <div className={expandIcon} />
        </div>
      ) : (
        <Fragment />
      )}
    </motion.div>
  );
});

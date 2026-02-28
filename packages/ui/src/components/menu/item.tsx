import { forwardRef, Fragment, useEffect, useMemo } from 'react';
import { FairysMenuItemType } from './interface';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { FairysIcon } from 'components/icon';
import { useFairysMenuInstanceContext, useFairysMenuItemInstance } from './instance';
import { UtilsItemOptions } from './utils';
import { useMergeRefs, useFloatingTree } from '@floating-ui/react';
import { UtilsColor } from 'utils/utils.color';

export interface FairysMenuItemProps {
  item: FairysMenuItemType;
  expandCollapse?: boolean;
  isExpandCollapse?: boolean;
  utilsItemOptions?: UtilsItemOptions;
}

const menuItemBaseClassName =
  'fairys:shrink-0 fairys:transition-all fairys:duration-300 fairys:flex fairys:items-center fairys:justify-between fairys:cursor-pointer fairys:relative fairys:gap-1 fairys:box-border';

const titleTextClassName =
  'fairys-menu-item_title-text fairys:flex-1 fairys:max-w-full fairys:text-ellipsis fairys:overflow-hidden fairys:whitespace-nowrap';

export const FairysMenuItem = forwardRef((props: FairysMenuItemProps, ref: React.LegacyRef<HTMLDivElement>) => {
  const { item, expandCollapse, isExpandCollapse, utilsItemOptions } = props;
  const { level: _level = 0, countGroupMenu, countSubMenu } = utilsItemOptions;
  const { className, style, iconProps, icon, extra, disabled } = item;

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
  if (level === 0 && firstLevelSize !== 'default') {
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

  /**移入样式*/
  const _classHover = useMemo(() => {
    return clsx('fairys:shrink-0 fairys:rounded-sm', {
      'fairys_admin_menu_base-item_hover': !isActive && !disabled && utilsItemOptions.currentType !== 'group',
    });
  }, [isActive, disabled, utilsItemOptions.currentType]);

  const _class = useMemo(() => {
    let isTextColorThemeColor = false;
    // 选中的父级默认 使用 --fairys-theme-color 颜色
    // firstGroupMode === 'click'、'hover' 时，选中的父级默认 使用 --fairys-theme-color 颜色
    // subMenu 选中时，默认使用 --fairys-theme-color 颜色
    if (isCollapsedCheck) {
      if (utilsItemOptions.currentType === 'subMenu') {
        if (collapsed) {
          // 折叠的时候，第一层不显示，已经存在背景色了
          isTextColorThemeColor = utilsItemOptions.countSubMenu > 1;
        } else {
          isTextColorThemeColor = true;
        }
      } else if (
        (firstGroupMode === 'click' || firstGroupMode === 'hover') &&
        collapsed &&
        utilsItemOptions.currentType === 'group'
      ) {
        isTextColorThemeColor = true;
      }
    }

    // 如果 collapsed 为 true, 判断是否 firstGroupMode === 'click'、'hover' ，如果是则除第一层其他层显示
    let isGroupBorderBottom = false;

    if (utilsItemOptions.currentType === 'group') {
      // 折叠模式
      if (collapsed) {
        // 折叠模式下，判断是否 firstGroupMode === 'click'、'hover' ，如果是则除第一层其他层显示 border-bottom
        if (firstGroupMode === 'click' || firstGroupMode === 'hover') {
          isGroupBorderBottom = utilsItemOptions.countGroupMenu > 1;
        } else if (firstGroupMode === 'onlyGroup') {
          isGroupBorderBottom = false;
        } else {
          isGroupBorderBottom = true;
        }
      } else {
        // 非折叠模式
        isGroupBorderBottom = true;
      }
      // 水平模式下，除了一级菜单，其他菜单都显示 border-bottom
      if (mode === 'horizontal') {
        // 如果是 subMenu 菜单，且有子菜单，则显示 border-bottom
        isGroupBorderBottom = utilsItemOptions.countGroupMenu > 1;
      }
      if (utilsItemOptions.countSubMenu) {
        isGroupBorderBottom = true;
      }
    }

    return clsx('fairys_admin_menu_base-item', menuItemBaseClassName, className, {
      'fairys:px-[8px] fairys:py-[4px] fairys:min-h-[36px]': size !== 'small',
      'fairys:px-[8px] fairys:py-[4px]': size !== 'default',
      active: !!isActive,
      'fairys:justify-center': isFlexCol,
      'fairys:opacity-90': utilsItemOptions.currentType === 'group',
      'fairys:text-(--fairys-theme-color)!': isTextColorThemeColor && !isActive,
      'fairys:border-b fairys:mb-1 ': isGroupBorderBottom,
      [UtilsColor.componentBorderClassNameBase]: isGroupBorderBottom,
      'fairys:rounded-sm': !isGroupBorderBottom,
    });
  }, [className, isActive, isCollapsedCheck, collapsed, disabled, isFlexCol, size, utilsItemOptions]);

  const expandIcon = useMemo(() => {
    return clsx(
      'fairys:relative fairys:ms-1 fairys:w-[10px] fairys:after:bg-current fairys:before:bg-current fairys:after:-translate-y-px fairys:before:-translate-y-px',
      {
        expand: expandCollapse,
        close: !expandCollapse,
      },
    );
  }, [expandCollapse]);

  const _classBody = useMemo(() => {
    const isRow = !collapsed;
    return clsx(
      'fairys_admin_menu_base-item_body fairys:flex fairys:items-center fairys:relative fairys:gap-1 fairys:overflow-hidden',
      {
        [`data-level=${level}`]: true,
        'fairys:flex-col': isFlexCol,
        'fairys:flex-row': isRow,
        'fairys:opacity-50': disabled,
      },
    );
  }, [level, collapsed, disabled, isFlexCol]);

  const _stylePaddingLeft = useMemo(() => {
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
    return clsx('fairys_admin_menu_base-item_extra', {
      'fairys:absolute fairys:top-1/2 fairys:-translate-y-1/2 fairys:me-2': collapsed,
    });
  }, [collapsed]);

  const _classIcon = useMemo(() => {
    // const isFlexCol  的时候， 图标大小为 26px
    return clsx({
      'fairys:size-[22px]': isFlexCol,
      'fairys:size-[16px]': !isFlexCol,
    });
  }, [collapsed, isFlexCol]);

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 禁用项 或 分组项 或 已选中项 不响应点击事件
    if (item.disabled || isActive) {
      return;
    }
    if (utilsItemOptions.currentType === 'group') {
      instance.onClickGroupItem(item, event, instance, utilsItemOptions.currentType);
    } else if (isExpandCollapse) {
      instance._onClickSubItem(item, event, instance, utilsItemOptions.currentType);
    } else {
      instance._onClickItem(item, event, instance, utilsItemOptions.currentType);
      /**在 在点击菜单后，关闭 因 点击/移入 展开的弹框 进行关闭*/
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
    <motion.div
      title={item.title}
      style={style}
      className="fairys_admin_menu_base-item-warp fairys:shrink-0 fairys:relative fairys:box-border"
      onClick={onClick}
      ref={mergeRef}
    >
      {!!isActive ? (
        <motion.div
          className="fairys:rounded-sm w-full h-full fairys:absolute fairys:top-0 fairys:left-0"
          layoutId={`${activeMotionPrefixCls}-${utilsItemOptions.currentType}-selected`}
          initial={{ backgroundColor: 'var(--fairys-theme-color)' }}
          animate={{ backgroundColor: 'var(--fairys-theme-color)' }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        <Fragment />
      )}
      {/* 行整体 移入样式在这个地方加 */}
      <div className={_classHover}>
        {/*  padding-left */}
        <div style={_stylePaddingLeft}>
          <div className={_class}>
            {/* 整体数据渲染，高度，padding 之类的 */}
            <div className={_classBody}>
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
          </div>
        </div>
      </div>
    </motion.div>
  );
});

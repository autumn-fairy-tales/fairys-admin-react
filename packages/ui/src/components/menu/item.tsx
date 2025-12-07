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
  'fairys-menu-item_title-text fairys:flex-1 fairys:text-ellipsis fairys:overflow-hidden fairys:whitespace-nowrap';

export const FairysMenuItem = forwardRef((props: FairysMenuItemProps, ref: React.LegacyRef<HTMLDivElement>) => {
  const { item, expandCollapse, isExpandCollapse, utilsItemOptions } = props;
  const { level: _level = 0, currentType } = utilsItemOptions || {};
  const { className, style, iconProps, icon, extra, disabled, type } = item;

  const [state, instance] = useFairysMenuInstanceContext();
  const collapsedMode = state.collapsedMode;
  const selectedKey = state.selectedKey;
  const _size = state.size;
  const firstLevelSize = state.firstLevelSize;
  const mode = state.mode;
  const activeMotionPrefixCls = state.activeMotionPrefixCls;

  const floatingTree = useFloatingTree();
  // 选中项
  const _isActive = useMemo(() => instance.isActive(item.path), [item.path, selectedKey]);
  let isActive = _isActive;

  /**判断 菜单缩小模式 下 subMenu 选中情况*/
  const isCollapsedCheck = useMemo(() => instance.isCollapsed(item.path), [item.path, selectedKey]);

  /**判断是否 菜单缩小模式*/
  const _isCollapsed = collapsedMode === 'icon' || collapsedMode === 'vertical';

  let size = _size;

  let level = _level;
  const collapsedSubMenuIndex = useMemo(
    () => [...utilsItemOptions.menuTypes].reverse().findIndex((type) => type === 'subMenu'),
    [utilsItemOptions.menuTypes],
  );

  /**菜单缩小模式 第一层 subMenu 菜单展示选中项*/
  if (level === 0 && (_isCollapsed || mode === 'horizontal')) {
    isActive = _isActive || isCollapsedCheck;
  }

  // 菜单缩小模式 下计算缩进距离
  if (collapsedSubMenuIndex === -1 && _isCollapsed) {
    level = 0;
  }
  // 第一层菜单大小
  if (level === 0 && firstLevelSize !== 'default') {
    size = firstLevelSize;
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

  /**最顶层才生效*/
  const isCollapsed = _isCollapsed && level === 0;

  const _class = useMemo(() => {
    return clsx('fairys-menu-item', menuItemBaseClassName, className, {
      'fairys:px-[8px] fairys:py-[4px] fairys:min-h-[36px]': size !== 'small',
      'fairys:px-[8px] fairys:py-[4px]': size !== 'default',
      active: !!isActive,
      'fairys:text-white fairys:dark:text-white': !!isActive,
      'fairys:hover:bg-gray-200/75 fairys:dark:hover:bg-gray-600': !isActive && !disabled && type !== 'group',
      'fairys:justify-center': isCollapsed,
      'fairys:opacity-90': type === 'group',
    });
  }, [className, isActive, isCollapsed, disabled, type]);

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
    return clsx(
      'fairys-menu-item_body fairys:flex fairys:items-center fairys:relative fairys:gap-1 fairys:overflow-hidden',
      {
        [`data-level=${level}`]: true,
        'fairys:flex-col': isCollapsed,
        'fairys:flex-row': !isCollapsed,
        'fairys:opacity-50': disabled,
      },
    );
  }, [level, isCollapsed, disabled]);

  const _styleBody = useMemo(() => {
    if (level === 0) {
      return {};
    }
    if (_isCollapsed || mode === 'horizontal') {
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
  }, [level, _isCollapsed, collapsedSubMenuIndex, mode]);

  const _classExtra = useMemo(() => {
    return clsx('fairys-menu-item_extra', {
      'fairys:absolute fairys:top-1/2 fairys:-translate-y-1/2 fairys:me-2': isCollapsed,
    });
  }, [isCollapsed]);

  const _classIcon = useMemo(() => {
    return clsx({
      'fairys:size-[26px]': collapsedMode === 'vertical',
      'fairys:size-[16px]': !isCollapsed || collapsedMode === 'icon',
    });
  }, [isCollapsed, collapsedMode]);

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 禁用项 或 分组项 或 已选中项 不响应点击事件
    if (item.disabled || type === 'group' || isActive) {
      return;
    }
    if (isExpandCollapse) {
      instance._onClickSubItem(item, event, instance);
    } else {
      instance._onClickItem(item, event, instance);
      floatingTree?.events?.emit?.('click');
    }
  };

  const mergeRef = useMergeRefs([menuItemInstance.dom, ref] as any[]);

  /**是否显示标题*/
  const isShowTitle = collapsedMode !== 'icon' || _level !== 0;

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
      {expandIcon && isExpandCollapse && !isCollapsed ? (
        <div className="fairys-menu-item_expand-icon fairys_admin_down_up_icon">
          <div className={expandIcon} />
        </div>
      ) : (
        <Fragment />
      )}
    </motion.div>
  );
});

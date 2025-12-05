import { Fragment, useMemo } from 'react';
import { FairysMenuItemType } from './interface';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { FairysIcon } from 'components/icon';
import { useFairysMenuInstanceContext } from './instance';

export interface FairysMenuItemProps {
  item: FairysMenuItemType;
  expandCollapse?: boolean;
  isExpandCollapse?: boolean;
  /**层级，用于计算缩进距离*/
  level?: number;
}

const menuItemBaseClassName =
  'fairys:shrink-0 fairys:transition-all fairys:duration-300 fairys:rounded-sm fairys:flex fairys:items-center fairys:justify-between fairys:cursor-pointer fairys:dark:text-gray-400 fairys:relative fairys:gap-1 fairys:px-[14px] fairys:py-[8px] fairys:min-h-[36px]';

const titleClassName =
  'fairys_admin_menu_item_title fairys:flex fairys:flex-1 fairys:items-center fairys:justify-center fairys:overflow-hidden fairys:gap-1';

const titleTextClassName =
  'fairys-menu-item_title-text fairys:flex-1 fairys:text-ellipsis fairys:overflow-hidden fairys:whitespace-nowrap';

export const FairysMenuItem = (props: FairysMenuItemProps) => {
  const { item, expandCollapse, isExpandCollapse, level = 0 } = props;
  const { className, style, iconProps, icon, extra, disabled } = item;
  const [state, instance] = useFairysMenuInstanceContext();
  const collapsedMode = state.collapsedMode;
  const selectedKey = state.selectedKey;

  // 选中项
  const isActive = useMemo(() => instance.isActive(item.path), [item.path, selectedKey]);

  /**判断菜单是否缩放*/
  const isCollapsed = collapsedMode === 'icon' || collapsedMode === 'inline';

  const _class = useMemo(() => {
    return clsx('fairys-menu-item', menuItemBaseClassName, className, {
      active: !!isActive,
      'fairys:text-white fairys:dark:text-white': !!isActive,
      'fairys:hover:bg-gray-200/75 fairys:dark:hover:bg-gray-600': !isActive && !disabled,
      'fairys:justify-center': isCollapsed,
    });
  }, [className, isActive, isCollapsed, disabled]);

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
    return clsx('fairys-menu-item_body fairys:flex fairys:items-center fairys:relative fairys:gap-1', {
      [`data-level=${level}`]: true,
      'fairys:flex-col': isCollapsed,
      'fairys:flex-row': !isCollapsed,
      'fairys:opacity-50': disabled,
    });
  }, [level, isCollapsed, disabled]);

  const _styleBody = useMemo(() => {
    if (isCollapsed) {
      return {};
    }
    return {
      paddingLeft: `${level * 20}px`,
    };
  }, [level]);

  const _classExtra = useMemo(() => {
    return clsx('fairys-menu-item_extra', {
      'fairys:absolute fairys:top-1/2 fairys:-translate-y-1/2 fairys:me-2': isCollapsed,
    });
  }, [isCollapsed]);

  const _classIcon = useMemo(() => {
    return clsx({
      'fairys:size-[26px]': isCollapsed,
      'fairys:size-[16px]': !isCollapsed,
    });
  }, [isCollapsed]);

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (item.disabled) {
      return;
    }
    if (isExpandCollapse) {
      instance._onClickSubItem(item, event, instance);
    } else {
      instance._onClickItem(item, event, instance);
    }
  };

  return (
    <motion.div title={item.title} style={style} className={_class} onClick={onClick}>
      {!!isActive ? (
        <motion.div
          className="fairys:rounded-sm w-full h-full fairys:absolute fairys:top-0 fairys:left-0"
          layoutId="fairys-menu-item-selected"
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
        {collapsedMode !== 'icon' ? <span className={titleTextClassName}>{item.title}</span> : <Fragment />}
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
};

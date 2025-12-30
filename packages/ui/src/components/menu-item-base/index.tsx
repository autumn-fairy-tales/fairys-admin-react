import { forwardRef, Ref, useMemo, Fragment } from 'react';
import clsx from 'clsx';
import { FairysIcon, FairysIconPropsType } from 'components/icon';
import { UtilsColor } from 'utils/utils.color';

export interface FairysMenuItemBaseProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**图标名*/
  icon?: string;
  /**图标属性*/
  iconProps?: FairysIconPropsType;
  /**额外内容*/
  extra?: React.ReactNode;
  /**关闭项事件*/
  onCloseItem?: React.MouseEventHandler<HTMLSpanElement>;
  /**是否显示关闭项*/
  isShowClose?: boolean;
  /**是否禁用*/
  disabled?: boolean;
  /**是否激活*/
  isActive?: boolean;
  /**是否边框*/
  bordered?: boolean;
  /**是否文本省略号*/
  isTextEllipsis?: boolean;
}

const BaseClassName = `fairys:shrink-0 fairys:transition-all fairys:duration-300 fairys:flex fairys:flex-row fairys:items-center fairys:justify-between fairys:gap-1 fairys:py-[5px] fairys:px-[8px] fairys:mx-[5px] fairys:rounded-sm`;
const DisabledClassName = `fairys:opacity-70 fairys:select-none`;
const NotDisabledClassName = `fairys:cursor-pointer fairys:text-(--fairys-admin-menu-item-base-text-color) fairys:hover:text-(--fairys-admin-menu-item-base-hover-text-color)  fairys:dark:hover:bg-(--fairys-admin-menu-item-base-hover-bg-color)`;
const ActiveClassName = `active fairys:bg-(--fairys-admin-menu-item-base-active-bg-color)! fairys:text-(--fairys-admin-menu-item-base-active-text-color)!`;

export const FairysMenuItemBase = forwardRef((props: FairysMenuItemBaseProps, ref: Ref<HTMLDivElement>) => {
  const {
    icon,
    iconProps,
    extra,
    children,
    onCloseItem,
    isShowClose = true,
    disabled = false,
    isActive,
    bordered = true,
    isTextEllipsis = true,
    ...rest
  } = props;

  const clx = useMemo(() => {
    return clsx('fairys_admin_menu_item_base', BaseClassName, {
      [DisabledClassName]: disabled,
      [NotDisabledClassName]: !disabled,
      [ActiveClassName]: isActive,
      'fairys:border-0': !bordered,
      'fairys:border': bordered,
      [UtilsColor.componentBorderClassNameBase]: bordered,
    });
  }, [disabled, isActive, bordered]);

  const textClx = useMemo(() => {
    return clsx('fairys:flex-1', {
      'fairys:truncate fairys:overflow-hidden fairys:whitespace-nowrap fairys:text-ellipsis fairys:break-all':
        isTextEllipsis,
    });
  }, [isTextEllipsis]);

  const onCloseClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onCloseItem?.(e);
  };

  return (
    <div ref={ref} {...rest} className={clx} title={typeof children === 'string' ? children : undefined}>
      <div className="fairys:flex fairys:items-center fairys:flex-1 fairys:overflow-hidden">
        {icon ? (
          <span className="fairys:size-[16px] fairys:mr-2">
            <FairysIcon className="fairys:size-[16px]" icon={icon} iconProps={iconProps} />
          </span>
        ) : (
          <Fragment />
        )}
        <div className={textClx}>{children}</div>
      </div>
      <div className="fairys:flex fairys:items-center">
        {extra}
        {isShowClose ? (
          <span
            className="fairys:icon-[ant-design--close-outlined] fairys:ml-2 fairys:text-gray-400 fairys:hover:text-gray-600 fairys:dark:hover:text-white fairys:dark:text-gray-500 fairys:transition-all fairys:duration-300"
            onClick={onCloseClick}
          />
        ) : (
          <Fragment />
        )}
      </div>
    </div>
  );
});

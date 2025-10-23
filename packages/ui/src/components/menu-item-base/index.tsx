import { forwardRef, Ref, useMemo, Fragment } from 'react';
import clsx from 'clsx';
import { IconProps, Icon } from '@iconify/react';

export interface FairysMenuItemBaseProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**图标名*/
  icon?: string;
  /**图标属性*/
  iconProps?: IconProps;
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

const BaseClassName = `fairys:shrink-0 fairys:text-gray-400 fairys:transition-all fairys:duration-300 fairys:flex fairys:flex-row fairys:items-center fairys:justify-between fairys:gap-1 fairys:py-[5px] fairys:px-[8px] fairys:mx-[5px] fairys:rounded-sm`;
const DisabledClassName = `fairys:opacity-70 fairys:select-none`;
const NotDisabledClassName = `fairys:text-gray-600 fairys:cursor-pointer fairys:hover:text-gray-700 fairys:dark:text-gray-400 fairys:dark:hover:text-gray-300 fairys:dark:hover:bg-gray-700 fairys:hover:bg-gray-100`;
const ActiveClassName = `active fairys:bg-(--fairys-theme-color)! fairys:text-white!`;

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
      'fairys:border fairys:border-gray-300 fairys:dark:border-gray-600': bordered,
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
            <Icon {...iconProps} icon={icon} className={`fairys:size-[16px] ${iconProps?.className || ''}`} />
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

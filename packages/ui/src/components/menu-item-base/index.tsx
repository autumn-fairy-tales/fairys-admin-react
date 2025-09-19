import { forwardRef, Ref, useMemo, Fragment } from 'react';
import clsx from 'clsx';
import { IconProps, Icon } from '@iconify/react';

export interface FairysMenuItemBaseProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  icon?: string;
  iconProps?: IconProps;
  extra?: React.ReactNode;
  onCloseItem?: React.MouseEventHandler<HTMLSpanElement>;
  isShowClose?: boolean;
  disabled?: boolean;
  isActive?: boolean;
  bordered?: boolean;
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
            onClick={onCloseItem}
          />
        ) : (
          <Fragment />
        )}
      </div>
    </div>
  );
});

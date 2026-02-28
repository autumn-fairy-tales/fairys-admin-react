import clsx from 'clsx';
import { forwardRef, useMemo, Ref } from 'react';
import { UtilsColor } from 'utils/utils.color';

export interface FairysButtonBaseProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  /**是否为背景按钮*/
  isBg?: boolean;
  /**是否为边框按钮*/
  bordered?: boolean;
  /**按钮大小类名*/
  sizeClassName?: string;
}

export const FairysButtonBase = forwardRef((props: FairysButtonBaseProps, ref: Ref<HTMLButtonElement>) => {
  const {
    className,
    isBg,
    bordered = false,
    sizeClassName = 'fairys:min-w-[36px] fairys:min-h-[36px]',
    ...rest
  } = props;
  const baseClassName = useMemo(() => {
    return clsx(
      'fairys_button_base fairys_admin_button_base',
      [
        'fairys:outline-0',
        'fairys:flex fairys:items-center fairys:justify-center fairys:rounded-sm fairys:cursor-pointer fairys:px-2 fairys:py-1',
        'fairys:transition-all fairys:duration-300',
        // 'fairys:hover:bg-(--fairys-admin-button-base-hover-bg-color)',
        // isBg && 'fairys:bg-(--fairys-admin-button-base-bg-color)',
      ],
      {
        bg: isBg,
        'fairys:border-0': !bordered,
        'fairys:border ': bordered,
        [UtilsColor.componentBorderClassNameBase]: bordered,
        'fairys:bg-transparent': !isBg && !bordered,
      },
      sizeClassName,
      className,
    );
  }, [className, bordered, isBg, sizeClassName]);

  return <button {...rest} ref={ref} className={baseClassName} />;
});

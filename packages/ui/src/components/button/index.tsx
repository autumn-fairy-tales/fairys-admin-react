import clsx from 'clsx';
import { useMemo } from 'react';

interface ButtonBaseProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isBg?: boolean;
  bordered?: boolean;
}

export const ButtonBase = (props: ButtonBaseProps) => {
  const { className, isBg, bordered = false, ...rest } = props;
  const baseClassName = useMemo(() => {
    return clsx(
      'fairys_admin_button_base',
      [
        'outline-0',
        'flex items-center justify-center min-w-[36px] min-h-[36px] rounded-sm cursor-pointer',
        'transition-all duration-300 ',
        'hover:bg-gray-200 dark:hover:bg-gray-600 ',
        isBg && 'bg-gray-200 dark:bg-gray-600',
      ],
      {
        'border-0 bg-transparent': !bordered,
        'border border-gray-300 dark:border-gray-600': bordered,
      },
      className,
    );
  }, [className, bordered]);

  return <button {...rest} className={baseClassName} />;
};

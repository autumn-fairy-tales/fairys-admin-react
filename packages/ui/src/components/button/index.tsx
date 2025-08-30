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
      'fairys_admin_button_base ',
      [
        'fairys:outline-0',
        'fairys:flex fairys:items-center fairys:justify-center fairys:min-w-[36px] fairys:min-h-[36px] fairys:rounded-sm fairys:cursor-pointer',
        'fairys:transition-all duration-300',
        'fairys:hover:bg-gray-200 fairys:dark:hover:bg-gray-600 ',
        isBg && 'fairys:bg-gray-200 fairys:dark:bg-gray-600',
      ],
      {
        'fairys:border-0': !bordered,
        'fairys:border fairys:border-gray-300 fairys:dark:border-gray-600': bordered,
        'fairys:bg-transparent': !isBg && !bordered,
      },
      className,
    );
  }, [className, bordered, isBg]);

  return <button {...rest} className={baseClassName} />;
};

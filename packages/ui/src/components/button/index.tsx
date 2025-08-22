import clsx from 'clsx';
import { useMemo } from 'react';

interface ButtonBaseProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isBg?: boolean;
}

export const ButtonBase = (props: ButtonBaseProps) => {
  const { className, isBg, ...rest } = props;
  const baseClassName = useMemo(() => {
    return clsx(
      'fairys_admin_button_base',
      [
        'outline-0 border-0 bg-transparent ',
        'flex items-center justify-center size-[36px] rounded-sm cursor-pointer',
        'transition-all duration-300 ',
        'hover:bg-gray-200 dark:hover:bg-gray-600 ',
        isBg && 'bg-gray-200 dark:bg-gray-600',
      ],
      className,
    );
  }, [className]);

  return <button {...rest} className={baseClassName} />;
};

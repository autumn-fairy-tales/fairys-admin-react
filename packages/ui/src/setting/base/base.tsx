import { ReactNode, useMemo } from 'react';
import clsx from 'clsx';
interface LayoutItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: ReactNode;
  children: ReactNode;
  isDivider?: boolean;
  itemClassName?: string;
}

export const LayoutItem = (props: LayoutItemProps) => {
  const { label, children, className, isDivider, itemClassName, ...rest } = props;
  const title = useMemo(() => {
    if (isDivider) {
      return (
        <div
          className={clsx(
            'fairys:my-4 fairys:w-full fairys:flex fairys:items-center fairys:justify-center fairys:whitespace-nowrap fairys:text-[14px] fairys:font-medium fairys:gap-4',
            [
              'fairys:after:h-px fairys:after:w-full fairys:after:min-w-4 fairys:after:border-b fairys:after:border-gray-200 fairys:dark:after:border-gray-600  fairys:after:content-empty',
              'fairys:before:h-px fairys:before:w-full fairys:before:min-w-4 fairys:before:border-b fairys:before:border-gray-200 fairys:dark:before:border-gray-600  fairys:before:content-empty',
            ],
          )}
        >
          {label}
        </div>
      );
    }
    return <div className="fairys:font-medium fairys:text-[14px]">{label}</div>;
  }, [isDivider]);

  const itemClass = useMemo(() => {
    return clsx(
      'fairys:w-full fairys:flex fairys:justify-between fairys:items-center fairys:min-h-[36px] fairys:pb-4',
      className,
      {
        'fairys:flex-col': isDivider,
      },
    );
  }, [className, isDivider]);

  const itemChildClass = useMemo(() => {
    return clsx('', itemClassName, {
      'fairys:w-full fairys:flex fairys:items-center fairys:justify-center': isDivider,
      'fairys:w-auto': !isDivider,
    });
  }, [isDivider, itemClassName]);

  return (
    <div {...rest} className={itemClass}>
      {title}
      <div className={itemChildClass}>{children}</div>
    </div>
  );
};

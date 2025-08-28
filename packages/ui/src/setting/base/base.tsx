import { ReactNode, useMemo } from 'react';
import clsx from 'clsx';
interface LayoutItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: ReactNode;
  children: ReactNode;
  isDivider?: boolean;
}

export const LayoutItem = (props: LayoutItemProps) => {
  const { label, children, className, isDivider, ...rest } = props;
  const title = useMemo(() => {
    if (isDivider) {
      return (
        <div
          className={clsx(
            'my-4 w-full flex items-center justify-center whitespace-nowrap text-[14px] font-medium gap-4',
            [
              'after:h-px after:w-full after:min-w-4 after:border-b after:border-gray-200 dark:after:border-gray-600  after:content-empty',
              'before:h-px before:w-full before:min-w-4 before:border-b before:border-gray-200 dark:before:border-gray-600  before:content-empty',
            ],
          )}
        >
          {label}
        </div>
      );
    }
    return <div className="font-medium text-[14px]">{label}</div>;
  }, [isDivider]);

  const itemClass = useMemo(() => {
    return clsx('w-full flex justify-between items-center min-h-[36px] pb-4', className, {
      'flex-col': isDivider,
    });
  }, [className, isDivider]);

  const itemChildClass = useMemo(() => {
    return clsx('', {
      'w-full flex items-center justify-center': isDivider,
      'w-auto': !isDivider,
    });
  }, [isDivider]);

  return (
    <div {...rest} className={itemClass}>
      {title}
      <div className={itemChildClass}>{children}</div>
    </div>
  );
};

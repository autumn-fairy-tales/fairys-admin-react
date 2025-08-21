import { useMemo } from 'react';
import { MenuItemType } from 'context/menu-data';
import clsx from 'clsx';

export interface BreadcrumbBaseItemType extends MenuItemType {}

export interface BreadcrumbBaseProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  items?: BreadcrumbBaseItemType[];
  separate?: 'bg' | 'slash';
  itemClassName?: string;
  itemStyle?: React.CSSProperties;
}

export const BreadcrumbBase = (props: BreadcrumbBaseProps) => {
  const { items, separate = 'bg', className, itemClassName, itemStyle, ...rest } = props;

  const baseClassName = useMemo(() => {
    return clsx('fairys_admin_breadcrumb relative flex items-center min-h-[36px] py-[8px] box-border', className, {
      [separate]: !!separate,
    });
  }, [separate, className]);

  const render = useMemo(() => {
    return (items || []).map((item, index) => {
      const isLast = index === items.length - 1;
      const className = clsx(
        'fairys_admin_breadcrumb_item transition-all duration-300 relative cursor-pointer rounded-sm py-[6px] px-[14px] max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap ',
        {
          'text-gray-500 hover:text-gray-500': isLast,
          'text-gray-400 hover:text-gray-500': !isLast,
          'bg-gray-100 hover:bg-gray-100': isLast && separate === 'bg',
          'bg-gray-100 hover:bg-gray-200': !isLast && separate === 'bg',
          'dark:text-gray-300 dark:hover:text-gray-200': isLast,
          'dark:text-gray-400 dark:hover:text-gray-300': !isLast,
          'dark:bg-gray-800 dark:hover:bg-gray-700': separate === 'bg',
          'after:text-gray-200 dark:after:text-gray-600 after:content-["/"]': separate === 'slash',
        },
        itemClassName,
      );
      return (
        <div style={itemStyle} key={item.path} title={item.title} className={className}>
          {item.title}
        </div>
      );
    });
  }, [items, itemStyle]);

  return (
    <div {...rest} className={baseClassName}>
      {render}
    </div>
  );
};

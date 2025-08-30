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
    return clsx(
      'fairys_admin_breadcrumb fairys:relative fairys:flex fairys:items-center fairys:min-h-[36px] fairys:py-[8px] fairys:box-border',
      className,
      {
        [separate]: !!separate,
      },
    );
  }, [separate, className]);

  const render = useMemo(() => {
    return (items || []).map((item, index) => {
      const isLast = index === items.length - 1;
      const className = clsx(
        'fairys_admin_breadcrumb_item fairys:transition-all fairys:duration-300 fairys:relative fairys:cursor-pointer fairys:rounded-sm fairys:py-[6px] fairys:px-[14px] fairys:max-w-[150px] fairys:overflow-hidden fairys:text-ellipsis fairys:whitespace-nowrap',
        {
          'fairys:text-gray-500 fairys:hover:text-gray-500': isLast,
          'fairys:text-gray-400 fairys:hover:text-gray-500': !isLast,
          'fairys:bg-gray-100 fairys:hover:bg-gray-100': isLast && separate === 'bg',
          'fairys:bg-gray-100 fairys:hover:bg-gray-200': !isLast && separate === 'bg',
          'fairys:dark:text-gray-300 fairys:dark:hover:text-gray-200': isLast,
          'fairys:dark:text-gray-400 fairys:dark:hover:text-gray-300': !isLast,
          'fairys:dark:bg-gray-800 fairys:dark:hover:bg-gray-700': separate === 'bg',
          'fairys:after:text-gray-200 fairys:dark:after:text-gray-600 fairys:after:content-["/"]': separate === 'slash',
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

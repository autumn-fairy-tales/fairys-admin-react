import { useMemo } from 'react';
import { MenuItemType } from 'context/menu-data';
import clsx from 'clsx';

export interface FairysBreadcrumbBaseItemType extends MenuItemType {}

export interface FairysBreadcrumbBaseProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**面包屑项集合*/
  items?: FairysBreadcrumbBaseItemType[];
  /**分隔符，可选值为'bg'（背景颜色）或'slash'（斜杠）*/
  separate?: 'bg' | 'slash';
  /**面包屑项类名*/
  itemClassName?: string;
  /**面包屑项样式*/
  itemStyle?: React.CSSProperties;
  /**是否第一个面包屑项不添加padding*/
  isFristNoPadding?: boolean;
}

export const FairysBreadcrumbBase = (props: FairysBreadcrumbBaseProps) => {
  const { items, separate = 'bg', className, itemClassName, itemStyle, isFristNoPadding = false, ...rest } = props;

  const baseClassName = useMemo(() => {
    return clsx(
      'fairys_admin_breadcrumb fairys:relative fairys:flex fairys:items-center fairys:min-h-[36px] fairys:py-[8px] ',
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
        'fairys_admin_breadcrumb_item fairys:transition-all fairys:duration-300 fairys:relative fairys:cursor-pointer fairys:rounded-sm fairys:py-[6px] fairys:max-w-[150px] fairys:overflow-hidden fairys:text-ellipsis fairys:whitespace-nowrap',
        {
          'fairys:px-[14px]': (index !== 0 && isFristNoPadding) || !isFristNoPadding,
          'fairys:pr-[14px]': isFristNoPadding && index === 0,
          [separate]: true,
          last: isLast,
        },
        itemClassName,
      );
      return (
        <div style={itemStyle} key={item.path} title={item.title} className={className}>
          {item.title}
        </div>
      );
    });
  }, [items, itemStyle, isFristNoPadding]);

  return (
    <div {...rest} className={baseClassName}>
      {render}
    </div>
  );
};

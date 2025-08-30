import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { PopoverMenu, PopoverMenuItem } from 'components/popover-menu';
export interface SelectBaseProps {
  items?: PopoverMenuItem[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
  multiple?: boolean;
}

export const SelectBase = (props: SelectBaseProps) => {
  const { items = [], onChange, multiple = false, value, disabled = false } = props;
  const [isExpand, setIsExpand] = useState(false);
  const expandIcon = useMemo(() => {
    return clsx(
      'fairys:relative fairys:after:bg-current fairys:before:bg-current fairys:after:-translate-y-[1px] fairys:before:-translate-y-[1px]',
      {
        expand: isExpand,
        close: !isExpand,
      },
    );
  }, [isExpand]);

  const onMenuItemClick = (item: PopoverMenuItem) => {
    if (multiple) {
      if (Array.isArray(value)) {
        const finx = (value || []).find((it) => it === item.value);
        if (finx) {
          onChange?.(value.filter((it) => it !== item.value));
        } else {
          onChange?.(value.concat([item.value]));
        }
      } else {
        onChange?.([item.value]);
      }
    } else {
      onChange?.(item.value);
    }
  };

  const render = useMemo(() => {
    if ((Array.isArray(value) && value.length) || !value) {
      return '请选择';
    }
    if (multiple) {
      if (Array.isArray(value)) {
        return (value || [])
          .map((it) => {
            const item = items.find((i) => i.value === it);
            return item?.title;
          })
          .join(',');
      }
    }
    return items.find((it) => it.value === value)?.title;
  }, [value, items, multiple]);

  return (
    <PopoverMenu
      disabled={disabled}
      items={items}
      onOpenChange={(open) => setIsExpand(open)}
      onClickItem={onMenuItemClick}
      value={value}
    >
      <div className="fairys:min-w-[120px] fairys:min-h-[38px] fairys:px-[12px] fairys:py-[4px] fairys:border fairys:border-gray-200 fairys:dark:border-gray-700 fairys:rounded-sm fairys:cursor-pointer fairys:flex fairys:flex-row fairys:justify-between fairys:items-center">
        <span>{render}</span>
        <span className="fairys_admin_down_up_icon fairys:size-[16px] fairys:flex fairys:items-center fairys:justify-center fairys:relative">
          <div className={expandIcon} />
        </span>
      </div>
    </PopoverMenu>
  );
};

import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { PopoverMenu, PopoverMenuItem } from 'components/popover-menu/popover-menu';
export interface SelectBaseProps {
  items?: PopoverMenuItem[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
  multiple?: boolean;
}

export const SelectBase = (props: SelectBaseProps) => {
  const { items = [], onChange, multiple = false, value } = props;
  const [isExpand, setIsExpand] = useState(false);
  const expandIcon = useMemo(() => {
    return clsx(
      'relative ms-1 w-[10px] after:bg-current before:bg-current after:-translate-y-[1px] before:-translate-y-[1px]',
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
    <PopoverMenu items={items} onOpenChange={(open) => setIsExpand(open)} onClickItem={onMenuItemClick} value={value}>
      <div className="min-w-[120px] px-[8px] py-[4px] border border-gray-200 dark:border-gray-700 rounded-sm cursor-pointer flex flex-row justify-between items-center">
        <span>{render}</span>
        <span className="fairys_admin_down_up_icon ml-[4px]">
          <div className={expandIcon} />
        </span>
      </div>
    </PopoverMenu>
  );
};

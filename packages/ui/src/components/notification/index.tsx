import type { NotificationItemType } from 'context/notification-data';
import { ForwardedRef, forwardRef, Fragment, useMemo } from 'react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

export interface FairysNotificationItemProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item?: NotificationItemType;
  /**是否显示图标
   * @default true
   */
  isShowIcon?: boolean;
}

export const FairysNotificationItem = forwardRef(
  (props: FairysNotificationItemProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { item, className, isShowIcon = true, ...rest } = props;

    const clxName = useMemo(() => {
      return clsx(
        'fairys_admin_notification_item fairys:rounded-sm fairys:p-2 fairys:gap-2 fairys:w-full fairys:flex fairys:items-center fairys:flex-row fairys:cursor-pointer fairys:hover:bg-gray-100 fairys:dark:hover:bg-gray-600 fairys:transition-all fairys:duration-300',
        className,
        {
          [`fairys_admin_notification_item-${item?.type}`]: item?.type,
        },
      );
    }, [item?.type, className]);

    return (
      <div ref={ref} {...rest} className={clxName}>
        {isShowIcon ? (
          <div className="fairys_admin_notification_item-icon fairys:w-[36px] fairys:h-[36px] fairys:min-w-[36px] fairys:flex fairys:justify-center fairys:items-center">
            {item?.icon ? <Icon icon={item.icon} className="fairys:w-[16px] fairys:h-[16px]" /> : <Fragment />}
          </div>
        ) : (
          <Fragment />
        )}
        <div className="fairys_admin_notification_item_content fairys:flex fairys:flex-col fairys:flex-1 fairys:overflow-hidden">
          <div
            className="fairys_admin_notification_item_content_title fairys:text-[14px] fairys:font-medium fairys:text-ellipsis fairys:overflow-hidden fairys:whitespace-nowrap fairys:w-full"
            title={item?.title}
          >
            {item?.title}
          </div>
          <div className="fairys_admin_notification_item_content_date fairys:text-[12px] fairys:text-gray-400 fairys:break-words">
            {item?.date}
          </div>
        </div>
      </div>
    );
  },
);

export interface FairysNotificationListProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  items?: NotificationItemType[];
  /**是否显示图标
   * @default true
   */
  isShowIcon?: boolean;
}

export const FairysNotificationList = forwardRef(
  (props: FairysNotificationListProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { items, className, isShowIcon, ...rest } = props;
    const clxName = useMemo(() => {
      return clsx(
        'fairys_admin_notification_list fairys:min-w-[200px] fairys:bg-white fairys:dark:bg-gray-800 fairys:rounded-sm fairys:flex fairys:flex-col',
        className,
      );
    }, [className]);

    const itemRender = useMemo(() => {
      return items.map((item) => <FairysNotificationItem key={item.id} item={item} isShowIcon={isShowIcon} />);
    }, [items, isShowIcon]);

    return (
      <div ref={ref} {...rest} className={clxName}>
        {itemRender}
      </div>
    );
  },
);

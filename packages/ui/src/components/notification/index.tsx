import type { NotificationItemType } from 'context/notification-data';
import { ForwardedRef, forwardRef, Fragment, useMemo, useRef, createContext, useContext } from 'react';
import clsx from 'clsx';
import { FairysIcon, FairysIconPropsType } from 'components/icon';

export interface FairysNotificationItemProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**通知项数据*/
  item?: NotificationItemType;
  /**是否显示图标
   * @default true
   */
  isShowIcon?: boolean;
}

class FairysNotification {
  /**点击数据*/
  onClickItem?: (item: NotificationItemType) => void;
}

export const useFairysNotificationBase = (instance?: FairysNotification) => {
  const notification = useRef<FairysNotification>();
  if (!notification.current) {
    if (instance) {
      notification.current = instance;
    } else {
      notification.current = new FairysNotification();
    }
  }
  return notification.current;
};

const FairysNotificationBaseContext = createContext<FairysNotification>(new FairysNotification());

export const useFairysNotificationBaseContext = () => {
  return useContext(FairysNotificationBaseContext);
};

export const FairysNotificationBaseItem = forwardRef(
  (props: FairysNotificationItemProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { item, className, isShowIcon = true, ...rest } = props;
    const notification = useFairysNotificationBaseContext();
    const iconProps = item.iconProps || ({} as FairysIconPropsType);

    const clxName = useMemo(() => {
      return clsx(
        'fairys_admin_notification_item fairys:rounded-sm fairys:p-2 fairys:gap-1 fairys:w-full fairys:flex fairys:items-start fairys:flex-row fairys:cursor-pointer fairys:hover:bg-gray-100 fairys:dark:hover:bg-gray-600 fairys:transition-all fairys:duration-300',
        className,
        {
          [`fairys_admin_notification_item-${item?.type}`]: item?.type,
        },
      );
    }, [item?.type, className]);

    const onClickItem: React.MouseEventHandler<HTMLDivElement> = (e) => {
      e.stopPropagation();
      e.preventDefault();
      notification.onClickItem?.(item);
    };

    return (
      <div ref={ref} {...rest} className={clxName} onClick={onClickItem}>
        {isShowIcon ? (
          <div className="fairys_admin_notification_item-icon fairys:shrink-0 fairys:w-[32px] fairys:h-full fairys:min-w-[32px] fairys:flex fairys:justify-center  fairys:pt-1">
            <FairysIcon className="fairys:w-[16px] fairys:h-[16px] " icon={item.icon} iconProps={iconProps} />
          </div>
        ) : (
          <Fragment />
        )}
        <div className="fairys_admin_notification_item_content fairys:flex fairys:flex-col fairys:flex-1 fairys:overflow-hidden">
          <div
            className="fairys_admin_notification_item_content_title fairys:text-[14px] fairys:font-medium fairys:line-clamp-2 fairys:w-full"
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

export interface FairysNotificationListBaseProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  items?: NotificationItemType[];
  /**是否显示图标
   * @default true
   */
  isShowIcon?: boolean;
  /**点击数据*/
  onClickItem?: (item: NotificationItemType) => void;
}

export const FairysNotificationListBase = forwardRef(
  (props: FairysNotificationListBaseProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { items, className, isShowIcon, onClickItem, ...rest } = props;

    const notification = useFairysNotificationBase();
    notification.onClickItem = onClickItem;

    const clxName = useMemo(() => {
      return clsx(
        'fairys_admin_notification_list fairys:min-w-[200px] fairys:bg-white fairys:dark:bg-gray-800 fairys:rounded-sm fairys:flex fairys:flex-col',
        className,
      );
    }, [className]);

    const itemRender = useMemo(() => {
      return (items || []).map((item) => (
        <FairysNotificationBaseItem key={item.id} item={item} isShowIcon={isShowIcon} />
      ));
    }, [items, isShowIcon]);

    return (
      <FairysNotificationBaseContext.Provider value={notification}>
        <div ref={ref} {...rest} className={clxName}>
          {itemRender}
        </div>
      </FairysNotificationBaseContext.Provider>
    );
  },
);

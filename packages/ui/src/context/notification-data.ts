import { proxy, useSnapshot } from 'valtio';

interface NotificationTabItem {
  title: string;
  type: string;
}

interface NotificationDataState {
  /**通知tab列表*/
  tabItems?: NotificationTabItem[];
  /**默认引用值*/
  __defaultValue?: string;
}

export class NotificationDataInstance {
  state = proxy<NotificationDataState>({
    tabItems: [],
  });
  /**更新数据信息*/
  updated = (state: NotificationDataState) => {};
  /**清空数据*/
  clear = () => {
    for (const key in this.state) {
      this.state[key] = undefined;
    }
  };
}

export const notificationDataInstance = new NotificationDataInstance();

export const useNotificationData = () => {
  const state = useSnapshot(notificationDataInstance.state);
  return [state, notificationDataInstance, state.__defaultValue] as [
    NotificationDataState,
    NotificationDataInstance,
    NotificationDataState['__defaultValue'],
  ];
};

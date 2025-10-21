import { IconProps } from '@iconify/react';
import { proxy, ref, useSnapshot } from 'valtio';

export interface NotificationTabItemType {
  /**tab标题*/
  title: string;
  /**tab键(分类类型)*/
  key: string;
  /**图标*/
  icon?: string;
  /**图标属性*/
  iconProps?: IconProps;
  [s: string]: any;
}

export interface NotificationItemType {
  /**通知id*/
  id: string;
  /**通知类型*/
  type: string;
  /**通知标题*/
  title: string;
  /**通知时间*/
  date: string;
  /**通知内容*/
  content?: string;
  /**图标*/
  icon?: string;
  /**图标属性*/
  iconProps?: IconProps;
  [s: string]: any;
}

export type NotificationDataState = {
  /**通知tab列表*/
  tabItems?: NotificationTabItemType[];
  activeKey?: string;
  /**列表数据(在不分类的时候渲染)*/
  dataList?: Pick<NotificationItemType, 'type'>[];
  /**通知标题*/
  title?: string;
  /**是否显示图标
   * @default true
   */
  isShowIcon?: boolean;
  /**默认引用值*/
  __defaultValue?: string;
  /**显示数量*/
  count?: number;
  /**是否显示更多弹窗*/
  visibleMoreModal?: boolean;
};

export class NotificationDataInstance {
  state = proxy<NotificationDataState>({
    tabItems: [],
    dataList: [],
    title: '通知',
    isShowIcon: true,
    count: 0,
    visibleMoreModal: false,
  });
  ctor = (options: { tabItems?: NotificationTabItemType[]; title?: string; isShowIcon?: boolean }) => {
    const { tabItems, title, isShowIcon } = options;
    this.state.tabItems = ref(tabItems || []);
    /**默认第一个*/
    this.state.activeKey = tabItems?.[0]?.key;
    this.state.title = title || '通知';
    this.state.isShowIcon = isShowIcon ?? true;
  };
  /**更新值 tabs 选项key（外部挂载事件）*/
  onUpdateActiveKey?: (key: string) => void;
  /**更新值*/
  _onUpdateActiveKey = (key: string) => {
    this.state.activeKey = key;
    this.onUpdateActiveKey?.(key);
  };

  /**根据类型获取数据*/
  getDataType = (type: string) => {
    return this.state[`dataList_${type}`] || [];
  };
  /**根据类型更新数据*/
  updatedToType = (type: string, data: NotificationItemType[]) => {
    this.state[`dataList_${type}`] = ref(data || []);
  };
  /**获取数据*/
  getDataList = () => {
    return this.state.dataList || [];
  };
  /**更新列表数据*/
  updateDataList = (data: NotificationItemType[]) => {
    this.state.dataList = ref(data || []);
  };

  /**点击数据(外部挂载事件)*/
  onClickItem?: (item: NotificationItemType) => void;
  /**点击数据*/
  _onClickItem = (item: NotificationItemType) => {
    this.onClickItem?.(item);
  };

  /**点击查看全部(外部挂载事件)*/
  onClickMore?: (activeKey: string) => void;

  /**关闭更多弹窗*/
  closeMoreModal = () => {
    this.state.visibleMoreModal = false;
  };
  /**点击查看全部*/
  _onClickMore = () => {
    this.state.visibleMoreModal = true;
    this.onClickMore?.(this.state.activeKey);
  };

  /**清空数据*/
  clear = () => {
    for (const key in this.state) {
      if (key !== 'tabItems') {
        this.state[key] = undefined;
      }
    }
  };
}

/**消息通知*/
export const notificationDataInstance = new NotificationDataInstance();

export const useNotificationDatainstance = () => {
  const state = useSnapshot(notificationDataInstance.state);
  return [state, notificationDataInstance, state.__defaultValue] as [
    NotificationDataState,
    NotificationDataInstance,
    NotificationDataState['__defaultValue'],
  ];
};

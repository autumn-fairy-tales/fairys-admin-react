# notificationDataInstance 通知数据

:::tip 提示

用于存储当前应用的通知数据，包括通知tab列表、通知列表数据、通知标题等。

:::

## 引入

```ts
import { notificationDataInstance } from '@fairys/admin-tools-react';
```

## 状态值

```ts
import { IconProps } from '@iconify/react';
export type NotificationDataInstanceState = {
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
```

## 实体类

```ts
export class NotificationDataInstance {
    state: NotificationDataInstanceState;
    ctor: (options: {
        tabItems?: NotificationTabItemType[];
        title?: string;
        isShowIcon?: boolean;
    }) => void;
    /**更新值 tabs 选项key（外部挂载事件）*/
    onUpdateActiveKey?: (key: string) => void;
    /**更新值*/
    _onUpdateActiveKey: (key: string) => void;
    /**根据类型获取数据*/
    getDataType: (type: string) => any;
    /**根据类型更新数据*/
    updatedToType: (type: string, data: NotificationItemType[]) => void;
    /**获取数据*/
    getDataList: () => Pick<NotificationItemType, "type">[];
    /**更新列表数据*/
    updateDataList: (data: NotificationItemType[]) => void;
    /**点击数据(外部挂载事件)*/
    onClickItem?: (item: NotificationItemType) => void;
    /**点击数据*/
    _onClickItem: (item: NotificationItemType) => void;
    /**点击查看全部(外部挂载事件)*/
    onClickMore?: (activeKey: string) => void;
    /**关闭更多弹窗*/
    closeMoreModal: () => void;
    /**点击查看全部*/
    _onClickMore: () => void;
    /**清空数据*/
    clear: () => void;
}
```

## hooks

```ts
export const useNotificationDatainstance: () => [NotificationDataInstanceState, NotificationDataInstance, NotificationDataInstanceState["__defaultValue"]];
```

## 示例

:::warning 注意

如果使用`通知分类`，请在渲染`Layout`和`FairysRoot`组件之前，调用`ctor`方法，设置`tabItems`属性值

如果不进行分类，不用调用`ctor`方法，设置`tabItems`属性值

其他方法在任何地方都可调用，建议在渲染`Layout`和`FairysRoot`组件之后使用

:::

```ts title='通知分类使用'
import { notificationDataInstance } from '@fairys/admin-tools-react';

notificationDataInstance.ctor({
  tabItems: [
    {
      title: '全部',
      key: 'all',
    },
    {
      title: '未读',
      key: 'unread',
    },
    {
      title: '已读',
      key: 'read',
    },
  ],
});

notificationDataInstance.updatedToType('unread', [
  {
    icon: 'ant-design:unordered-list',
    id: '1',
    title: '未读',
    date: '2023-01-01',
    type: 'info',
  },
]);

notificationDataInstance.updatedToType('read', [
  {
    icon: 'ant-design:unordered-list',
    id: '1',
    title: '已读',
    date: '2023-01-01',
    type: 'info',
  },
]);

notificationDataInstance.updatedToType('all', [
  {
    icon: 'ant-design:unordered-list',
    id: '1',
    title:
      '通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1',
    date: '2023-01-01',
    type: 'info',
  },
  {
    icon: 'ant-design:unordered-list',
    id: '2',
    title: '通知2',
    date: '2023-01-02',
    type: 'success',
  },
]);
/**点击数据*/
notificationDataInstance.onClickItem = (item) => {
  console.log(item);
};
/**点击查看全部*/
notificationDataInstance.onClickMore = (activeKey) => {
  console.log(activeKey);
};
/**更新值 tabs 选项key（外部挂载事件）*/
notificationDataInstance.onUpdateActiveKey = (key) => {
  console.log(key);
};

```

```ts title='通知无分类使用'
import { notificationDataInstance } from '@fairys/admin-tools-react';

notificationDataInstance.updateDataList([
  {
    icon: 'ant-design:unordered-list',
    id: '1',
    title:
      '通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1',
    date: '2023-01-01',
    type: 'info',
  },
  {
    icon: 'ant-design:unordered-list',
    id: '2',
    title: '通知2',
    date: '2023-01-02',
    type: 'success',
  },
]);

/**点击数据*/
notificationDataInstance.onClickItem = (item) => {
  console.log(item);
};
/**点击查看全部*/
notificationDataInstance.onClickMore = (activeKey) => {
  console.log(activeKey);
};
/**更新值 tabs 选项key（外部挂载事件）*/
notificationDataInstance.onUpdateActiveKey = (key) => {
  console.log(key);
};

```

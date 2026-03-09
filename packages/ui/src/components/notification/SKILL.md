# Notification 组件

## 功能说明
Notification 组件用于显示通知消息列表，支持多种类型的通知和自定义配置。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## 使用示例
```tsx
import { FairysNotificationListBase, FairysNotificationBaseItem } from '@fairys-admin/ui';

const App = () => {
  const notifications = [
    {
      id: '1',
      title: '操作成功',
      date: '2023-10-01 10:00',
      type: 'success',
      icon: 'check-circle'
    },
    {
      id: '2',
      title: '警告信息',
      date: '2023-10-01 09:30',
      type: 'warning',
      icon: 'exclamation-circle'
    }
  ];

  const handleClickItem = (item) => {
    console.log('点击通知:', item);
  };

  return (
    <div>
      {/* 使用通知列表组件 */}
      <FairysNotificationListBase 
        items={notifications}
        onClickItem={handleClickItem}
        isShowIcon={true}
      />
      
      {/* 单独使用通知项组件 */}
      <FairysNotificationBaseItem 
        item={notifications[0]}
        isShowIcon={true}
      />
    </div>
  );
};
```

## 特性
- 支持多种通知类型（success、warning、error、info）
- 支持自定义通知内容
- 支持显示/隐藏图标（isShowIcon）
- 支持点击通知回调（onClickItem）
- 支持自定义样式（className）

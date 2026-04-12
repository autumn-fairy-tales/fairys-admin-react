# Notification 组件

## 功能说明
Notification 组件用于显示通知消息列表，支持多种类型的通知和自定义配置，适用于系统通知、消息提醒等场景。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## API

### 通知项类型

```typescript
interface NotificationItem {
  id: string;                 // 通知唯一标识
  title: string;              // 通知标题
  date: string;               // 通知日期
  type: 'success' | 'warning' | 'error' | 'info'; // 通知类型
  icon?: string | React.ReactNode; // 通知图标
  [key: string]: any;         // 其他自定义属性
}
```

### FairysNotificationListBase 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `NotificationItem[]` | `[]` | 通知数据列表 |
| `onClickItem` | `(item: NotificationItem) => void` | - | 点击通知项回调 |
| `isShowIcon` | `boolean` | `true` | 是否显示图标 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

### FairysNotificationBaseItem 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `item` | `NotificationItem` | - | 通知项数据 |
| `isShowIcon` | `boolean` | `true` | 是否显示图标 |
| `onClick` | `(item: NotificationItem) => void` | - | 点击通知项回调 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

## 使用示例

### 基本用法
```tsx
import { FairysNotificationListBase } from '@fairys-admin/ui';

const App = () => {
  const notifications = [
    {
      id: '1',
      title: '操作成功',
      date: '2023-10-01 10:00',
      type: 'success'
    },
    {
      id: '2',
      title: '警告信息',
      date: '2023-10-01 09:30',
      type: 'warning'
    },
    {
      id: '3',
      title: '错误信息',
      date: '2023-10-01 09:00',
      type: 'error'
    },
    {
      id: '4',
      title: '提示信息',
      date: '2023-09-30 18:00',
      type: 'info'
    }
  ];

  const handleClickItem = (item) => {
    console.log('点击通知:', item);
  };

  return (
    <FairysNotificationListBase 
      items={notifications}
      onClickItem={handleClickItem}
      isShowIcon={true}
    />
  );
};
```

### 单独使用通知项
```tsx
import { FairysNotificationBaseItem } from '@fairys-admin/ui';

const App = () => {
  const notification = {
    id: '1',
    title: '操作成功',
    date: '2023-10-01 10:00',
    type: 'success'
  };

  const handleClick = (item) => {
    console.log('点击通知:', item);
  };

  return (
    <FairysNotificationBaseItem 
      item={notification}
      isShowIcon={true}
      onClick={handleClick}
    />
  );
};
```

### 自定义图标
```tsx
import { FairysNotificationListBase } from '@fairys-admin/ui';
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

const App = () => {
  const notifications = [
    {
      id: '1',
      title: '操作成功',
      date: '2023-10-01 10:00',
      type: 'success',
      icon: <CheckCircleOutlined />
    },
    {
      id: '2',
      title: '警告信息',
      date: '2023-10-01 09:30',
      type: 'warning',
      icon: <ExclamationCircleOutlined />
    },
    {
      id: '3',
      title: '错误信息',
      date: '2023-10-01 09:00',
      type: 'error',
      icon: <CloseCircleOutlined />
    },
    {
      id: '4',
      title: '提示信息',
      date: '2023-09-30 18:00',
      type: 'info',
      icon: <InfoCircleOutlined />
    }
  ];

  return (
    <FairysNotificationListBase 
      items={notifications}
      isShowIcon={true}
    />
  );
};
```

### 自定义样式
```tsx
import { FairysNotificationListBase } from '@fairys-admin/ui';

const App = () => {
  const notifications = [
    {
      id: '1',
      title: '操作成功',
      date: '2023-10-01 10:00',
      type: 'success'
    },
    {
      id: '2',
      title: '警告信息',
      date: '2023-10-01 09:30',
      type: 'warning'
    }
  ];

  return (
    <FairysNotificationListBase 
      items={notifications}
      isShowIcon={true}
      className="custom-notification"
      style={{ maxHeight: '300px', overflowY: 'auto' }}
    />
  );
};
```

## 特性
- 支持多种通知类型（success、warning、error、info）
- 支持自定义通知内容和图标
- 支持显示/隐藏图标
- 支持点击通知回调
- 支持自定义样式和类名
- 支持单独使用通知项组件

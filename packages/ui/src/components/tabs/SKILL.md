# Tabs 组件

## 功能说明
Tabs 组件用于创建标签页，支持切换不同内容，适用于内容分类展示、多步骤操作等场景。

## 组件结构
- `index.tsx` - 组件主要实现
- `context.ts` - 上下文管理
- `variables.css` - 组件样式变量

## API

### 标签项类型

```typescript
interface TabItem {
  key: string;             // 标签唯一标识
  title: string;           // 标签标题
  icon?: string | React.ReactNode; // 标签图标
  disabled?: boolean;      // 是否禁用
}
```

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `TabItem[]` | `[]` | 标签数据 |
| `activeKey` | `string` | - | 当前激活的标签 key |
| `defaultActiveKey` | `string` | - | 默认激活的标签 key |
| `onChange` | `(key: string, item: TabItem) => void` | - | 标签切换回调 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

## 使用示例

### 基本用法
```tsx
import { useState } from 'react';
import { FairysTabs } from '@fairys-admin/ui';

const App = () => {
  const [activeKey, setActiveKey] = useState('tab1');

  const tabsItems = [
    {
      key: 'tab1',
      title: '标签1'
    },
    {
      key: 'tab2',
      title: '标签2'
    },
    {
      key: 'tab3',
      title: '标签3'
    }
  ];

  const handleChange = (key, item) => {
    setActiveKey(key);
    console.log('切换到标签:', key, item);
  };

  return (
    <div>
      <FairysTabs 
        items={tabsItems}
        activeKey={activeKey}
        onChange={handleChange}
      />
      <div className="mt-4">
        {/* 根据 activeKey 显示不同内容 */}
        {activeKey === 'tab1' && <div>内容1</div>}
        {activeKey === 'tab2' && <div>内容2</div>}
        {activeKey === 'tab3' && <div>内容3</div>}
      </div>
    </div>
  );
};
```

### 带图标
```tsx
import { useState } from 'react';
import { FairysTabs } from '@fairys-admin/ui';
import { HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const App = () => {
  const [activeKey, setActiveKey] = useState('tab1');

  const tabsItems = [
    {
      key: 'tab1',
      title: '首页',
      icon: <HomeOutlined />
    },
    {
      key: 'tab2',
      title: '设置',
      icon: <SettingOutlined />
    },
    {
      key: 'tab3',
      title: '用户',
      icon: <UserOutlined />
    }
  ];

  const handleChange = (key, item) => {
    setActiveKey(key);
  };

  return (
    <FairysTabs 
      items={tabsItems}
      activeKey={activeKey}
      onChange={handleChange}
    />
  );
};
```

### 带禁用状态
```tsx
import { useState } from 'react';
import { FairysTabs } from '@fairys-admin/ui';

const App = () => {
  const [activeKey, setActiveKey] = useState('tab1');

  const tabsItems = [
    {
      key: 'tab1',
      title: '标签1'
    },
    {
      key: 'tab2',
      title: '标签2',
      disabled: true
    },
    {
      key: 'tab3',
      title: '标签3'
    }
  ];

  const handleChange = (key, item) => {
    setActiveKey(key);
  };

  return (
    <FairysTabs 
      items={tabsItems}
      activeKey={activeKey}
      onChange={handleChange}
    />
  );
};
```

### 非受控模式
```tsx
import { FairysTabs } from '@fairys-admin/ui';

const App = () => {
  const tabsItems = [
    {
      key: 'tab1',
      title: '标签1'
    },
    {
      key: 'tab2',
      title: '标签2'
    },
    {
      key: 'tab3',
      title: '标签3'
    }
  ];

  const handleChange = (key, item) => {
    console.log('切换到标签:', key, item);
  };

  return (
    <FairysTabs 
      items={tabsItems}
      defaultActiveKey="tab1"
      onChange={handleChange}
    />
  );
};
```

## 特性
- 支持多个标签页
- 支持自定义标签内容和图标
- 支持切换动画
- 支持受控模式（activeKey）
- 支持非受控模式（defaultActiveKey）
- 支持标签切换回调（onChange）
- 支持禁用状态
- 支持自定义类名和样式

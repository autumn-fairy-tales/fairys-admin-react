# Tabs 组件

## 功能说明
Tabs 组件用于创建标签页，支持切换不同内容。

## 组件结构
- `index.tsx` - 组件主要实现
- `context.ts` - 上下文管理
- `variables.css` - 组件样式变量

## 使用示例
```tsx
import { FairysTabs } from '@fairys-admin/ui';

const App = () => {
  const [activeKey, setActiveKey] = useState('tab1');

  const tabsItems = [
    {
      key: 'tab1',
      title: '标签1',
      icon: 'home'
    },
    {
      key: 'tab2',
      title: '标签2',
      icon: 'settings'
    },
    {
      key: 'tab3',
      title: '标签3',
      icon: 'user'
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

## 特性
- 支持多个标签页
- 支持自定义标签内容和图标
- 支持切换动画
- 支持受控模式（activeKey）
- 支持标签切换回调（onChange）
- 支持禁用状态

# PopoverMenu 组件

## 功能说明
PopoverMenu 组件用于创建弹出式菜单，支持多级菜单和各种交互方式。

## 组件结构
- `index.tsx` - 组件主要实现
- `context.ts` - 上下文管理
- `variables.css` - 组件样式变量

## 使用示例
```tsx
import { FairysPopoverMenu } from '@fairys-admin/ui';

const App = () => {
  const menuItems = [
    {
      title: '选项1',
      key: 'option1',
      icon: 'home',
      onClick: (item) => console.log('点击选项1', item)
    },
    {
      title: '选项2',
      key: 'option2',
      icon: 'settings',
      onClick: (item) => console.log('点击选项2', item)
    },
    {
      isDivider: true
    },
    {
      title: '子菜单',
      key: 'submenu',
      items: [
        {
          title: '子选项1',
          key: 'suboption1',
          onClick: (item) => console.log('点击子选项1', item)
        },
        {
          title: '子选项2',
          key: 'suboption2',
          onClick: (item) => console.log('点击子选项2', item)
        }
      ]
    }
  ];

  return (
    <FairysPopoverMenu 
      items={menuItems}
      eventName="click"
      placement="bottom-start"
    >
      <button>菜单</button>
    </FairysPopoverMenu>
  );
};
```

## 特性
- 支持多级菜单
- 支持菜单项和分隔线（isDivider）
- 支持自定义样式（className、motionClassName）
- 支持点击外部关闭
- 支持多种触发事件（eventName）
- 支持禁用状态（disabled）
- 支持单选和多选模式（mode）
- 支持自定义点击回调（onClickItem）
- 支持自定义关闭回调（onCloseItem）
- 支持隐藏关闭按钮（isHideClose）
- 支持设置最小宽度（isNotMinWidth）
- 支持透明度（isOpacity）

# PopoverMenu 组件

## 功能说明
PopoverMenu 组件用于创建弹出式菜单，支持多级菜单和各种交互方式，适用于下拉菜单、上下文菜单等场景。

## 组件结构
- `index.tsx` - 组件主要实现
- `context.ts` - 上下文管理
- `variables.css` - 组件样式变量

## API

### 菜单项类型

```typescript
interface PopoverMenuItem {
  title: string;                 // 菜单项标题
  key: string;                   // 菜单项唯一标识
  icon?: string | React.ReactNode; // 菜单项图标
  onClick?: (item: PopoverMenuItem) => void; // 点击回调
  items?: PopoverMenuItem[];     // 子菜单项
  isDivider?: boolean;           // 是否为分隔线
  disabled?: boolean;            // 是否禁用
}
```

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `PopoverMenuItem[]` | `[]` | 菜单数据 |
| `eventName` | `'click' \| 'mousedown' \| 'contextMenu' \| 'hover'` | `'click'` | 触发事件 |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | `'bottom-start'` | 弹出位置 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `className` | `string` | - | 自定义类名 |
| `motionClassName` | `string` | - | 动画类名 |
| `isNotMinWidth` | `boolean` | `false` | 是否设置最小宽度 |
| `isOpacity` | `boolean` | `false` | 是否设置透明度 |
| `isHideClose` | `boolean` | `false` | 是否隐藏关闭按钮 |
| `mode` | `'single' \| 'multiple'` | `'single'` | 单选或多选模式 |
| `onClickItem` | `(item: PopoverMenuItem) => void` | - | 点击菜单项回调 |
| `onCloseItem` | `() => void` | - | 关闭菜单回调 |
| `children` | `React.ReactNode` | - | 触发元素 |

## 使用示例

### 基本用法
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

### 悬停触发
```tsx
import { FairysPopoverMenu } from '@fairys-admin/ui';

const App = () => {
  const menuItems = [
    {
      title: '选项1',
      key: 'option1',
      onClick: (item) => console.log('点击选项1', item)
    },
    {
      title: '选项2',
      key: 'option2',
      onClick: (item) => console.log('点击选项2', item)
    }
  ];

  return (
    <FairysPopoverMenu 
      items={menuItems}
      eventName="hover"
    >
      <button>悬停菜单</button>
    </FairysPopoverMenu>
  );
};
```

### 禁用菜单项
```tsx
import { FairysPopoverMenu } from '@fairys-admin/ui';

const App = () => {
  const menuItems = [
    {
      title: '选项1',
      key: 'option1',
      onClick: (item) => console.log('点击选项1', item)
    },
    {
      title: '选项2',
      key: 'option2',
      disabled: true
    },
    {
      title: '选项3',
      key: 'option3',
      onClick: (item) => console.log('点击选项3', item)
    }
  ];

  return (
    <FairysPopoverMenu 
      items={menuItems}
    >
      <button>包含禁用项的菜单</button>
    </FairysPopoverMenu>
  );
};
```

### 自定义样式
```tsx
import { FairysPopoverMenu } from '@fairys-admin/ui';

const App = () => {
  const menuItems = [
    {
      title: '选项1',
      key: 'option1',
      onClick: (item) => console.log('点击选项1', item)
    },
    {
      title: '选项2',
      key: 'option2',
      onClick: (item) => console.log('点击选项2', item)
    }
  ];

  return (
    <FairysPopoverMenu 
      items={menuItems}
      className="custom-popover-menu"
      motionClassName="custom-animation"
    >
      <button>自定义样式菜单</button>
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

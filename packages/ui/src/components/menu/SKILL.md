# Menu 组件

## 功能说明
Menu 组件用于创建导航菜单，支持多级菜单、多种布局方式和丰富的交互功能，适用于管理系统、网站导航等场景。

## 组件结构
- `index.tsx` - 组件主要实现
- `item.tsx` - 菜单项组件
- `sub.item.tsx` - 子菜单项组件
- `divider.item.tsx` - 菜单分隔线组件
- `instance.ts` - 菜单实例管理
- `interface.ts` - 类型定义
- `utils.tsx` - 工具函数
- `variables.css` - 组件样式变量

## API

### 菜单项类型

```typescript
interface MenuItem {
  title: string;           // 菜单项标题
  key: string;             // 菜单项唯一标识
  path?: string;           // 菜单项路径
  disabled?: boolean;      // 是否禁用
  children?: MenuItem[];   // 子菜单项
  icon?: React.ReactNode;  // 菜单项图标
  badge?: number | string; // 徽章
  groupTitle?: string;     // 分组标题
  isDivider?: boolean;     // 是否为分隔线
}
```

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `MenuItem[]` | `[]` | 菜单数据 |
| `mode` | `'vertical' \| 'horizontal'` | `'vertical'` | 菜单布局方式 |
| `selectedKey` | `string` | - | 当前选中的菜单项 key |
| `defaultSelectedKey` | `string` | - | 默认选中的菜单项 key |
| `openKeys` | `string[]` | `[]` | 当前展开的菜单项 key 数组 |
| `defaultOpenKeys` | `string[]` | `[]` | 默认展开的菜单项 key 数组 |
| `collapsed` | `boolean` | `false` | 是否折叠菜单 |
| `isOnlyParentOpenKeys` | `boolean` | `false` | 是否只展开单个父级菜单 |
| `onSelect` | `(key: string) => void` | - | 菜单项选中回调 |
| `onOpenChange` | `(keys: string[]) => void` | - | 菜单展开/收起回调 |
| `className` | `string` | - | 自定义类名 |
| `style` | `React.CSSProperties` | - | 自定义样式 |

## 使用示例

### 基本用法
```tsx
import { FairysMenu } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysMenu
      items={[
        {
          title: '首页',
          path: '/',
          key: 'home'
        },
        {
          title: '设置',
          key: 'settings',
          children: [
            {
              title: '用户设置',
              path: '/settings/user',
              key: 'user-settings'
            },
            {
              title: '系统设置',
              path: '/settings/system',
              key: 'system-settings'
            }
          ]
        }
      ]}
      mode="vertical"
      selectedKey="home"
    />
  );
};
```

### 带图标和徽章
```tsx
import { FairysMenu } from '@fairys-admin/ui';
import { HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const App = () => {
  return (
    <FairysMenu
      items={[
        {
          title: '首页',
          path: '/',
          key: 'home',
          icon: <HomeOutlined />
        },
        {
          title: '消息',
          path: '/messages',
          key: 'messages',
          badge: 5
        },
        {
          title: '设置',
          key: 'settings',
          icon: <SettingOutlined />,
          children: [
            {
              title: '用户设置',
              path: '/settings/user',
              key: 'user-settings',
              icon: <UserOutlined />
            }
          ]
        }
      ]}
      mode="vertical"
    />
  );
};
```

### 水平菜单
```tsx
import { FairysMenu } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysMenu
      items={[
        {
          title: '首页',
          path: '/',
          key: 'home'
        },
        {
          title: '产品',
          key: 'products',
          children: [
            {
              title: '产品列表',
              path: '/products/list',
              key: 'product-list'
            },
            {
              title: '新增产品',
              path: '/products/add',
              key: 'product-add'
            }
          ]
        },
        {
          title: '关于我们',
          path: '/about',
          key: 'about'
        }
      ]}
      mode="horizontal"
    />
  );
};
```

## 特性
- 支持多级菜单
- 支持水平和垂直布局
- 支持菜单展开和收起
- 支持菜单折叠
- 支持菜单禁用
- 支持菜单展开单个父级
- 支持菜单展开多个父级
- 支持移入/点击菜单显示子菜单
- 支持分组菜单
- 支持分割线
- 支持默认展开子菜单
- 支持切换主题色
- 支持自定义移入/点击菜单弹出框渲染内容
- 支持自动滚动到选中菜单(单选菜单)
- 支持多选菜单
- 支持图标和徽章

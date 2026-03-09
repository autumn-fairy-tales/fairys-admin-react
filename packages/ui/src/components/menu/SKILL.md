# Menu 组件

## 功能说明
Menu 组件用于创建导航菜单，支持多级菜单和各种交互方式。

## 组件结构
- `index.tsx` - 组件主要实现
- `item.tsx` - 菜单项组件
- `sub.item.tsx` - 子菜单项组件
- `divider.item.tsx` - 菜单分隔线组件
- `instance.ts` - 菜单实例管理
- `interface.ts` - 类型定义
- `utils.tsx` - 工具函数
- `variables.css` - 组件样式变量

## 使用示例
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

## 特性
- 支持多级菜单
- 支持水平和垂直布局（mode）
- 支持菜单展开和收起（collapsed）
- 支持菜单折叠（子菜单折叠）
- 支持菜单禁用
- 支持菜单展开单个父级（isOnlyParentOpenKeys）
- 支持菜单展开多个父级
- 支持 移入/点击 菜单显示子菜单
- 支持分组菜单
- 支持分割线
- 默认展开子菜单
- 切换主题色
- 可以自定义 移入/点击菜单 弹出框渲染内容
- 自动滚动到选中菜单(单选菜单)
- 支持多选菜单

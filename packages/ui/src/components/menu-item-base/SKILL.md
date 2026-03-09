# MenuItemBase 组件

## 功能说明
MenuItemBase 组件是菜单项的基础组件，提供菜单项的通用功能和样式。

## 组件结构
- `index.tsx` - 组件主要实现
- `variables.css` - 组件样式变量

## 使用示例
```tsx
import { FairysMenuItemBase } from '@fairys-admin/ui';

const App = () => {
  return (
    <FairysMenuItemBase 
      icon="home"
      isActive={true}
      disabled={false}
      isShowClose={true}
      onCloseItem={(e) => console.log('关闭项', e)}
      extra={<span>额外内容</span>}
    >
      菜单项
    </FairysMenuItemBase>
  );
};
```

## 特性
- 支持图标显示（icon）
- 支持激活状态（isActive）
- 支持禁用状态（disabled）
- 支持显示关闭按钮（isShowClose）
- 支持自定义额外内容（extra）
- 支持文本省略（isTextEllipsis）
- 支持边框显示（bordered）
- 支持自定义样式（className）

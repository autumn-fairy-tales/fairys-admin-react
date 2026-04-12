---
title: 组件概览
overview: true
---

## 安装

```bash
npm install @fairys/admin-tools-react # yarn add @fairys/admin-tools-react # pnpm add @fairys/admin-tools-react
```

## 组件总览

Fairys Admin React 提供了一系列 UI 组件，用于构建现代化的管理系统界面。这些组件基于 React 和 Tailwind CSS 构建，具有良好的可定制性和可扩展性。

### 布局组件

| 组件名称 | 描述 | 文档 |
| --- | --- | --- |
| Layout | 整体布局组件 | [Layout](./layout.mdx) |
| Avatar | 头像组件 | [Avatar](./avatar.mdx) |
| Breadcrumb | 面包屑组件 | [Breadcrumb](./breadcrumb.mdx) |
| Logo | Logo 组件 | [Logo](./logo.mdx) |
| MainMenu | 主菜单组件 | [MainMenu](./main-menu.mdx) |
| Menu | 菜单组件 | [Menu](./menu.mdx) |
| Setting | 设置组件 | [Setting](./setting.mdx) |

### 基础组件

| 组件名称 | 描述 | 文档 |
| --- | --- | --- |
| Button | 按钮组件 | [Button](./components/button.mdx) |
| Icon | 图标组件 | [Icon](./components/icon.mdx) |
| Select | 选择器组件 | [Select](./components/select.mdx) |
| Switch | 开关组件 | [Switch](./components/switch.mdx) |
| Tabs | 标签页组件 | [Tabs](./components/tabs.mdx) |
| ModalBase | 模态框组件 | [ModalBase](./components/modal-base.mdx) |
| PopoverBase | 弹出框组件 | [PopoverBase](./components/popover-base.mdx) |
| PopoverMenu | 弹出菜单组件 | [PopoverMenu](./components/popover-menu.mdx) |
| Notification | 通知组件 | [Notification](./components/notification.mdx) |
| Breadcrumb | 面包屑组件 | [Breadcrumb](./components/breadcrumb.mdx) |
| Disclosure | 折叠组件 | [Disclosure](./components/disclosure.mdx) |
| EnterLoading | 加载组件 | [EnterLoading](./components/enter-loading.mdx) |
| ErrorPage | 错误页面组件 | [ErrorPage](./components/error-page.mdx) |
| FullScreen | 全屏组件 | [FullScreen](./components/full-screen.mdx) |
| KeepAlive | 页面缓存组件 | [KeepAlive](./components/keep-alive.mdx) |
| MainPage | 主页面组件 | [MainPage](./components/main-page.mdx) |
| MenuItemBase | 菜单项基础组件 | [MenuItemBase](./components/menu-item-base.mdx) |
| Watermark | 水印组件 | [Watermark](./components/watermark.mdx) |
| Login | 登录组件 | [Login](./components/login.mdx) |

## 组件使用指南

### 1. 基本使用方法

所有组件都可以通过以下方式导入和使用：

```tsx
import { FairysButtonBase } from '@fairys/admin-tools-react';

const MyComponent = () => {
  return (
    <FairysButtonBase isBg onClick={() => console.log('点击了按钮')}>
      按钮
    </FairysButtonBase>
  );
};
```

### 2. 组件定制

大多数组件都支持通过 `className` 和 `style` 属性进行定制：

```tsx
import { FairysButtonBase } from '@fairys/admin-tools-react';

const MyComponent = () => {
  return (
    <FairysButtonBase 
      isBg 
      className="custom-button"
      style={{ margin: '10px' }}
      onClick={() => console.log('点击了按钮')}
    >
      按钮
    </FairysButtonBase>
  );
};
```

### 3. 组件状态管理

对于需要状态管理的组件，您可以使用 React 的 `useState` 钩子：

```tsx
import { useState } from 'react';
import { FairysSwitchBase } from '@fairys/admin-tools-react';

const MyComponent = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <FairysSwitchBase 
      value={checked} 
      onChange={setChecked} 
    />
  );
};
```

### 4. 最佳实践

- **组件导入**：建议使用解构赋值的方式导入组件，以减少包体积
- **样式定制**：优先使用 Tailwind CSS 类名进行样式定制，而不是内联样式
- **状态管理**：对于复杂的状态，建议使用状态实例进行管理
- **性能优化**：对于频繁渲染的组件，建议使用 React.memo 进行优化

### 5. 常见问题

#### 5.1 组件样式不生效

**问题**：组件的样式没有按照预期显示。

**解决方法**：确保您已经正确配置了 Tailwind CSS，并且组件的类名没有冲突。

#### 5.2 组件事件不触发

**问题**：组件的事件处理函数没有被调用。

**解决方法**：确保您正确传递了事件处理函数，并且函数没有被绑定到错误的上下文。

#### 5.3 组件渲染性能问题

**问题**：组件渲染速度慢，影响用户体验。

**解决方法**：使用 React.memo 包裹组件，避免不必要的重渲染；对于大型列表，使用虚拟滚动等技术。

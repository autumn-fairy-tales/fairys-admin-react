---
title: 状态实例
overview: true
---

## 状态实例总览

Fairys Admin React 提供了一系列状态实例，用于管理应用的各种状态。这些状态实例基于 [valtio](https://github.com/pmndrs/valtio) 库实现，提供了一种简单、高效的状态管理方式。

| 状态实例 | 描述 | 文档 |
| --- | --- | --- |
| accountDataInstance | 管理用户账户信息 | [accountDataInstance](./accountDataInstance.md) |
| aliveControllerDataInstance | 管理页面缓存 | [aliveControllerDataInstance](./aliveControllerDataInstance.md) |
| appDataInstance | 管理应用基本信息 | [appDataInstance](./appDataInstance.md) |
| appPluginDataInstance | 管理应用插件 | [appPluginDataInstance](./appPluginDataInstance.md) |
| authDataInstance | 管理认证状态 | [authDataInstance](./authDataInstance.md) |
| favoritesDataInstance | 管理收藏夹 | [favoritesDataInstance](./favoritesDataInstance.md) |
| menuDataInstance | 管理菜单数据 | [menuDataInstance](./menuDataInstance.md) |
| motionAnimationDataInstance | 管理页面过渡动画 | [motionAnimationDataInstance](./motionAnimationDataInstance.md) |
| notificationDataInstance | 管理通知 | [notificationDataInstance](./notificationDataInstance.md) |
| routerDataInstance | 管理路由 | [routerDataInstance](./routerDataInstance.md) |
| settingDataInstance | 管理应用设置 | [settingDataInstance](./settingDataInstance.md) |
| tabBarDataInstance | 管理标签栏 | [tabBarDataInstance](./tabBarDataInstance.md) |

## 状态实例使用指南

### 1. 基本使用方法

所有状态实例都提供了类似的使用方式：

```tsx
import { settingDataInstance, useSettingDataInstance } from '@fairys/admin-tools-react';

// 全局使用
settingDataInstance.ctor({
  projectName: 'Fairys Admin',
  themeColor: '#af52de',
});

// 在组件中使用
const MyComponent = () => {
  const [settingState, settingInstance] = useSettingDataInstance();
  
  // 使用状态
  console.log(settingState.projectName);
  
  // 使用实例方法
  const changeTheme = () => {
    settingInstance.updated({
      themeColor: '#1890ff',
    });
  };
  
  return (
    <div>
      <h1>{settingState.projectName}</h1>
      <button onClick={changeTheme}>更改主题色</button>
    </div>
  );
};
```

### 2. 状态实例生命周期

状态实例的生命周期与应用的生命周期一致：

1. **初始化**：在应用启动时，通过 `ctor` 方法初始化状态实例
2. **使用**：在组件中通过 `useXXXDataInstance` 钩子使用状态实例
3. **更新**：通过实例的 `updated` 方法更新状态
4. **销毁**：在应用卸载时，状态实例会自动销毁

### 3. 最佳实践

- **初始化时机**：建议在应用入口文件中初始化所有状态实例
- **状态管理**：对于复杂的状态，建议使用状态实例而不是组件内部状态
- **性能优化**：状态实例会自动处理状态更新和组件重渲染，无需手动优化
- **类型安全**：所有状态实例都提供了完整的 TypeScript 类型定义

### 4. 常见问题

#### 4.1 状态实例未初始化

**问题**：在组件中使用状态实例时，出现状态未定义的错误。

**解决方法**：确保在使用状态实例之前，已经通过 `ctor` 方法初始化了状态实例。

#### 4.2 状态更新不生效

**问题**：调用 `updated` 方法后，组件没有重新渲染。

**解决方法**：确保在组件中使用 `useXXXDataInstance` 钩子获取状态，而不是直接使用全局实例的状态。

#### 4.3 状态实例之间的依赖关系

**问题**：多个状态实例之间存在依赖关系，如何处理？

**解决方法**：按照依赖顺序初始化状态实例，或者在一个状态实例的回调中更新另一个状态实例。
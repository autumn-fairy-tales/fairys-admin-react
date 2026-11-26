# 框架 ui 组件库

## 使用

组件库 JS 入口不再自动引入样式，请在应用入口手动引入：

```css
@import '@fairys/admin-tools-react/lib/styles/index.css';
```

Tailwind v4、`fairys:` 前缀与 `@iconify/tailwind4` 的配置见文档快速开始。

> 组件库面向 bundler 使用。Node 下 `require('@fairys/admin-tools-react')` 与 `require('.../lib/components/keep-alive')` 可用；Node ESM 请使用 default 导入（`import pkg from ...`）或通过 bundler 解析 `module` 字段。

- [X] 侧边单组菜单
- [X] 侧边两组菜单，一个主菜单，一个子菜单
- [X] 顶部主菜单+侧边子菜单
- [X] 顶部主菜单+下拉子菜单
- [X] tabs菜单卡片
- [X] 菜单面包屑
- [X] 菜单搜索
- [X] 设置布局
- [X] 设置主题
- [X] 简单登录
- [X] 收藏菜单
- [X] 全屏
- [X] 通知中心
- [X] 水印
- [X] 简单适配移动端样式布局(菜单部分直接使用`left`布局格式，点击按钮弹框左侧抽屉显示所有菜单)

菜单分类

1. 主菜单
2. 父级菜单
3. 子菜单
4. 仅显示的主菜单(用于主菜单和子菜单一起显示的)

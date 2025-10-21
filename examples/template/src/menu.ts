import type { MenuItemType } from '@fairys/admin-tools-react';

export const menuItems: MenuItemType[] = [
  {
    title: '主菜单',
    path: 'main-menu',
    isMain: true,
    icon: 'ant-design:home-outlined',
    items: [
      {
        title: '首页',
        path: '/',
        icon: 'ant-design:home-outlined',
        isTabFixed: true,
      },
      {
        title: '关于',
        path: '/about',
        icon: 'ant-design:unordered-list',
      },
      {
        title: '详情',
        path: '/detail',
        icon: 'ant-design:info-circle-outlined',
      },
    ],
  },
];

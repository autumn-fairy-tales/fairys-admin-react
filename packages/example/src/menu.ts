import { menuDataInstance } from '@fairys/admin-tools-react';
import type { MenuItem } from '@fairys/admin-tools-react';

export const menuItems: MenuItem[] = (menuDataInstance._menuItems = [
  {
    title: '首页',
    path: '/',
    icon: 'icon-home',
  },
  {
    title: '列表',
    path: '/list',
    icon: 'icon-list',
  },
]);

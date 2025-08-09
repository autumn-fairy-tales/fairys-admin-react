import { menuDataInstance } from '@fairys/admin-tools-react';
import type { MenuItem } from '@fairys/admin-tools-react';

export const menuItems: MenuItem[] = (menuDataInstance._menuItems = [
  {
    title: '首页',
    path: '/',
    icon: 'solar:home-bold',
  },
  {
    title: '列表',
    path: '/list',
    icon: 'solar:checklist-bold',
  },
  {
    title: '详情',
    path: '/detail',
    icon: 'solar:info-circle-outline',
  },
]);

menuDataInstance.ctor_menuItems(menuItems);

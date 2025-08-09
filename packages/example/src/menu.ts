import { menuDataInstance, tabBarInstance } from '@fairys/admin-tools-react';
import type { MenuItemType } from '@fairys/admin-tools-react';

const menuItems: MenuItemType[] = [
  {
    title: '首页',
    path: '/',
    icon: 'ant-design:home-outlined',
  },
  {
    title: '列表',
    path: '/list',
    icon: 'ant-design:unordered-list',
  },
  {
    title: '详情',
    path: '/detail',
    icon: 'ant-design:info-circle-outlined',
  },
];
/**临时加载菜单数据*/
menuDataInstance.ctor(menuItems);
/**临时加载一下tabBarItems*/
tabBarInstance.ctor(menuItems);

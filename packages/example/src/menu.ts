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
    children: [
      {
        title: '列表-1',
        path: '/list1-1',
        icon: 'ant-design:unordered-list',
      },
      {
        title: '列表-1-1',
        path: '/list1-1-1',
        icon: 'ant-design:unordered-list',
        children: [
          {
            title: '列表-1-1-1',
            path: '/list1-1-1-1',
            icon: 'ant-design:unordered-list',
          },
          {
            title: '列表-1-1-1-1',
            path: '/list1-1-1-1-1',
            icon: 'ant-design:unordered-list',
          },
        ],
      },
    ],
  },
  {
    title: '列表2列表2列表2列表2列表2列表2列表2列表2列表2',
    path: '/list2',
    icon: 'ant-design:unordered-list',
  },
  {
    title: '列表3',
    path: '/list3',
    icon: 'ant-design:unordered-list',
  },
  {
    title: '列表4',
    path: '/list4',
    icon: 'ant-design:unordered-list',
  },
  {
    title: '列表5',
    path: '/list5',
    icon: 'ant-design:unordered-list',
  },
  {
    title: '列表6',
    path: '/list6',
    icon: 'ant-design:unordered-list',
  },
  {
    title: '列表7',
    path: '/list7',
    icon: 'ant-design:unordered-list',
  },
  {
    title: '列表8',
    path: '/list8',
    icon: 'ant-design:unordered-list',
  },
  {
    title: '列表9',
    path: '/list9',
    icon: 'ant-design:unordered-list',
  },
  {
    title: '列表10',
    path: '/list10',
    icon: 'ant-design:unordered-list',
  },
  {
    title: '列表11',
    path: '/list11',
    icon: 'ant-design:unordered-list',
  },
  {
    title: '列表12',
    path: '/list12',
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

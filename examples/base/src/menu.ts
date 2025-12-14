import type { MenuItemType } from '@fairys/admin-tools-react';

export const menuItems: MenuItemType[] = [
  {
    title: '主菜单',
    path: 'main-menu',
    icon: 'ant-design:home-outlined',
    type: 'group',
    items: [
      {
        title: '首页',
        path: '/',
        icon: 'ant-design:home-outlined',
        isTabFixed: true,
      },
      {
        title: '异步',
        path: '/lazy',
        icon: 'ant-design:home-outlined',
      },
      {
        title: '列表',
        path: '/list',
        icon: 'ant-design:unordered-list',
        items: [
          {
            title: '列表-1',
            path: '/list1-1',
            icon: 'ant-design:unordered-list',
            isTabFixed: true,
          },
          {
            title: '列表-1-1',
            path: '/list1-1-1',
            icon: 'ant-design:unordered-list',
            items: [
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
        items: [
          {
            title: '列表2-1',
            path: '/list2-1',
            icon: 'ant-design:unordered-list',
          },
          {
            title: '列表2-1-1',
            path: '/list2-1-1',
            icon: 'ant-design:unordered-list',
            items: [
              {
                title: '列表2-1-1-1',
                path: '/list2-1-1-1',
                icon: 'ant-design:unordered-list',
              },
              {
                title: '列表2-1-1-1-1',
                path: '/list2-1-1-1-1',
                icon: 'ant-design:unordered-list',
              },
            ],
          },
        ],
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
    ],
  },
  {
    title: '哈哈2',
    path: 'main-menu2',
    icon: 'ant-design:home-outlined',
    type: 'group',
    items: [
      {
        title: '首页2',
        path: '/main-menu2/home',
        icon: 'ant-design:home-outlined',
      },
      {
        title: '关于',
        path: '/about',
        icon: 'ant-design:info-circle-outlined',
      },
      {
        title: '详情2',
        path: '/main-menu2/detail',
        icon: 'ant-design:info-circle-outlined',
      },
      {
        title: '列表10',
        path: '/main-menu2/list2',
        icon: 'ant-design:unordered-list',
        items: [
          {
            title: '列表2-1',
            path: '/main-menu2/list2-1',
            icon: 'ant-design:unordered-list',
          },
          {
            title: '列表2-1-1',
            path: '/main-menu2/list2-1-1',
            icon: 'ant-design:unordered-list',
            items: [
              {
                title: '列表2-1-1-1',
                path: '/main-menu2/list2-1-1-1',
                icon: 'ant-design:unordered-list',
              },
              {
                title: '列表2-1-1-1-1',
                path: '/main-menu2/list2-1-1-1-1',
                icon: 'ant-design:unordered-list',
              },
            ],
          },
        ],
      },
    ],
  },
];

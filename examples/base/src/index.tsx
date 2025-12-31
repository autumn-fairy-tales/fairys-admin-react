import ReactDOM from 'react-dom/client';
import {
  settingDataInstance,
  authDataInstance,
  appPluginDataInstance,
  notificationDataInstance,
  FairysWatermarkBase,
} from '@fairys/admin-tools-react';
import { AuthRoot } from './auth';

import logo from './assets/logo.png';
import './index.css';

// import routesData from '@virtual:fairys/routes';
// console.log('routesData', routesData);

settingDataInstance.ctor({
  logo: logo,
  projectName: 'Fairys Admin',
  themeColor: '#af52de',
  // autoListenSystemTheme: false,
});

/**挂载退出登录事件*/
authDataInstance.onLogout = () => {
  console.log('onLogout');
  localStorage.removeItem('token');
};

// ========================知设置==开始=======================================
notificationDataInstance.ctor({
  tabItems: [
    {
      title: '全部',
      key: 'all',
    },
    {
      title: '未读',
      key: 'unread',
    },
    {
      title: '已读',
      key: 'read',
    },
  ],
});

notificationDataInstance.updatedToType('unread', [
  {
    icon: 'ant-design:unordered-list',
    id: '1',
    title: '未读',
    date: '2023-01-01',
    type: 'info',
  },
]);

notificationDataInstance.updatedToType('read', [
  {
    icon: 'ant-design:unordered-list',
    id: '1',
    title: '已读',
    date: '2023-01-01',
    type: 'info',
  },
]);

notificationDataInstance.updatedToType('all', [
  {
    icon: 'ant-design:unordered-list',
    id: '1',
    title:
      '通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1通知1',
    date: '2023-01-01',
    type: 'info',
  },
  {
    icon: 'ant-design:unordered-list',
    id: '2',
    title: '通知2',
    date: '2023-01-02',
    type: 'success',
  },
]);
/**点击数据*/
notificationDataInstance.onClickItem = (item) => {
  console.log(item);
};
/**点击查看全部*/
notificationDataInstance.onClickMore = (activeKey) => {
  console.log(activeKey);
};
/**更新值 tabs 选项key（外部挂载事件）*/
notificationDataInstance.onUpdateActiveKey = (key) => {
  console.log(key);
};

// ========================通知设置==结束=======================================

appPluginDataInstance.addPlugin({
  'avatar-menus': {
    menus: [
      { title: '测试', icon: 'ant-design:question-circle-outlined' },
      { title: '测试2', icon: 'ant-design:question-circle-outlined' },
    ],
  },
  header: {
    render: <div className="px-4">自定义渲染 Fairys Admin</div>,
  },
  'toolBar-middle': {
    render: <div className="px-4">自定义渲染 Fairys Admin</div>,
  },
  'main-menu-bottom': {
    render: <div className="px-4">主菜单底部</div>,
  },
  'child-menu-bottom': {
    'top-render': <div className="px-4">子菜单底部1</div>,
    'bottom-render': <div className="px-4">子菜单底部2</div>,
  },
});
// /**临时加载菜单数据*/
// menuDataInstance.ctor(menuItems);
// /**临时加载一下tabBarItems*/
// /**
//  * 判断是否有权限,无权限则跳转到登录页/有权限则进入页面
//  */
// const router = routerDataInstance.createBrowserRouter(routes);
// const rootEl = document.getElementById('root');
// if (rootEl) {
//   const root = ReactDOM.createRoot(rootEl);
//   root.render(<FairysRoot router={router} keepAlive={true} />);
// }

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<AuthRoot />);
}

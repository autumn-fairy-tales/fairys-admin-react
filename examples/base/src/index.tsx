import ReactDOM from 'react-dom/client';
import {
  settingInstance,
  authDataInstance,
  appPluginDataInstance,
  notificationDataInstance,
} from '@fairys/admin-tools-react';
import { AuthRoot } from './auth';

import logo from './assets/logo.png';
import './index.css';

settingInstance.initSetting({
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
/**点击数据*/
notificationDataInstance.onClickItem = (item) => {
  console.log(item);
};

appPluginDataInstance.addPlugin({
  'avatar-menus': {
    menus: [
      { title: '测试', icon: 'ant-design:question-circle-outlined' },
      { title: '测试2', icon: 'ant-design:question-circle-outlined' },
    ],
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

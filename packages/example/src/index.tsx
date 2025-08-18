import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { settingInstance, FairysRoot } from '@fairys/admin-tools-react';
import logo from './assets/logo.png';
import { menuDataInstance } from '@fairys/admin-tools-react';
import { menuItems } from './menu';
import './index.css';

settingInstance.initSetting({
  logo: logo,
  projectName: 'Fairys Admin',
  themeColor: 'rgba(175, 82, 222, 1)',
  // autoListenSystemTheme: false,
});

/**临时加载菜单数据*/
menuDataInstance.ctor(menuItems);
/**临时加载一下tabBarItems*/
// tabBarInstance.ctor(menuItems?.[0]?.children || []);

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <FairysRoot keepAlive={true}>
      <RouterProvider router={router} />
    </FairysRoot>,
  );
}

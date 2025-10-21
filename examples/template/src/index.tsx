import ReactDOM from 'react-dom/client';
import { settingDataInstance, authDataInstance, FairysWatermarkBase } from '@fairys/admin-tools-react';
import { AuthRoot } from './auth';

import logo from './assets/logo.png';
import './index.css';

settingDataInstance.ctor({
  logo: logo,
  projectName: 'Fairys Admin',
  themeColor: '#af52de',
  enableToolBarNotification: false,
});

/**挂载退出登录事件*/
authDataInstance.onLogout = () => {
  console.log('onLogout');
  localStorage.removeItem('token');
};

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <FairysWatermarkBase zIndex={99} className="h-full w-full" content={['Fairys', 'Happy Working']}>
      <AuthRoot />
    </FairysWatermarkBase>,
  );
}

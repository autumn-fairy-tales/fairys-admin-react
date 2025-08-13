import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { settingInstance } from '@fairys/admin-tools-react';
import logo from './assets/logo.png';

import './menu';
import './index.css';

settingInstance.initSetting({
  logo: logo,
  projectName: 'Fairys Admin',
});

const rootEl = document.getElementById('root');
if (rootEl) {
  console.log(router);
  const root = ReactDOM.createRoot(rootEl);
  root.render(<RouterProvider router={router} />);
}

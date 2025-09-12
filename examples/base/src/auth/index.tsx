import { useEffect, useMemo } from 'react';
import {
  menuDataInstance,
  routerDataInstance,
  accountDataInstance,
  FairysRoot,
  useAuthDataInstance,
  authDataInstance,
  loadingFadeOut,
  FairysEnterLoading,
} from '@fairys/admin-tools-react';
import { menuItems } from '../menu';
import { routes } from '../routes';
import { Login } from './login';
import { onGetAuth } from './utils';

export const AuthRoot = () => {
  useMemo(() => {
    const token = localStorage.getItem('token');
    // if (!token) {
    loadingFadeOut();
    // }
    authDataInstance.updatedStatus(token ? 'RequestAuth' : 'Login');
  }, []);
  const [authState] = useAuthDataInstance();
  const status = authState.status;

  const onAuth = () => {
    authDataInstance.updatedStatus('RequestAuth');
    onGetAuth().then(() => {
      localStorage.setItem('token', '123');
      menuDataInstance.ctor(menuItems);
      accountDataInstance.updated({
        userName: 'fairys',
        userAvatar: 'https://gravatar.com/userimage/233185585/f004e2e1534508a34caef161ef76d9f2.jpeg?size=256',
      });
      // 可以对 routes 进行处理
      routerDataInstance.createHashRouter(routes);
      // 如果获取权限成功则设置状态为 auth
      authDataInstance.updatedStatus('Auth');
      /**移除页面加载动画*/
      loadingFadeOut();
    });
  };
  // 如果初始时Loading,则获取权限
  useEffect(() => {
    if (status === 'RequestAuth') {
      onAuth();
    }
  }, []);
  if (status === 'Login') {
    return <Login onLogin={onAuth} />;
  } else if (status === 'RequestAuth') {
    return <FairysEnterLoading loading />;
  }
  if (status === 'NoAuth') {
    return <div>NoAuth</div>;
  }
  return <FairysRoot router={routerDataInstance.router} keepAlive={true} />;
};

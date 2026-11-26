import { useEffect } from 'react';
import {
  menuDataInstance,
  routerDataInstance,
  FairysRoot,
  useAuthDataInstance,
  authDataInstance,
  loadingFadeOut,
  FairysEnterLoading,
  FairysWatermarkBase,
} from '@fairys/admin-tools-react';
import { menuItems } from '../menu';
import { routes } from '../routes';
import { Login } from './login';
import { onGetAuth } from './server';

/**入口初始化：在首次渲染前确定登录态，避免在渲染期写 store*/
const token = localStorage.getItem('token');
if (!token) {
  loadingFadeOut();
}
authDataInstance.updatedStatus(token ? 'RequestAuth' : 'Login');

export const AuthRoot = () => {
  const [authState] = useAuthDataInstance();
  const status = authState.status;

  const onSetInfo = () => {
    menuDataInstance.ctor(menuItems);
    // 可以对 routes 进行处理
    routerDataInstance.createHashRouter(routes);
    // 如果获取权限成功则设置状态为 auth
    authDataInstance.updatedStatus('Auth');
    /**移除页面加载动画*/
    loadingFadeOut();
  };

  const onAuth = () => {
    authDataInstance.updatedStatus('Loading');
    onGetAuth().then(() => {
      /**移除页面加载动画*/
      onSetInfo();
    });
  };
  // 如果初始时Loading,则获取权限
  useEffect(() => {
    if (status === 'RequestAuth') {
      onAuth();
    }
  }, []);

  if (status === 'Login') {
    return <Login onLogin={onSetInfo} />;
  } else if (status === 'RequestAuth' || status === 'Loading') {
    return <FairysEnterLoading loading />;
  }
  if (status === 'NoAuth') {
    return <div>NoAuth</div>;
  }
  return (
    <FairysWatermarkBase zIndex={99} className="h-full w-full" content={['Fairys', 'Happy Working']}>
      <FairysRoot router={routerDataInstance.router} keepAlive={true} />
    </FairysWatermarkBase>
  );
};

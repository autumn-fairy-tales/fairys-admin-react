import { proxy, useSnapshot } from 'valtio';
import { appDataInstance } from './index';

interface AuthDataState {
  /**
   * NoAuth 没权限
   * Auth 有权限，已进入页面
   * Loading 加载中权限中
   * Login 进入登录页面
   */
  status: 'NoAuth' | 'Auth' | 'RequestAuth' | 'Login';
  /**默认引用值*/
  __defaultValue?: string;
}

export class AuthDataInstance {
  state = proxy<AuthDataState>({
    status: 'Login',
  });
  updatedStatus = (status: AuthDataState['status']) => {
    this.state.status = status;
  };
  /**退出登录(需要外部赋值)*/
  public onLogout: () => void = () => void 0;
  /**内部退出登录*/
  public _onLogout: () => void = () => {
    this.updatedStatus('Login');
    appDataInstance.clear();
    this.onLogout?.();
  };
  /**清空数据*/
  clear = () => {};
}

export const authDataInstance = new AuthDataInstance();

export const useAuthDataInstance = () => {
  const state = useSnapshot(authDataInstance.state);
  return [state, authDataInstance, state.__defaultValue] as [
    AuthDataState,
    AuthDataInstance,
    AuthDataState['__defaultValue'],
  ];
};

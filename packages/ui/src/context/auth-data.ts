import { proxy, useSnapshot } from 'valtio';
import { appDataInstance } from './index';

interface AuthDataState {
  /**
   * NoAuth 没权限
   * Auth 有权限，已进入页面
   * RequestAuth 加载中权限中
   * Login 进入登录页面
   */
  status: 'NoAuth' | 'Auth' | 'RequestAuth' | 'Login';
  /**菜单权限*/
  menusPermissions: string[];
  /**按钮权限*/
  btnsPermissions: string[];
  /**忽略权限(忽略权限不会进行权限判断，不分按钮还是菜单,在判断时始终为true)*/
  ignorePermissions: string[];
  /**默认引用值*/
  __defaultValue?: string;
}

export class AuthDataInstance {
  constructor() {
    appDataInstance.authDataInstance = this;
  }
  state = proxy<AuthDataState>({
    status: 'Login',
    menusPermissions: [],
    btnsPermissions: [],
    ignorePermissions: [],
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
    this.clear();
    this.onLogout?.();
  };

  /**设置忽略权限*/
  public setIgnorePermissions = (permissions: string[]) => {
    this.state.ignorePermissions = permissions;
  };

  /**设置菜单权限*/
  public setMenusPermissions = (permissions: string[]) => {
    this.state.menusPermissions = permissions;
  };

  /**是否有菜单权限*/
  public isMenuAuth = (path: string) => {
    if (this.state.ignorePermissions.includes(path)) {
      return true;
    }
    return this.state.menusPermissions.includes(path);
  };

  /**设置按钮权限*/
  public setBtnsPermissions = (permissions: string[]) => {
    this.state.btnsPermissions = permissions;
  };

  /**是否有按钮权限*/
  public isBtnAuth = (path: string) => {
    if (this.state.ignorePermissions.includes(path)) {
      return true;
    }
    return this.state.btnsPermissions.includes(path);
  };

  /**清空数据*/
  clear = () => {
    this.state.menusPermissions = [];
    this.state.btnsPermissions = [];
    this.state.ignorePermissions = [];
  };
}
/**总的页面权限实例*/
export const authDataInstance = new AuthDataInstance();

export const useAuthDataInstance = () => {
  const state = useSnapshot(authDataInstance.state);
  return [state, authDataInstance, state.__defaultValue] as [
    AuthDataState,
    AuthDataInstance,
    AuthDataState['__defaultValue'],
  ];
};

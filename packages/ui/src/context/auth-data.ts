import { proxy, ref, useSnapshot } from 'valtio';
import { appDataInstance } from './index';

export interface AuthDataInstanceState {
  /**
   * NoAuth 没权限
   * Auth 有权限，已进入页面
   * RequestAuth 加载中权限中
   * Login 进入登录页面
   * Loading 加载中
   */
  status: 'NoAuth' | 'Auth' | 'RequestAuth' | 'Login' | 'Loading';
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
  static localStorageKeyMenu = 'fairys-auth-data-menu';
  static localStorageKeyBtn = 'fairys-auth-data-btn';
  static localStorageKeyIgnore = 'fairys-auth-data-ignore';

  state = proxy<AuthDataInstanceState>({
    status: 'Login',
    menusPermissions: [],
    btnsPermissions: [],
    ignorePermissions: [],
  });

  /**菜单权限*/
  get menusPermissions() {
    if ((this.state.menusPermissions || []).length) {
      return this.state.menusPermissions;
    }
    try {
      const state = localStorage.getItem(AuthDataInstance.localStorageKeyMenu);
      if (state) {
        const newState = JSON.parse(state);
        if (Array.isArray(newState) && newState.length) {
          this.state.menusPermissions = ref(newState || []);
        }
      }
    } catch (error) {
      console.log('获取菜单权限本地存储', error);
    }
    return [];
  }
  /**按钮权限*/
  get btnsPermissions() {
    if ((this.state.btnsPermissions || []).length) {
      return this.state.btnsPermissions;
    }
    try {
      const state = localStorage.getItem(AuthDataInstance.localStorageKeyBtn);
      if (state) {
        const newState = JSON.parse(state);
        if (Array.isArray(newState) && newState.length) {
          this.state.btnsPermissions = ref(newState || []);
        }
      }
    } catch (error) {
      console.log('获取按钮权限本地存储', error);
    }
    return [];
  }
  /**忽略权限*/
  get ignorePermissions() {
    if ((this.state.ignorePermissions || []).length) {
      return this.state.ignorePermissions;
    }
    try {
      const state = localStorage.getItem(AuthDataInstance.localStorageKeyIgnore);
      if (state) {
        const newState = JSON.parse(state);
        if (Array.isArray(newState) && newState.length) {
          this.state.ignorePermissions = ref(newState || []);
        }
      }
    } catch (error) {
      console.log('获取忽略权限本地存储', error);
    }
    return [];
  }

  constructor() {
    appDataInstance.authDataInstance = this;
  }

  updatedStatus = (status: AuthDataInstanceState['status']) => {
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
    this.state.ignorePermissions = ref(permissions || []);
    try {
      localStorage.setItem(AuthDataInstance.localStorageKeyIgnore, JSON.stringify(permissions));
    } catch (error) {
      console.log('设置忽略权限本地存储', error);
    }
  };

  /**设置菜单权限*/
  public setMenusPermissions = (permissions: string[]) => {
    this.state.menusPermissions = ref(permissions || []);
    try {
      localStorage.setItem(AuthDataInstance.localStorageKeyMenu, JSON.stringify(permissions));
    } catch (error) {
      console.log('设置菜单权限本地存储', error);
    }
  };

  /**是否有菜单权限*/
  public isMenuAuth = (path: string) => {
    if (this.ignorePermissions.includes(path)) {
      return true;
    }
    return this.menusPermissions.includes(path);
  };

  /**设置按钮权限*/
  public setBtnsPermissions = (permissions: string[]) => {
    this.state.btnsPermissions = ref(permissions || []);
    try {
      localStorage.setItem(AuthDataInstance.localStorageKeyBtn, JSON.stringify(permissions));
    } catch (error) {
      console.log('设置按钮权限本地存储', error);
    }
  };

  /**是否有按钮权限*/
  public isBtnAuth = (path: string) => {
    if (this.ignorePermissions.includes(path)) {
      return true;
    }
    return this.btnsPermissions.includes(path);
  };

  /**清空数据*/
  clear = () => {
    this.state.menusPermissions = ref([]);
    this.state.btnsPermissions = ref([]);
    this.state.ignorePermissions = ref([]);
    localStorage.removeItem(AuthDataInstance.localStorageKeyMenu);
    localStorage.removeItem(AuthDataInstance.localStorageKeyBtn);
    localStorage.removeItem(AuthDataInstance.localStorageKeyIgnore);
  };
}
/**总的页面权限实例*/
export const authDataInstance = new AuthDataInstance();

export const useAuthDataInstance = () => {
  const state = useSnapshot(authDataInstance.state);
  return [state, authDataInstance, state.__defaultValue] as [
    AuthDataInstanceState,
    AuthDataInstance,
    AuthDataInstanceState['__defaultValue'],
  ];
};

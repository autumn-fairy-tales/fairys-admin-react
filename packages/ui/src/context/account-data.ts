import { isBrowser } from 'utils';
import { proxy, ref, useSnapshot } from 'valtio';

export interface AccountDataInstanceState {
  /**用户名*/
  userName?: string;
  /**用户头像*/
  userAvatar?: string;
  /**用户邮箱*/
  userEmail?: string;
  /**用户手机号*/
  userPhone?: string;
  /**用户角色*/
  userRole?: string;
  /**用户ID*/
  userId?: string;
  /**其他自定义信息*/
  info?: Record<string, any>;
  /**默认引用值*/
  __defaultValue?: string;
}

export class AccountDataInstance {
  static localStorageKey = 'fairys-account-data';

  state = proxy<AccountDataInstanceState>({
    userName: 'fairys',
  });

  /**浏览器端初始化*/
  _browserConstructor = () => {
    const state = localStorage.getItem(AccountDataInstance.localStorageKey);
    if (state) {
      try {
        const newState = JSON.parse(state);
        if (newState) {
          for (const key in newState) {
            const element = newState[key];
            this.state[key] = element;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  constructor() {
    if (isBrowser) {
      this._browserConstructor();
    }
  }

  /**更新数据信息*/
  updated = (state: AccountDataInstanceState) => {
    for (const key in state) {
      const element = state[key];
      if (key === 'info') {
        const info = ref(state.info || {});
        this.state[key] = info;
      } else {
        this.state[key] = element;
      }
    }
    // 保存到本地存储
    localStorage.setItem(AccountDataInstance.localStorageKey, JSON.stringify(this.state));
  };
  /**清空账户数据*/
  clear = () => {
    for (const key in this.state) {
      this.state[key] = undefined;
      if (key === 'userName') {
        this.state[key] = 'fairys';
      }
    }
    // 清空本地存储
    localStorage.removeItem(AccountDataInstance.localStorageKey);
  };
}

export const accountDataInstance = new AccountDataInstance();

export const useAccountDataInstance = () => {
  const state = useSnapshot(accountDataInstance.state);
  return [state, accountDataInstance, state.__defaultValue] as [
    AccountDataInstanceState,
    AccountDataInstance,
    AccountDataInstanceState['__defaultValue'],
  ];
};

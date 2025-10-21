import { proxy, ref, useSnapshot } from 'valtio';

export interface AccountDataState {
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
  /**其他自定义信息*/
  info?: Record<string, any>;
  /**默认引用值*/
  __defaultValue?: string;
}

export class AccountDataInstance {
  state = proxy<AccountDataState>({
    userName: 'fairys',
  });
  /**更新数据信息*/
  updated = (state: AccountDataState) => {
    for (const key in state) {
      const element = state[key];
      if (key === 'info') {
        const info = ref(state.info || {});
        this.state[key] = info;
      } else {
        this.state[key] = element;
      }
    }
  };
  /**清空账户数据*/
  clear = () => {
    for (const key in this.state) {
      this.state[key] = undefined;
      if (key === 'userName') {
        this.state[key] = 'fairys';
      }
    }
  };
}

export const accountDataInstance = new AccountDataInstance();

export const useAccountDataInstance = () => {
  const state = useSnapshot(accountDataInstance.state);
  return [state, accountDataInstance, state.__defaultValue] as [
    AccountDataState,
    AccountDataInstance,
    AccountDataState['__defaultValue'],
  ];
};

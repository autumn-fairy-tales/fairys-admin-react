import { proxy, useSnapshot } from 'valtio';

interface AccountDataState {
  /**用户名*/
  userName: string;
  /**用户头像*/
  userAvatar?: string;
  info?: Record<string, any>;
  /**默认引用值*/
  __defaultValue?: string;
}

export class AccountDataInstance {
  state = proxy<AccountDataState>({
    userName: 'fairys',
  });
  /**退出登录*/
  public onLogout: () => void = () => void 0;
}

export const accountDataInstance = new AccountDataInstance();

export const useAccountData = () => {
  const state = useSnapshot(accountDataInstance.state);
  return [state, accountDataInstance, state.__defaultValue] as [
    AccountDataState,
    AccountDataInstance,
    AccountDataState['__defaultValue'],
  ];
};

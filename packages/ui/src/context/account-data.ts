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

export class AccountData {
  state = proxy<AccountDataState>({
    userName: 'fairys',
  });
  /**退出登录*/
  public onLogout: () => void = () => void 0;
}

export const accountData = new AccountData();

export const useAccountData = () => {
  const state = useSnapshot(accountData.state);
  return [state, accountData, state.__defaultValue] as [
    AccountDataState,
    AccountData,
    AccountDataState['__defaultValue'],
  ];
};

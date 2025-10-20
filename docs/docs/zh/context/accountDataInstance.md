# accountDataInstance 账号信息

:::tip 提示

用于存储当前登录用户的账号信息，包括用户名、用户头像、用户邮箱、用户手机号、用户角色等。

:::

:::warning 注意

建议在渲染`Layout`和`FairysRoot`组件之前，设置状态值

:::

## 引入

```ts
import { accountDataInstance } from '@fairys/admin-tools-react';
```

## 状态值

```ts
interface AccountDataState {
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
```

## 实体类

```ts
export class AccountDataInstance {
    state: AccountDataState;
    /**更新数据信息*/
    updated: (state: AccountDataState) => void;
    /**清空账户数据*/
    clear: () => void;
}
```

## hooks

```ts
export  const useAccountData: () => [AccountDataState, AccountDataInstance, AccountDataState["__defaultValue"]];
```

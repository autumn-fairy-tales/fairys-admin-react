# accountDataInstance 账号信息

:::tip 提示

用于存储当前登录用户的账号信息，包括用户名、用户头像、用户邮箱、用户手机号、用户角色等。

:::

:::warning 注意

建议在渲染`Layout`和`FairysRoot`组件之前，设置状态值

:::

## 引入

```ts
import { accountDataInstance , useAccountDataInstance } from '@fairys/admin-tools-react';
```

## 状态值

```ts
interface AccountDataInstanceState {
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
}
```

## 实体类

```ts
export class AccountDataInstance {
    state: AccountDataInstanceState;
    /**更新数据信息*/
    updated: (state: AccountDataInstanceState) => void;
    /**清空账户数据*/
    clear: () => void;
}
```

## hooks

```ts
export  const useAccountDataInstance: () => [AccountDataInstanceState, AccountDataInstance, AccountDataInstanceState["__defaultValue"]];
```

## 示例

```ts title='使用 accountDataInstance 更新账户数据'
import { accountDataInstance } from '@fairys/admin-tools-react';

accountDataInstance.updated({
  userName: '张三',
  userAvatar: 'https://example.com/avatar.jpg',
  userEmail: 'zhangsan@example.com',
  userPhone: '13800000000',
  userRole: 'admin',
});

```

```ts title='使用 useAccountDataInstance 获取账户数据'
import { useAccountDataInstance } from '@fairys/admin-tools-react';
import { useEffect } from 'react';

const Demo = ()=>{
  const [accountData, accountDataInstance] = useAccountDataInstance();

  useEffect(()=>{
    accountDataInstance.updated({
      userName: '李四',
      userAvatar: 'https://example.com/avatar.jpg',
      userEmail: 'lisi@example.com',
      userPhone: '13800000000',
      userRole: 'user',
    });
  },[accountData])

  return (
    <div>
      <p>用户名：{accountData.userName}</p>
      <p>用户头像：{accountData.userAvatar}</p>
      <p>用户邮箱：{accountData.userEmail}</p>
      <p>用户手机号：{accountData.userPhone}</p>
      <p>用户角色：{accountData.userRole}</p>
    </div>
  );
}
export default Demo;

```
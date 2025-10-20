# authDataInstance 认证数据

:::tip 提示

用于存储当前应用的认证数据，包括登录状态、菜单权限、按钮权限、忽略权限等。

:::

:::warning 注意

在调用方法判断是否有权限时，请确认已经设置`menusPermissions`和`btnsPermissions`值。

建议在加载`Layout`或`FairysRoot`组件之前设置。

:::

## 引入

```ts
import { authDataInstance } from '@fairys/admin-tools-react';
```

## 状态值

```ts
export interface AuthDataState {
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
```

## 实体类

```ts
export declare class AuthDataInstance {
    constructor();
    state: AuthDataState;
    updatedStatus: (status: AuthDataState["status"]) => void;
    /**退出登录(需要外部赋值)*/
    onLogout: () => void;
    /**内部退出登录*/
    _onLogout: () => void;
    /**设置忽略权限*/
    setIgnorePermissions: (permissions: string[]) => void;
    /**设置菜单权限*/
    setMenusPermissions: (permissions: string[]) => void;
    /**是否有菜单权限*/
    isMenuAuth: (path: string) => boolean;
    /**设置按钮权限*/
    setBtnsPermissions: (permissions: string[]) => void;
    /**是否有按钮权限*/
    isBtnAuth: (path: string) => boolean;
    /**清空数据*/
    clear: () => void;
}

```

## hooks

```ts
export  const useAuthDataInstance: () => [AuthDataState, AuthDataInstance, AuthDataState["__defaultValue"]];
```

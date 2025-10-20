# appDataInstance 应用数据

:::tip 提示

用于存储当前应用的全局数据，包括路由信息、设置信息、菜单信息、标签栏信息、账号信息、运动动画信息、应用插件信息、通知信息、收藏信息等。

:::

## 引入

```ts
import { appDataInstance } from '@fairys/admin-tools-react';
```

## 实体类

```ts
import { AliveControllerBase } from './alive-controller';
import { AuthDataInstance } from './auth-data';
import { FavoritesDataInstance } from './favorites-data';
declare class AppDataInstance {
    static router: import("./router-data").RouterDataInstance;
    static setting: import("./setting").SettingInstance;
    static menu: import("./menu-data").MenuDataInstance;
    static tabBar: import("./tab-bar").TabBarInstance;
    static account: import("./account-data").AccountDataInstance;
    static motionAnimation: import("./motion-animation").MotionAnimationInstance;
    static appPlugin: import("./app-plugins-data").AppPluginDataInstance;
    static notification: import("./notification-data").NotificationDataInstance;
    static favoritesDataInstance: FavoritesDataInstance;
    /**挂载的AliveController*/
    aliveController: AliveControllerBase;
    authDataInstance: AuthDataInstance;
    /**清空tab项*/
    clear: () => void;
}
```

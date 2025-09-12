import { accountDataInstance } from './account-data';
import { AliveControllerBase } from './alive-controller';
import { appPluginDataInstance } from './app-plugins-data';
import { authDataInstance } from './auth-data';
import { routerDataInstance } from './router-data';
import { settingInstance } from './setting';
import { menuDataInstance } from './menu-data';
import { tabBarInstance } from './tab-bar';
import { motionAnimationInstance } from './motion-animation';
import { notificationDataInstance } from './notification-data';

class AppDataInstance {
  static router = routerDataInstance;
  static setting = settingInstance;
  static menu = menuDataInstance;
  static tabBar = tabBarInstance;
  static account = accountDataInstance;
  static motionAnimation = motionAnimationInstance;
  static appPlugin = appPluginDataInstance;
  static notification = notificationDataInstance;
  static auth = authDataInstance;
  /**挂载的AliveController*/
  aliveController: AliveControllerBase;
  /**清空tab项*/
  clear = () => {
    routerDataInstance.clear();
    settingInstance.clear();
    menuDataInstance.clear();
    tabBarInstance.clear();
    accountDataInstance.clear();
    authDataInstance.clear();
    appPluginDataInstance.clear();
    notificationDataInstance.clear();
    this.aliveController.clear();
  };
}

/**应用数据使用实例*/
export const appDataInstance = new AppDataInstance();

import { accountDataInstance } from './account-data';
import { AliveControllerDataInstance } from './alive-controller';
import { appPluginDataInstance } from './app-plugins-data';
import { AuthDataInstance } from './auth-data';
import { routerDataInstance } from './router-data';
import { settingDataInstance } from './setting';
import { menuDataInstance } from './menu-data';
import { tabBarDataInstance } from './tab-bar';
import { motionAnimationDataInstance } from './motion-animation';
import { notificationDataInstance } from './notification-data';
import { FavoritesDataInstance, favoritesDataInstance } from './favorites-data';

class AppDataInstance {
  static router = routerDataInstance;
  static setting = settingDataInstance;
  static menu = menuDataInstance;
  static tabBar = tabBarDataInstance;
  static account = accountDataInstance;
  static motionAnimation = motionAnimationDataInstance;
  static appPlugin = appPluginDataInstance;
  static notification = notificationDataInstance;
  static favoritesDataInstance: FavoritesDataInstance = favoritesDataInstance;

  /**挂载的AliveController*/
  aliveController: AliveControllerDataInstance;
  authDataInstance: AuthDataInstance;

  /**清空tab项*/
  clear = () => {
    routerDataInstance.clear();
    settingDataInstance.clear();
    menuDataInstance.clear();
    tabBarDataInstance.clear();
    accountDataInstance.clear();
    appPluginDataInstance.clear();
    notificationDataInstance.clear();
    this.aliveController.clear();
  };
}

/**应用数据使用实例*/
export const appDataInstance = new AppDataInstance();

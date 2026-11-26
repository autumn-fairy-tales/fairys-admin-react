import { accountDataInstance } from './account-data';
import { appPluginDataInstance } from './app-plugins-data';
import { aliveControllerDataInstance } from './alive-controller';
import type { AliveControllerDataInstance } from './alive-controller';
import { authDataInstance } from './auth-data';
import type { AuthDataInstance } from './auth-data';
import { routerDataInstance } from './router-data';
import { settingDataInstance } from './setting';
import { menuDataInstance } from './menu-data';
import { tabBarDataInstance } from './tab-bar';
import { motionAnimationDataInstance } from './motion-animation';
import { notificationDataInstance } from './notification-data';
import { favoritesDataInstance } from './favorites-data';

class AppDataInstance {
  /**静态访问使用 getter，避免模块初始化时读取尚未初始化的单例*/
  static get router() {
    return routerDataInstance;
  }
  static get setting() {
    return settingDataInstance;
  }
  static get menu() {
    return menuDataInstance;
  }
  static get tabBar() {
    return tabBarDataInstance;
  }
  static get account() {
    return accountDataInstance;
  }
  static get motionAnimation() {
    return motionAnimationDataInstance;
  }
  static get appPlugin() {
    return appPluginDataInstance;
  }
  static get notification() {
    return notificationDataInstance;
  }
  static get favoritesDataInstance() {
    return favoritesDataInstance;
  }

  private _aliveController?: AliveControllerDataInstance;

  /**挂载的AliveController*/
  get aliveController(): AliveControllerDataInstance {
    return this._aliveController ?? aliveControllerDataInstance;
  }
  set aliveController(value: AliveControllerDataInstance) {
    this._aliveController = value;
  }

  /**使用 getter，避免模块初始化时读取尚未初始化的 authDataInstance*/
  get authDataInstance(): AuthDataInstance {
    return authDataInstance;
  }

  /**清空tab项*/
  clear = () => {
    routerDataInstance.clear();
    settingDataInstance.clear();
    menuDataInstance.clear();
    tabBarDataInstance.clear();
    accountDataInstance.clear();
    notificationDataInstance.clear();
    favoritesDataInstance.clear();
    this.aliveController?.clear?.();
  };
}

/**应用数据使用实例*/
export const appDataInstance = new AppDataInstance();

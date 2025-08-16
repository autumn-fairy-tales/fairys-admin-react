import type { AliveController } from 'react-activation';
import { routerDataInstance } from './router-data';
import { settingInstance } from './setting';
import { menuDataInstance } from './menu-data';
import { tabBarInstance } from './tab-bar';

class AppDataInstance {
  static router = routerDataInstance;
  static setting = settingInstance;
  static menu = menuDataInstance;
  static tabBar = tabBarInstance;
  /**挂载的AliveController*/
  aliveController: AliveController;
}

/**应用数据使用实例*/
export const appDataInstance = new AppDataInstance();

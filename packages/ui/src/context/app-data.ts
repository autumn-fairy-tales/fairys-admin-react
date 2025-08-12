import { routerDataInstance } from './router-data';
import { settingInstance } from './setting';
import { menuDataInstance } from './menu-data';
import { tabBarInstance } from './tab-bar';

class AppDataInstance {
  static router = routerDataInstance;
  static setting = settingInstance;
  static menu = menuDataInstance;
  static tabBar = tabBarInstance;
}

/**应用数据使用实例*/
export const appDataInstance = new AppDataInstance();

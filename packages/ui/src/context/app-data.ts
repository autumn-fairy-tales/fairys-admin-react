import { routerDataInstance } from './router-data';
import { settingInstance } from './setting';
import { menuDataInstance } from './menu-data';
import { tabBarInstance } from './tab-bar';
import { AliveControllerBase } from './alive-controller';
import { accountDataInstance } from './account-data';
import { motionAnimationInstance } from './motion-animation';

class AppDataInstance {
  static router = routerDataInstance;
  static setting = settingInstance;
  static menu = menuDataInstance;
  static tabBar = tabBarInstance;
  static account = accountDataInstance;
  static motionAnimation = motionAnimationInstance;
  /**挂载的AliveController*/
  aliveController: AliveControllerBase;
}

/**应用数据使用实例*/
export const appDataInstance = new AppDataInstance();

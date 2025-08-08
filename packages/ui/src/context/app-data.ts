import { routerDataInstance } from './router-data';
import { settingInstance } from './setting';

class AppDataInstance {
  router = routerDataInstance;
  setting = settingInstance;
}
/**应用数据使用实例*/
export const appDataInstance = new AppDataInstance();

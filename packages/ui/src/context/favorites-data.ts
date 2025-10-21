import { proxy, ref, useSnapshot } from 'valtio';
import { MenuItemType } from './menu-data';
import { settingDataInstance } from './setting';
export type FavoritesDataInstanceState = {
  /**列表数据*/
  dataList?: MenuItemType[];
  /**默认引用值*/
  __defaultValue?: string;
};

export class FavoritesDataInstance {
  static localStorageKey = 'fairys-favorites-data';

  state = proxy<FavoritesDataInstanceState>({
    dataList: ref([]),
  });

  constructor() {
    const state = localStorage.getItem(FavoritesDataInstance.localStorageKey);
    if (state) {
      try {
        const newState = JSON.parse(state);
        this.state.dataList = ref(newState || []);
      } catch (error) {
        console.log(error);
      }
    }
  }

  /**添加*/
  addItem = (item: MenuItemType) => {
    const fix = (this.state.dataList || []).find((i) => i.path === item.path);
    if (fix) {
      return;
    }
    const maxLength = settingDataInstance.state.favoritesMaxLength || 20;
    const maxData = [item, ...(this.state.dataList || [])].slice(0, maxLength);
    this.state.dataList = ref(maxData);
    try {
      localStorage.setItem(FavoritesDataInstance.localStorageKey, JSON.stringify(maxData));
    } catch (error) {
      console.log('添加收藏本地存储', error);
    }
  };

  /**移除*/
  removeItem = (item: MenuItemType) => {
    this.state.dataList = ref((this.state.dataList || []).filter((i) => i.path !== item.path));
  };

  /**清空数据*/
  clear = () => {};
}

/**收藏*/
export const favoritesDataInstance = new FavoritesDataInstance();

export const useFavoritesDataInstance = () => {
  const state = useSnapshot(favoritesDataInstance.state);
  return [state, favoritesDataInstance, state.__defaultValue] as [
    FavoritesDataInstanceState,
    FavoritesDataInstance,
    FavoritesDataInstanceState['__defaultValue'],
  ];
};

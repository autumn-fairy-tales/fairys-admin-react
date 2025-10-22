import { proxy, ref, useSnapshot } from 'valtio';
import { MenuItemType } from './menu-data';
import { settingDataInstance } from './setting';
import { isBrowser } from 'utils';
import { accountDataInstance } from './account-data';

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

  #getLocalStorageKey = () => {
    return `${accountDataInstance.state.userId}-${FavoritesDataInstance.localStorageKey}`;
  };

  /**浏览器端初始化*/
  _browserConstructor = () => {
    const state = localStorage.getItem(this.#getLocalStorageKey());
    if (state) {
      try {
        const newState = JSON.parse(state);
        this.state.dataList = ref(newState || []);
      } catch (error) {
        console.log(error);
      }
    }
  };

  constructor() {
    if (isBrowser) {
      this._browserConstructor();
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
      localStorage.setItem(this.#getLocalStorageKey(), JSON.stringify(maxData));
    } catch (error) {
      console.log('添加收藏本地存储', error);
    }
  };

  /**移除*/
  removeItem = (item: MenuItemType) => {
    this.state.dataList = ref((this.state.dataList || []).filter((i) => i.path !== item.path));
    try {
      localStorage.setItem(this.#getLocalStorageKey(), JSON.stringify(this.state.dataList));
    } catch (error) {
      console.log('移除收藏本地存储', error);
    }
  };

  /**是否收藏*/
  isFavorites = (item: MenuItemType) => {
    return !!(this.state.dataList || []).find((i) => i.path === item.path);
  };

  /**清空所有数据*/
  clearAll = () => {
    this.state.dataList = ref([]);
    try {
      localStorage.setItem(this.#getLocalStorageKey(), JSON.stringify(this.state.dataList));
    } catch (error) {
      console.log('清空收藏本地存储', error);
    }
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

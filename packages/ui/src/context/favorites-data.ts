import { proxy, ref, subscribe, useSnapshot } from 'valtio';
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

  /**当前收藏所属用户*/
  #userId?: string;

  #getLocalStorageKey = () => {
    return `${accountDataInstance.state.userId}-${FavoritesDataInstance.localStorageKey}`;
  };

  constructor() {
    if (!isBrowser) {
      return;
    }
    this.load();
    /**账号切换（登录/注销）时重新加载对应账号的收藏*/
    subscribe(accountDataInstance.state, () => {
      if (accountDataInstance.state.userId !== this.#userId) {
        this.load();
      }
    });
  }

  /**从本地存储加载当前用户收藏*/
  load = () => {
    const userId = accountDataInstance.state.userId;
    this.#userId = userId;
    try {
      const state = localStorage.getItem(this.#getLocalStorageKey());
      const newState = state ? JSON.parse(state) : [];
      this.state.dataList = ref(Array.isArray(newState) ? newState : []);
    } catch (error) {
      console.log('获取收藏本地存储', error);
      this.state.dataList = ref([]);
    }
  };

  get dataList() {
    return this.state.dataList || [];
  }

  /**添加*/
  addItem = (item: MenuItemType) => {
    const fix = this.dataList.find((i) => i.path === item.path);
    if (fix) {
      return;
    }
    const maxLength = settingDataInstance.state.favoritesMaxLength || 20;
    const maxData = [item, ...(this.dataList || [])].slice(0, maxLength);
    this.state.dataList = ref(maxData);
    try {
      localStorage.setItem(this.#getLocalStorageKey(), JSON.stringify(maxData));
    } catch (error) {
      console.log('添加收藏本地存储', error);
    }
  };

  /**移除*/
  removeItem = (item: MenuItemType) => {
    this.state.dataList = ref(this.dataList.filter((i) => i.path !== item.path));
    try {
      localStorage.setItem(this.#getLocalStorageKey(), JSON.stringify(this.state.dataList));
    } catch (error) {
      console.log('移除收藏本地存储', error);
    }
  };

  /**切换收藏*/
  onToggleFavorites = (item: MenuItemType) => {
    const fix = this.dataList.find((i) => i.path === item.path);
    if (fix) {
      this.removeItem(item);
    } else {
      this.addItem(item);
    }
  };

  /**是否收藏*/
  isFavorites = (item: MenuItemType) => {
    return !!(this.dataList || []).find((i) => i.path === item.path);
  };

  /**清空所有数据*/
  clearAll = () => {
    this.state.dataList = ref([]);
    try {
      localStorage.setItem(this.#getLocalStorageKey(), JSON.stringify([]));
    } catch (error) {
      console.log('清空收藏本地存储', error);
    }
  };

  /**清空数据*/
  clear = () => {
    this.state.dataList = ref([]);
  };
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

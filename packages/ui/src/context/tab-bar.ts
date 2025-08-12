import { proxy, ref, useSnapshot } from 'valtio';
import type { MenuItemType } from './menu-data';
import type { NavigateFunction } from 'react-router';
import { menuDataInstance } from './menu-data';
import { createContext, createRef, useContext, useRef } from 'react';

export interface TabBarItemType extends MenuItemType {}
interface TabBarInstanceState {
  /**tab项集合*/
  tabBarItems: TabBarItemType[];
  /**右侧选择的tab项集合,不在可视区域的数据*/
  dropDownTabBarItems: TabBarItemType[];
  /**默认引用值*/
  __defaultValue?: string;
}

class TabBarInstance {
  state = proxy<TabBarInstanceState>({
    tabBarItems: [],
    dropDownTabBarItems: [],
  });

  /**初始化渲染菜单数据*/
  ctor = (tabBarItems: MenuItemType[]) => {
    this.state.tabBarItems = ref(tabBarItems);
  };

  /**添加tab项*/
  addItem = (item: TabBarItemType) => {
    /**查询是否已经存在*/
    const finx = this.state.tabBarItems.find((it) => it.path === item.path);
    if (!finx) {
      this.state.tabBarItems = ref([...this.state.tabBarItems, item]);
    }
  };

  /**根据path添加tab项*/
  add = (path: string) => {
    /**查询是否已经存在*/
    const finx = this.state.tabBarItems.find((item) => item.path === path);
    if (!finx) {
      /**菜单中查找到数据进行存储*/
      const fix = menuDataInstance.get_path_menuItem(path);
      if (fix) {
        this.state.tabBarItems = ref([...this.state.tabBarItems, fix]);
      }
    }
  };

  /**删除tab项*/
  remove = (path: string, isActive: boolean, navigate: NavigateFunction) => {
    if (isActive) {
      const pathIndex = this.state.tabBarItems.findIndex((item) => item.path === path);
      this.state.tabBarItems = ref(this.state.tabBarItems.filter((item) => item.path !== path));
      let nativeItem = this.state.tabBarItems[pathIndex];
      if (!nativeItem) {
        nativeItem = this.state.tabBarItems[this.state.tabBarItems.length - 1];
      }
      if (nativeItem) {
        navigate(nativeItem.path);
      }
    } else {
      this.state.tabBarItems = ref(this.state.tabBarItems.filter((item) => item.path !== path));
    }
  };
}

export const tabBarInstance = new TabBarInstance();

export const useTabBar = () => {
  const state = useSnapshot(tabBarInstance.state);
  return [state, tabBarInstance, state.__defaultValue] as [TabBarInstanceState, TabBarInstance, string | undefined];
};

class TabItemInstance {
  /**节点*/
  dom = createRef<HTMLDivElement>();
  /**tab项数据*/
  item: TabBarItemType;
  /**是否当前项选中*/
  isActive = false;
  /**滚动到当前项*/
  scrollIntoView = () => {
    this.dom.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  };
}

export const useTabItemInstance = () => useRef(new TabItemInstance()).current;

class TabInstance {
  /**节点*/
  dom = createRef<HTMLDivElement>();
  tabBarItems: TabItemInstance[] = [];
  register = (item: TabItemInstance) => {
    this.tabBarItems.push(item);
    return () => {
      this.tabBarItems = this.tabBarItems.filter((it) => it !== item);
    };
  };

  private timer: NodeJS.Timeout;

  /**更新右侧选择的tab项集合*/
  updateDropDownTabBarItems = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const tabBarItems = this.tabBarItems || [];
      const containerRect = this.dom.current?.getBoundingClientRect();
      const dropDownTabBarItems = [];
      for (let index = 0; index < tabBarItems.length; index++) {
        const item = tabBarItems[index];
        if (item.dom.current) {
          const rect = item.dom.current.getBoundingClientRect();
          const width = rect.width / 2;
          const isVisible = rect.left >= containerRect.left - width && rect.right <= containerRect.right + width;
          if (!isVisible) {
            dropDownTabBarItems.push(item.item);
          }
        }
      }
      console.log('dropDownTabBarItems===>', dropDownTabBarItems);
      tabBarInstance.state.dropDownTabBarItems = ref(dropDownTabBarItems);
      clearTimeout(this.timer);
    }, 500);
  };

  /**监听子节点变化 回调方法*/
  private mutationObserverCallback = () => {
    this.updateDropDownTabBarItems();
  };

  /**监听节点尺寸变化 回调方法*/
  private resizeObserverCallback = () => {
    // 需要把当前tab项移入可视区
    for (let index = 0; index < this.tabBarItems.length; index++) {
      const element = this.tabBarItems[index];
      if (element.isActive) {
        element.scrollIntoView();
      }
    }
    this.updateDropDownTabBarItems();
  };

  /**监听子节点变化*/
  private mutationObserver = () => {
    const observer = new MutationObserver(this.mutationObserverCallback);
    if (this.dom.current)
      observer.observe(this.dom.current, {
        childList: true, // 监听子节点的添加/删除
        subtree: true, // 不监听后代节点（仅监听直接子节点）
      });
    return () => {
      observer.disconnect();
    };
  };

  /**监听节点尺寸变化*/
  private resizeObserver = () => {
    const resizeObserver = new ResizeObserver(this.resizeObserverCallback);
    if (this.dom.current) resizeObserver.observe(this.dom.current);
    return () => {
      resizeObserver.disconnect();
    };
  };

  /**添加监听事件*/
  addEventListener = () => {
    // 监听子节点的添加/删除
    const unMount_mutationObserver = this.mutationObserver();
    // 2. 监听子节点的尺寸变化（ResizeObserver）
    const unMount_resizeObserver = this.resizeObserver();
    this.updateDropDownTabBarItems();
    if (this.dom.current) {
      this.dom.current.addEventListener('scrollend', this.updateDropDownTabBarItems);
    }
    return () => {
      if (this.dom.current) this.dom.current.removeEventListener('scrollend', this.updateDropDownTabBarItems);
      unMount_mutationObserver();
      unMount_resizeObserver();
    };
  };
}

export const TabInstanceContext = createContext<TabInstance>(new TabInstance());
export const useTabInstance = () => useRef(new TabInstance()).current;
export const useTabInstanceContext = () => useContext(TabInstanceContext);

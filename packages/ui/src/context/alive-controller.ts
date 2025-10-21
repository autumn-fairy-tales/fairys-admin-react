import type { AliveController } from 'react-activation';

export class AliveControllerDataInstance {
  aliveController: AliveController;

  /**转换路由值*/
  static convertIdOrNameOne = (value: string) => {
    return `fairys_admin_keep_alive_${value}`;
  };

  /**转换路由值列表*/
  static convertIdOrNameList = (value: string[]) => {
    return value.map((item) => AliveControllerDataInstance.convertIdOrNameOne(item));
  };

  /**清空缓存*/
  clear = () => {
    this.aliveController?.clear?.();
  };

  /**删除缓存*/
  drop = (name: string) => {
    this.aliveController?.drop?.(AliveControllerDataInstance.convertIdOrNameOne(name));
  };

  /**删除缓存ById*/
  dropById = (id: string) => {
    this.aliveController?.dropById?.(AliveControllerDataInstance.convertIdOrNameOne(id));
  };

  /**删除缓存Scope*/
  dropScope = (name: string) => {
    this.aliveController?.dropScope?.(AliveControllerDataInstance.convertIdOrNameOne(name));
  };

  /**删除缓存ScopeByIds*/
  dropScopeByIds = (ids: string[]) => {
    this.aliveController?.dropScopeByIds?.(AliveControllerDataInstance.convertIdOrNameList(ids));
  };

  /**刷新缓存*/
  refresh = (name: string) => {
    this.aliveController?.refresh?.(AliveControllerDataInstance.convertIdOrNameOne(name));
  };

  /**刷新缓存ById*/
  refreshById = (id: string) => {
    this.aliveController?.refreshById?.(AliveControllerDataInstance.convertIdOrNameOne(id));
  };

  /**刷新缓存Scope*/
  refreshScope = (name: string) => {
    this.aliveController?.refreshScope?.(AliveControllerDataInstance.convertIdOrNameOne(name));
  };

  /**刷新缓存ScopeByIds*/
  refreshScopeByIds = (ids: string[]) => {
    this.aliveController?.refreshScopeByIds?.(AliveControllerDataInstance.convertIdOrNameList(ids));
  };

  /**获取缓存节点*/
  getCachingNodes = () => {
    return this.aliveController?.getCachingNodes?.();
  };
}

export const aliveControllerDataInstance = new AliveControllerDataInstance();

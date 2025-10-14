import type { AliveController } from 'react-activation';

export class AliveControllerBase {
  aliveController: AliveController;

  /**转换路由值*/
  static convertIdOrNameOne = (value: string) => {
    return `fairys_admin_keep_alive_${value}`;
  };

  /**转换路由值列表*/
  static convertIdOrNameList = (value: string[]) => {
    return value.map((item) => AliveControllerBase.convertIdOrNameOne(item));
  };

  /**清空缓存*/
  clear = () => {
    this.aliveController?.clear?.();
  };

  /**删除缓存*/
  drop = (name: string) => {
    this.aliveController?.drop?.(AliveControllerBase.convertIdOrNameOne(name));
  };

  /**删除缓存ById*/
  dropById = (id: string) => {
    this.aliveController?.dropById?.(AliveControllerBase.convertIdOrNameOne(id));
  };

  /**删除缓存Scope*/
  dropScope = (name: string) => {
    this.aliveController?.dropScope?.(AliveControllerBase.convertIdOrNameOne(name));
  };

  /**删除缓存ScopeByIds*/
  dropScopeByIds = (ids: string[]) => {
    this.aliveController?.dropScopeByIds?.(AliveControllerBase.convertIdOrNameList(ids));
  };

  /**刷新缓存*/
  refresh = (name: string) => {
    this.aliveController?.refresh?.(AliveControllerBase.convertIdOrNameOne(name));
  };

  /**刷新缓存ById*/
  refreshById = (id: string) => {
    this.aliveController?.refreshById?.(AliveControllerBase.convertIdOrNameOne(id));
  };

  /**刷新缓存Scope*/
  refreshScope = (name: string) => {
    this.aliveController?.refreshScope?.(AliveControllerBase.convertIdOrNameOne(name));
  };

  /**刷新缓存ScopeByIds*/
  refreshScopeByIds = (ids: string[]) => {
    this.aliveController?.refreshScopeByIds?.(AliveControllerBase.convertIdOrNameList(ids));
  };

  /**获取缓存节点*/
  getCachingNodes = () => {
    return this.aliveController?.getCachingNodes?.();
  };
}

export const aliveControllerBaseInstance = new AliveControllerBase();

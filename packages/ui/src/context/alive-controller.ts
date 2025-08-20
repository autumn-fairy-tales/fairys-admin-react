import type { AliveController } from 'react-activation';

export class AliveControllerBase {
  aliveController: AliveController;

  static convertIdOrNameOne = (value: string) => {
    return `fairys_admin_keep_alive_${value}`;
  };

  static convertIdOrNameList = (value: string[]) => {
    return value.map((item) => AliveControllerBase.convertIdOrNameOne(item));
  };

  clear = () => {
    this.aliveController?.clear?.();
  };

  drop = (name: string) => {
    this.aliveController?.drop?.(AliveControllerBase.convertIdOrNameOne(name));
  };

  dropById = (id: string) => {
    this.aliveController?.dropById?.(AliveControllerBase.convertIdOrNameOne(id));
  };

  dropScope = (name: string) => {
    this.aliveController?.dropScope?.(name);
  };

  dropScopeByIds = (ids: string[]) => {
    this.aliveController?.dropScopeByIds?.(AliveControllerBase.convertIdOrNameList(ids));
  };

  refresh = (name: string) => {
    this.aliveController?.refresh?.(AliveControllerBase.convertIdOrNameOne(name));
  };

  refreshById = (id: string) => {
    this.aliveController?.refreshById?.(AliveControllerBase.convertIdOrNameOne(id));
  };

  refreshScope = (name: string) => {
    this.aliveController?.refreshScope?.(AliveControllerBase.convertIdOrNameOne(name));
  };

  refreshScopeByIds = (ids: string[]) => {
    this.aliveController?.refreshScopeByIds?.(AliveControllerBase.convertIdOrNameList(ids));
  };

  getCachingNodes = () => {
    return this.aliveController?.getCachingNodes?.();
  };
}

export const aliveControllerBaseInstance = new AliveControllerBase();

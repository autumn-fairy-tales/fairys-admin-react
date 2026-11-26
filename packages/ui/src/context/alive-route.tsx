import { useEffect } from 'react';
import { AliveScope, useAliveController } from 'react-activation';
import { Outlet } from 'react-router';
import { aliveControllerDataInstance } from './alive-controller';

const FairysAliveController = (): null => {
  const aliveController = useAliveController();
  useEffect(() => {
    aliveControllerDataInstance.aliveController = aliveController;
  }, [aliveController]);
  return null;
};

/**挂在路由树最外层的缓存作用域，保证缓存节点仍处于 RouterProvider 上下文内*/
export const FairysAliveRoute = () => {
  return (
    <AliveScope>
      <Outlet />
      <FairysAliveController />
    </AliveScope>
  );
};

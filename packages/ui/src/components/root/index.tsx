import { AliveScope, useAliveController } from 'react-activation';
import { Fragment, createContext, useContext, useMemo, useRef } from 'react';
import { appDataInstance } from 'context/app-data';
import { aliveControllerBaseInstance } from 'context/alive-controller';
import { DataRouter, RouterProvider } from 'react-router';
import { routerDataInstance } from 'context';

export interface FairysRootProps {
  children?: React.ReactNode;
  /**启用缓存*/
  keepAlive?: boolean;
  /**路由*/
  router?: DataRouter;
  /**是否是Outlet组件启用缓存*/
  isOutletKeepAlive?: boolean;
}

export class FairysRootClass {
  /**启用缓存*/
  keepAlive: boolean;
  /**是否是Outlet组件启用缓存*/
  isOutletKeepAlive: boolean;
}
export const useFairysRoot = (fairysRootClass?: FairysRootClass) => {
  const ref = useRef<FairysRootClass>();
  if (!ref.current) {
    if (fairysRootClass) {
      ref.current = fairysRootClass;
    } else {
      ref.current = new FairysRootClass();
    }
  }
  return ref.current;
};
export const FairysRootContext = createContext<FairysRootClass>(new FairysRootClass());
export const useFairysRootContext = () => useContext(FairysRootContext);

/**空标签进行挂载 aliveController*/
export const FairysRootAliveController = () => {
  const aliveController = useAliveController();
  aliveControllerBaseInstance.aliveController = aliveController;
  appDataInstance.aliveController = aliveControllerBaseInstance;
  // 空标签进行挂载数据
  return <Fragment />;
};

export const FairysRoot = (props: FairysRootProps) => {
  const { children, keepAlive = true, router, isOutletKeepAlive = true } = props;
  const fairysRootClass = useFairysRoot();
  fairysRootClass.keepAlive = keepAlive;
  fairysRootClass.isOutletKeepAlive = isOutletKeepAlive;

  if (router && !routerDataInstance.__navigate) {
    routerDataInstance.router = router;
    routerDataInstance.__navigate = router.navigate;
    router.navigate = routerDataInstance.navigate;
  }

  const childElement = useMemo(() => {
    if (router) {
      return <RouterProvider router={router} />;
    }
    return children;
  }, [children, router]);

  if (!keepAlive) {
    return <FairysRootContext.Provider value={fairysRootClass}>{childElement}</FairysRootContext.Provider>;
  }
  return (
    <FairysRootContext.Provider value={fairysRootClass}>
      <AliveScope>
        {childElement}
        <FairysRootAliveController />
      </AliveScope>
    </FairysRootContext.Provider>
  );
};

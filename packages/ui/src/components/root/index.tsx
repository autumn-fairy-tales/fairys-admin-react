import { AliveScope, useAliveController } from 'react-activation';
import { Fragment, createContext, useContext, useRef } from 'react';
import { appDataInstance } from 'context/app-data';

export interface FairysRootProps {
  children: React.ReactNode;
  /**启用缓存*/
  keepAlive?: boolean;
}

export class FairysRootClass {
  keepAlive: boolean;
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
  appDataInstance.aliveController = aliveController;
  // 空标签进行挂载数据
  return <Fragment />;
};

export const FairysRoot = (props: FairysRootProps) => {
  const { children, keepAlive = true } = props;
  const fairysRootClass = useFairysRoot();
  fairysRootClass.keepAlive = keepAlive;

  if (!keepAlive) {
    return <FairysRootContext.Provider value={fairysRootClass}>{children}</FairysRootContext.Provider>;
  }
  return (
    <FairysRootContext.Provider value={fairysRootClass}>
      <AliveScope>
        {children}
        <FairysRootAliveController />
      </AliveScope>
    </FairysRootContext.Provider>
  );
};

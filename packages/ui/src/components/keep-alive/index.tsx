import { FC } from 'react';
import { KeepAlive } from 'react-activation';
import { FairysMotionAnimation } from 'components/motion-animation';

export const KeepAliveBaseHOC = (Component: FC, id: string) => {
  return (props: any) => {
    return (
      <KeepAlive name={id} id={id} cacheKey={id} key={id}>
        <FairysMotionAnimation key={`${id}_motion`}>
          <Component {...props} />
        </FairysMotionAnimation>
      </KeepAlive>
    );
  };
};

export default KeepAliveBaseHOC;

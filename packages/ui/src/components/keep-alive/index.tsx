import { FC } from 'react';
import { KeepAlive } from 'react-activation';

export const KeepAliveBaseHOC = (Component: FC, id: string) => {
  return (props: any) => {
    return (
      <KeepAlive name={id} id={id} cacheKey={id} key={id}>
        <Component {...props} />
      </KeepAlive>
    );
  };
};

export default KeepAliveBaseHOC;

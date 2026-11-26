import { useEffect } from 'react';
import { useRouteError } from 'react-router';
import { ErrorPage500 } from './500';

/**路由级错误兜底组件，供约定式路由生成器使用*/
export const FairysErrorElement = () => {
  const error = useRouteError();

  useEffect(() => {
    console.error('FairysErrorElement', error);
  }, [error]);

  return <ErrorPage500 />;
};

export default FairysErrorElement;

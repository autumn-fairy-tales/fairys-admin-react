import { FairysMainPage } from '@fairys/admin-tools-react';
import { NavLink } from 'react-router';
import { FairysMainPageBody } from '@fairys/admin-tools-react';

const MainIndex = () => {
  return (
    <FairysMainPage>
      <FairysMainPageBody>
        <NavLink to="/">首页</NavLink>
        <NavLink to="/list">列表</NavLink>
        <NavLink to="/detail">详情</NavLink>
      </FairysMainPageBody>
    </FairysMainPage>
  );
};
export const Component = MainIndex;
export default Component;

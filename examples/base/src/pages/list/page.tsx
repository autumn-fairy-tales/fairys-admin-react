import { FairysMainPage } from '@fairys/admin-tools-react';
import { KeepAlive } from 'react-activation';

const MainIndex = () => {
  return (
    <FairysMainPage>
      <input
        className="outline-none border border-gray-300 rounded-sm min-h-[32px] box-border p-2"
        placeholder="请输入"
      />
      List
    </FairysMainPage>
  );
};
export const Component = MainIndex;

// export const Component = () => {
//   const id = 'fairys_admin_keep_alive_/list'
//   return (
//     <KeepAlive name={id} id={id} cacheKey={id} key={id}>
//       <MainIndex />
//     </KeepAlive>
//   );
// };
export default Component;

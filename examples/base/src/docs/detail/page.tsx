import { FairysMainPage } from '@fairys/admin-tools-react';
import { KeepAlive } from 'react-activation';

const MainIndex = () => {
  return (
    <FairysMainPage>
      <div>DOC</div>
      <input
        className="outline-none border border-gray-300 dark:border-gray-600 rounded-sm min-h-[32px] box-border p-2"
        placeholder="请输入"
      />
      detail
    </FairysMainPage>
  );
};
export const Component = MainIndex;
// export const Component = () => {
//   const id = 'fairys_admin_keep_alive_/detail'
//   return (
//     <KeepAlive name={id} id={id} cacheKey={id} key={id}>
//       <MainIndex />
//     </KeepAlive>
//   );
// };
export default Component;

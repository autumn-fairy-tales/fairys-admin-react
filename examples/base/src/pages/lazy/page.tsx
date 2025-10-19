import { FairysMainPage } from '@fairys/admin-tools-react';

const MainIndex = () => {
  return <FairysMainPage>lazy load</FairysMainPage>;
};
export const Component = MainIndex;
// export const Component = () => {
//   const id = 'fairys_admin_keep_alive_/lazy'
//   return (
//     <KeepAlive name={id} id={id} cacheKey={id} key={id}>
//       <MainIndex />
//     </KeepAlive>
//   );
// };
export default Component;

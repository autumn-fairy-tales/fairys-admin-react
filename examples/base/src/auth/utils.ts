const requestAuth = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export const onLogin = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 5000);
  });
};

export const onGetAuth = () => {
  return requestAuth();
};

let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

interface SetupTokenRefreshProps {
  store: {
    dispatch: (action: any) => void;
  };

  logoutAction: () => any;
  refreshTokenAction: () => any;
}

export const isLoginExpired = (): boolean => {
  const loginTimestamp = localStorage.getItem("loginTimestamp");
  if (!loginTimestamp) {
    return true;
  }
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  return now - Number(loginTimestamp) > sevenDays;
};

export const setupTokenRefresh = ({
  store,
  logoutAction,
  refreshTokenAction,
}: SetupTokenRefreshProps): void => {
  
  if (isLoginExpired()) {
    store.dispatch(logoutAction());
    return;
  }

  const tokenExpiry = localStorage.getItem("tokenExpiry");
  if (!tokenExpiry) {
    return;
  }

  const currentTime = Date.now();
  const expiresIn = Number(tokenExpiry) - currentTime;
  const refreshIn = expiresIn - 2 * 60 * 1000;

  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }

  if (refreshIn <= 0) {
    store.dispatch(refreshTokenAction());
  } else {
    refreshTimeout = setTimeout(() => {
      store.dispatch(refreshTokenAction());
    }, refreshIn);
  }
};

export const clearTokenRefresh = (): void => {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }
};

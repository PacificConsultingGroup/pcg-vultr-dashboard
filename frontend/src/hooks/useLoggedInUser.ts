import { useCallback, useEffect, useState } from 'react';

import backendAxios from '@/src/lib/configuredAxios';
import type LoggedInUser from '@/src/schemas/LoggedInUser';

const loggedInUserLSKey = 'PCGVultrDashboard_loggedInUser';

function registerAsLoggedInInLS(userId: LoggedInUser['userId']) {
  localStorage.setItem(loggedInUserLSKey, userId);
}

function registerAsLoggedOutInLS() {
  localStorage.removeItem(loggedInUserLSKey);
}

function getLoggedInUserIdFromLS() {
  const userId = localStorage.getItem(loggedInUserLSKey);
  return userId;
}

export default function useLoggedInUser() {

  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>();

  function logout() {
    backendAxios.post(`/api/logout`);
    setLoggedInUser(undefined);
    registerAsLoggedOutInLS();
  }

  const authenticate = useCallback(() => {
    const claimedLoggedInUserId = getLoggedInUserIdFromLS();
    if (!claimedLoggedInUserId) {
      logout();
    } else {
      (async () => {
        try {
          const { data } = await backendAxios.get<LoggedInUser | undefined>(`/api/login/check/${claimedLoggedInUserId}`);
          if (!data) return logout();
          registerAsLoggedInInLS(data.userId);
          setLoggedInUser(data);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, []);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return {
    loggedInUser,
    authenticate,
    logout
  };
}
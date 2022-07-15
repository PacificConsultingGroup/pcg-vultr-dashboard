
import { useCallback, useEffect, useState } from 'react';

import backendAxios from '@/src/lib/configuredAxios';
import type LoggedInUser from '@/src/schemas/LoggedInUser';
import type User from '@/src/schemas/database/User';

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

  async function login(email: User['email'], password: User['password']) {
    const { data } = await backendAxios.post<LoggedInUser>(`/api/login`, { email, password });
    // Login successful
    registerAsLoggedInInLS(data.userId);
    setLoggedInUser(data);
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
    login,
    logout
  };
}
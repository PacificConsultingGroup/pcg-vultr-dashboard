import { vultrFetchClient } from '@/src/lib/configured-fetch/fetch.client';
import VultrUser from '@/src/schema/vultr/VultrUser';

export async function authenticate(email: VultrUser['email'], password: VultrUser['password']): Promise<VultrUser | null> {
  const { data } = await vultrFetchClient.get<{ users: VultrUser[] }>('/users');
  const allUsers = data.users;
  const userToLogin = allUsers.find(user => user.email === email);
  if (!userToLogin) return null;
  if (userToLogin.password !== password) return null;
  return userToLogin;
}
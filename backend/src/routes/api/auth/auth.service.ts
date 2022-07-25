import { vultrFetchClient } from '@/src/lib/configured-fetch/fetch.client';
import User from '@/src/routes/vultr/users/users.schema';

export async function authenticate(email: User['email'], password: User['password']): Promise<User | null> {
  const { data } = await vultrFetchClient.get<{ users: User[] }>('/users');
  const allUsers = data.users;
  const userToLogin = allUsers.find(user => user.email === email);
  if (!userToLogin) return null;
  if (userToLogin.password !== password) return null;
  return userToLogin;
}
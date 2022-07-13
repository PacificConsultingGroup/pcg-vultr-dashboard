
import User from '@/src/schemas/database/User';

type LoggedInUser = Pick<User,
  'userId'
  | 'name'
  | 'email'
  | 'handle'
>;

export default LoggedInUser;
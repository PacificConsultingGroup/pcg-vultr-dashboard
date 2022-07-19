
import User from '@/src/routes/vultr/users/users.schema';

declare global {
  namespace Express {
    interface Request {
      loggedInUserId?: User['id'];
    }
  }
}
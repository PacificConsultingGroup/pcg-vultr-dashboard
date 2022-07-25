
import User from '@/src/routes/vultr/vultr.schema';

declare global {
  namespace Express {
    interface Request {
      loggedInUserId?: User['id'];
    }
  }
}
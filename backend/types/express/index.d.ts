
import VultrUser from '@/src/schema/vultr/VultrUser';

declare global {
  namespace Express {
    interface Request {
      loggedInUserId?: VultrUser['id'];
    }
  }
}
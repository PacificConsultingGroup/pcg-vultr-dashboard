
type ACL = (
  'abuse'
  | 'alerts'
  | 'billing'
  | 'dns'
  | 'firewall'
  | 'loadbalancer'
  | 'manage_users'
  | 'objstore'
  | 'provisioning'
  | 'subscriptions'
  | 'subscriptions_view'
  | 'support'
  | 'upgrade'
);

export default interface VultrUser {
  id: string;
  name: string;
  api_enabled: boolean;
  email: string;
  password: string;
  acls: ACL[];
}
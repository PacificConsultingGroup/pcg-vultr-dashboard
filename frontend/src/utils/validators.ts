
export function validateEmail(email: string) {
  if (!email) return 'Please enter an email';
  if (!/^.+@.+$/.test(email)) return 'Please enter a valid email';
  if (email.length > 100) return 'Please enter an email no longer than 100 characters';

  return undefined;
}

export function validatePassword(password: string, detailed?: boolean) {
  if (!password) return 'Please enter a password';
  if (detailed) {
    if (password.length < 8 || password.length > 24) return 'Password needs to be between 8 to 24 characters';
  }

  return undefined;
}

import { ResponseInterface } from '@interfaces/response/Response.interface';

const MESSAGES: Record<string, string> = {
  'invalid email': 'Enter a valid email address',
  'code was sent recently, try again in a minute':
    'A code was just sent. Try again in a minute.',
  'invalid or expired code': 'This code is wrong or has expired',
  'new password is empty': 'Enter a new password'
};

// The account email and password reset endpoints answer wrong input with a
// reason, null means the request itself failed
export const getAuthErrorMessage = (response: ResponseInterface): string =>
  MESSAGES[response?.message] ||
  response?.message ||
  'Something went wrong. Please try again.';

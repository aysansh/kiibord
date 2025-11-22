/**
 * Application Constants
 */

export const APP_CONFIG = {
  name: 'KIIBORD',
  tagline: 'WHO WON',
  description: 'Gaming Tournament Management Platform',
} as const;

export const ROUTES = {
  LOGIN: 'login',
  REGISTER: 'register',
  OTP: 'otp',
} as const;

export const OTP_CONFIG = {
  length: 6,
  resendDelay: 2000, // 2 seconds
} as const;

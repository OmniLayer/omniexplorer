/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const API_URL_BASE = 'https://api.omniwallet.org/v1';
  // (process.env.NODE_ENV !== 'production' ? '/api/v1' : 'https://api.omniwallet.org/v1');
export const DEFAULT_LOCALE = 'en';

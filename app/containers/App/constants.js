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

export const API_URL_BASE = 'https://api.omniexplorer.info/v1';
export const DEFAULT_LOCALE = 'en';
export const DEFAULT_NOT_NUMBER = '---';
export const ECOSYSTEM_PROD = 1;
export const ECOSYSTEM_TEST = 2;
export const ECOSYSTEM_PROD_NAME = 'Production';
export const ECOSYSTEM_TEST_NAME = 'Test';

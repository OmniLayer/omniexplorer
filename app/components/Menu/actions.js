import { TOGGLE_DISABLED_TESTNET } from './constants';

/**
 * Resolve the fetch with the returned data
 * @param {object} payload - the data returned from the fetch
 */
export const toggleDisabledTestnet = payload => ({
  type: TOGGLE_DISABLED_TESTNET,
});

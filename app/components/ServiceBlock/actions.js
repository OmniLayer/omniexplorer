import { LOAD_STATUS, LOAD_STATUS_SUCCESS } from './constants';

// Start the fetch, toggle is `isFetching` value
export const startFetch = () => ({ type: LOAD_STATUS });

/**
 * Resolve the fetch with the returned data
 * @param {object} payload - the data returned from the fetch
 */
export const updateFetch = payload => ({
  type: LOAD_STATUS_SUCCESS,
  payload,
});

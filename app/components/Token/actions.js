import {
  LOAD_PROPERTY,
  LOAD_PROPERTY_SUCCESS,
  LOAD_PROPERTY_ERROR,
} from './constants';

/**
 * Log an error if the async call fails
 * @param {object} error - the error thrown.
 */
export const errorFetch = (error) => ({
  type: LOAD_PROPERTY_ERROR,
  error,
});

// Start the fetch, toggle is `isFetching` value
export const startFetch = (tokenid) => ({
  type: LOAD_PROPERTY,
  id: tokenid,
});

/**
 * Resolve the fetch with the returned data
 * @param {object} payload - the data returned from the fetch
 */
export const updateFetch = (payload) => ({
  type: LOAD_PROPERTY_SUCCESS,
  payload,
});

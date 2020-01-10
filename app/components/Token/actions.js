import {
  LOAD_PROPERTY,
  LOAD_PROPERTY_SUCCESS,
  LOAD_PROPERTY_DEEP,
  LOAD_PROPERTY_CANCEL,
} from './constants';

// Start the fetch, toggle is `isFetching` value
export const startFetch = tokenid => ({
  type: LOAD_PROPERTY,
  id: tokenid,
});

/**
 * Resolve the fetch with the returned data
 * @param {object} payload - the data returned from the fetch
 */
export const updateFetch = payload => ({
  type: LOAD_PROPERTY_SUCCESS,
  payload,
});

// Start the deep fetch, toggle is `isFetching` value
export const startDeepFetch = tokenid => ({
  type: LOAD_PROPERTY_DEEP,
  id: tokenid,
});

export const cancelFetch = () => ({
  type: LOAD_PROPERTY_CANCEL,
});

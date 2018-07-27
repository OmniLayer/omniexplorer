import {
  LOAD_CROWDSALE_TRANSACTIONS,
  LOAD_CROWDSALE_TRANSACTIONS_SUCCESS,
  LOAD_CROWDSALE_TRANSACTIONS_ERROR,
} from './constants';

/**
 * Log an error if the async call fails
 * @param {object} error - the error thrown.
 */
export const errorCrowdsaleTransactionsFetch = error => ({
  type: LOAD_CROWDSALE_TRANSACTIONS_ERROR,
  error,
});

// Start the fetch, toggle is `isFetching` value
export const startCrowdsaleTransactionsFetch = crowdsaleId => ({
  type: LOAD_CROWDSALE_TRANSACTIONS,
  id: crowdsaleId,
});

/**
 * Resolve the fetch with the returned data
 * @param {object} payload - the data returned from the fetch
 */
export const updateCrowdsaleTransactionsFetch = (
  transactions,
  pages,
  total,
  page,
) => ({
  type: LOAD_CROWDSALE_TRANSACTIONS_SUCCESS,
  transactions,
  pages,
  total,
  page,
});

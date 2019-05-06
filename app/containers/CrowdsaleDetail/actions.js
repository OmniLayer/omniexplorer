import {
  LOAD_CROWDSALE_TRANSACTIONS,
  LOAD_CROWDSALE_TRANSACTIONS_SUCCESS,
  SET_CROWDSALES_TRANSACTIONS_PAGE,
} from './constants';

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

/**
 * Dispatched when the page change
 *
 * @param  {number} page The page number
 *
 * @return {object} An action object with the page
 */
export function setPage(page) {
  return {
    type: SET_CROWDSALES_TRANSACTIONS_PAGE,
    page,
  };
}

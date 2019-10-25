import { createSelector } from 'reselect';

/**
 * Direct selector to the transactionDetail state domain
 */
const selectTransactionDetailDomain = state => state.get('transactionDetail');

/**
 * Other specific selectors
 */

/**
 * Default selector used by TransactionDetail
 */

const makeSelectTransactionDetail = () =>
  createSelector(selectTransactionDetailDomain, substate => substate);

export default makeSelectTransactionDetail;
export { selectTransactionDetailDomain };

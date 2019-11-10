import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the transactionDetail state domain
 */
const selectTransactionDetailDomain = state => state.transactionDetail || initialState;

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

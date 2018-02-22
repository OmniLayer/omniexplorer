import { createSelector } from 'reselect';

/**
 * Direct selector to the transactions state domain
 */
const selectTransactionsDomain = (state) => state.get('transactions');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Transactions
 */

const makeSelectTransactions = () => createSelector(
  selectTransactionsDomain,
  (substate) => substate.toJS()
);

export default makeSelectTransactions;
export {
  selectTransactionsDomain,
};

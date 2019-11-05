import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the transactions state domain
 */
const selectTransactionsDomain = state => state.transactions || initialState;

/**
 * Default selector used by Transactions
 */

const makeSelectTransactions = () =>
  createSelector(selectTransactionsDomain, substate => substate);

const makeSelectLoading = () =>
  createSelector(selectTransactionsDomain, substate => substate.loading);

const makeSelectUnconfirmed = () =>
  createSelector(selectTransactionsDomain, substate => substate.unconfirmed);

export {
  makeSelectTransactions,
  makeSelectLoading,
  selectTransactionsDomain,
  makeSelectUnconfirmed,
};

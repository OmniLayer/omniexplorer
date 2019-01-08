import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the transactions state domain
 */
const selectTransactionsDomain = state =>
  state.get('transactions', initialState);

/**
 * Default selector used by Transactions
 */

const makeSelectTransactions = () =>
  createSelector(selectTransactionsDomain, substate => substate.toJS());

const makeSelectLoading = () =>
  createSelector(selectTransactionsDomain, substate => substate.get('loading'));

const makeSelectUnconfirmed = () =>
  createSelector(selectTransactionsDomain, substate => substate.get('unconfirmed'));

export { makeSelectTransactions, makeSelectLoading, selectTransactionsDomain, makeSelectUnconfirmed };

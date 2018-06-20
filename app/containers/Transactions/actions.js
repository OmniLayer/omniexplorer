/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  SET_PAGE,
  SET_TRANSACTION_TYPE,
} from './constants';

/**
 * Load the transactions, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_TRANSACTIONS
 */
export function loadTransactions(addr = null) {
  return {
    type: LOAD_TRANSACTIONS,
    addr,
  };
}

/**
 * Dispatched when the transactions are loaded by the request saga
 *
 * @param  {array} Transactions The transactions data
 *
 * @return {object} An action object with a type of LOAD_TRANSACTIONS_SUCCESS passing the transactions
 */
export function transactionsLoaded(transactions, pages) {
  return {
    type: LOAD_TRANSACTIONS_SUCCESS,
    transactions,
    pages,
  };
}

/**
 * Dispatched when loading the transactions fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_TRANSACTIONS_ERROR passing the error
 */
export function transactionsLoadingError(error) {
  return {
    type: LOAD_TRANSACTIONS_ERROR,
    error,
  };
}

/**
 * Dispatched when the page change
 *
 * @param  {number} page The page number
 *
 * @return {object} An action object with the page
 */
export function setPage(page) {
  return {
    type: SET_PAGE,
    page,
  };
}

/**
 * Dispatched when the page change
 *
 * @param  {number} page The page number
 *
 * @return {object} An action object with the page
 */
export function setTransactionType(txType) {
  return {
    type: SET_TRANSACTION_TYPE,
    txType,
  };
}

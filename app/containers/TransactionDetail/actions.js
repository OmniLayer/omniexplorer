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
  LOAD_TRANSACTION,
  LOAD_TRANSACTION_SUCCESS,
} from './constants';

/**
 * Load the transaction, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_TRANSACTION
 */
export function loadTransaction(tx) {
  return {
    type: LOAD_TRANSACTION,
    tx,
  };
}

/**
 * Dispatched when the transaction are loaded by the request saga
 *
 * @param  {array} Transaction The transaction data
 *
 * @return {object} An action object with a type of LOAD_TRANSACTION_SUCCESS passing the transaction
 */
export function transactionLoaded(transaction) {
  return {
    type: LOAD_TRANSACTION_SUCCESS,
    transaction,
  };
}

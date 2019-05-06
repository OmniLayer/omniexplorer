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
  LOAD_ADDRESS,
  LOAD_ADDRESS_SUCCESS,
} from './constants';

/**
 * Load the address, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ADDRESS
 */
export function loadAddress(addr) {
  return {
    type: LOAD_ADDRESS,
    addr,
  };
}

/**
 * Dispatched when the address are loaded by the request saga
 *
 * @param  {array} Address The address data
 *
 * @return {object} An action object with a type of LOAD_ADDRESS_SUCCESS passing the address
 */
export function addressLoaded(address) {
  return {
    type: LOAD_ADDRESS_SUCCESS,
    address,
  };
}

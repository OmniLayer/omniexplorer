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
  LOAD_CROWDSALES,
  LOAD_CROWDSALES_SUCCESS,
} from './constants';

/**
 * Load the crowdsales, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_CROWDSALES
 */
export function loadCrowdsales(ecosystem) {
  return {
    type: LOAD_CROWDSALES,
    ecosystem,
  };
}

/**
 * Dispatched when the crowdsales are loaded by the request saga
 *
 * @param  {array} Crowdsales The crowdsales data
 *
 * @return {object} An action object with a type of LOAD_CROWDSALES_SUCCESS passing the crowdsales
 */
export function crowdsalesLoaded(payload) {
  return {
    type: LOAD_CROWDSALES_SUCCESS,
    payload,
  };
}

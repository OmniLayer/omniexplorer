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
  LOAD_SEARCH,
  LOAD_SEARCH_SUCCESS,
} from './constants';

/**
 * Load the search, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_SEARCH
 */
export function loadSearch(query) {
  return {
    type: LOAD_SEARCH,
    query,
  };
}

/**
 * Dispatched when the search are loaded by the request saga
 *
 * @param  {array} Search The search data
 *
 * @return {object} An action object with a type of LOAD_SEARCH_SUCCESS passing the search
 */
export function searchLoaded(payload) {
  return {
    type: LOAD_SEARCH_SUCCESS,
    payload,
  };
}

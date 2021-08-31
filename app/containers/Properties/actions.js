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
  LOAD_PROPERTIES,
  LOAD_PROPERTIES_SUCCESS,
  LOAD_PROPERTIES_ERROR,
} from './constants';

/**
 * Load the properties, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_PROPERTIES
 */
export function loadProperties(ecosystem) {
  return {
    type: LOAD_PROPERTIES,
    ecosystem,
  };
}

/**
 * Dispatched when the properties are loaded by the request saga
 *
 * @param  {array} Properties The properties data
 *
 * @return {object} An action object with a type of LOAD_PROPERTIES_SUCCESS passing the properties
 */
export function propertiesLoaded(payload) {
  return {
    type: LOAD_PROPERTIES_SUCCESS,
    payload,
  };
}

/**
 * Dispatched when the properties are loaded by the request saga
 *
 * @param  {array} Properties The properties data
 *
 * @return {object} An action object with a type of LOAD_PROPERTIES_SUCCESS passing the properties
 */
export function propertiesLoadingError(payload) {
  return {
    type: LOAD_PROPERTIES_ERROR,
    payload,
  };
}

/*
 *
 * Activations actions
 *
 */

import {
  LOAD_ACTIVATIONS,
  LOAD_ACTIVATIONS_SUCCESS,
  LOAD_ACTIVATIONS_ERROR,
} from './constants';

/**
 * Load activations, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ACTIVATIONS
 */
export function loadActivations() {
  return {
    type: LOAD_ACTIVATIONS,
  };
}


/**
 * Dispatched when the activations are loaded by the request saga
 *
 * @param  {array} Activations The activations data
 *
 * @return {object} An action object with a type of LOAD_ACTIVATIONS_SUCCESS passing the transactions
 */
export function activationsLoaded(activations) {
  return {
    type: LOAD_ACTIVATIONS_SUCCESS,
    activations,
  };
}



/**
 * Dispatched when loading the activations fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_ACTIVATIONS_ERROR passing the error
 */
export function activationsLoadingError(error) {
  return {
    type: LOAD_ACTIVATIONS_ERROR,
    error,
  };
}

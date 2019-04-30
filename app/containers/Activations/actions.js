/*
 *
 * Activations actions
 *
 */

import {
  LOAD_ACTIVATIONS,
  LOAD_ACTIVATIONS_SUCCESS,
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

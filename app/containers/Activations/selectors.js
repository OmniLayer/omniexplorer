import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Activations state domain
 */
const selectActivationsDomain = state => state.activations || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Activations
 */

const makeSelectActivations = () =>
  createSelector(
    selectActivationsDomain,
    substate => substate,
  );

export {
  selectActivationsDomain,
  makeSelectActivations,
};

import { createSelector } from 'reselect';

/**
 * Direct selector to the Activations state domain
 */
const selectActivationsDomain = (state) => state.get('activations');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Activations
 */

const makeSelectActivations = () => createSelector(
  selectActivationsDomain,
  (substate) => substate
);

export default makeSelectActivations;
export {
  selectActivationsDomain,
};

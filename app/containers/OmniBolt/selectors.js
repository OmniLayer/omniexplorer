import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the omniBolt state domain
 */

const selectOmniBoltDomain = state => state.omniBolt || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OmniBolt
 */

const makeSelectOmniBolt = () =>
  createSelector(
    selectOmniBoltDomain,
    substate => substate,
  );

export default makeSelectOmniBolt;
export { selectOmniBoltDomain };

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the omniBolt state domain
 */

const selectOmniBoltUsersDomain = state => state.omniBoltUsers || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OmniBolt
 */

const makeSelectOmniBoltUsers = () =>
  createSelector(
    selectOmniBoltDomain,
    substate => substate,
  );

export default makeSelectOmniBoltUsers;
export { selectOmniBoltUsersDomain };

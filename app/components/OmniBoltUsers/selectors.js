import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the OmniBOLT state domain
 */

const selectOmniBOLTUsersDomain = state => state.OmniBOLTUsers || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OmniBOLT
 */

const makeSelectOmniBOLTUsers = () =>
  createSelector(
    selectOmniBOLTUsersDomain,
    substate => substate,
  );

export default makeSelectOmniBOLTUsers;
export { selectOmniBOLTUsersDomain };

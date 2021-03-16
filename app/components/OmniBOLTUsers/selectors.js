import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the OmniBOLT state domain
 */

const selectOmniBOLTUsersDomain = state => state.omniboltusers || initialState;

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

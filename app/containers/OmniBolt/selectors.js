import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the OmniBOLT state domain
 */

const selectOmniBOLTDomain = state => state.OmniBOLT || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OmniBOLT
 */

const makeSelectOmniBOLT = () =>
  createSelector(
    selectOmniBOLTDomain,
    substate => substate,
  );

export default makeSelectOmniBOLT;
export { selectOmniBOLTDomain };

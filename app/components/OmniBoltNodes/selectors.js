import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the OmniBOLT state domain
 */

const selectOmniBOLTNodesDomain = state => state.OmniBOLTNodes || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OmniBOLT
 */

const makeSelectOmniBOLTNodes = () =>
  createSelector(
    selectOmniBOLTNodesDomain,
    substate => substate,
  );

export default makeSelectOmniBOLTNodes;
export { selectOmniBOLTNodesDomain };

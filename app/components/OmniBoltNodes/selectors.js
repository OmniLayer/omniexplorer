import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the omniBolt state domain
 */

const selectOmniBoltNodesDomain = state => state.omniBoltNodes || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OmniBolt
 */

const makeSelectOmniBoltNodes = () =>
  createSelector(
    selectOmniBoltNodesDomain,
    substate => substate,
  );

export default makeSelectOmniBoltNodes;
export { selectOmniBoltNodesDomain };

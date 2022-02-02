import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the properties state domain
 */
const selectPropertiesDomain = state => state.properties || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Properties
 */

const makeSelectProperties = () =>
  createSelector(
    selectPropertiesDomain,
    substate => substate,
  );

export default makeSelectProperties;
export { selectPropertiesDomain };

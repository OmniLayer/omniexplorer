import { createSelector } from 'reselect';

/**
 * Direct selector to the search state domain
 */
const selectSearchDomain = state => state.get('search');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Search
 */

const makeSelectSearch = () =>
  createSelector(selectSearchDomain, substate => substate.toJS());

export default makeSelectSearch;
export { selectSearchDomain };

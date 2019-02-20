import { createSelector } from 'reselect';

/**
 * Direct selector to the blockDetail state domain
 */
const selectBlockDetailDomain = state => state.get('blockDetail');

/**
 * Other specific selectors
 */

/**
 * Default selector used by BlockDetail
 */

const makeSelectBlockDetail = () =>
  createSelector(selectBlockDetailDomain, substate => substate.toJS());

export default makeSelectBlockDetail;
export { selectBlockDetailDomain };

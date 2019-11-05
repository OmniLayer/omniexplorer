import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blockDetail state domain
 */
const selectBlockDetailDomain = state => state.blockDetail || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BlockDetail
 */

const makeSelectBlockDetail = () =>
  createSelector(selectBlockDetailDomain, substate => substate);

export default makeSelectBlockDetail;
export { selectBlockDetailDomain };

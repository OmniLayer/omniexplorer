import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the crowdsaleDetail state domain
 */
const selectCrowdsaleDetailDomain = state => state.crowdsaleDetail || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CrowdsaleDetail
 */

const makeSelectCrowdsaleDetail = () =>
  createSelector(selectCrowdsaleDetailDomain, substate => substate);

export default makeSelectCrowdsaleDetail;
export { selectCrowdsaleDetailDomain };

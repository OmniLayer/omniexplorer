import { createSelector } from 'reselect';

/**
 * Direct selector to the crowdsaleDetail state domain
 */
const selectCrowdsaleDetailDomain = state => state.get('crowdsaleDetail');

/**
 * Other specific selectors
 */

/**
 * Default selector used by CrowdsaleDetail
 */

const makeSelectCrowdsaleDetail = () =>
  createSelector(selectCrowdsaleDetailDomain, substate => substate.toJS());

export default makeSelectCrowdsaleDetail;
export { selectCrowdsaleDetailDomain };

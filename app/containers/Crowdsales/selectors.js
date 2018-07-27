import { createSelector } from 'reselect';

/**
 * Direct selector to the crowdsales state domain
 */
const selectCrowdsalesDomain = state => state.get('crowdsales');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Crowdsales
 */

const makeSelectCrowdsales = () =>
  createSelector(selectCrowdsalesDomain, substate => substate.toJS());

export default makeSelectCrowdsales;
export { selectCrowdsalesDomain };

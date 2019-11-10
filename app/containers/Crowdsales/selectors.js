import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the crowdsales state domain
 */
const selectCrowdsalesDomain = state => state.crowdsales || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Crowdsales
 */

const makeSelectCrowdsales = () =>
  createSelector(selectCrowdsalesDomain, substate => substate);

export default makeSelectCrowdsales;
export { selectCrowdsalesDomain };

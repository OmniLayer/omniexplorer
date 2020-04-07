import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the exchange state domain
 */

const selectExchangeDomain = state => state.exchange || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Exchange
 */

const makeSelectExchange = () =>
  createSelector(
    selectExchangeDomain,
    substate => substate,
  );

export default makeSelectExchange;
export { selectExchangeDomain };

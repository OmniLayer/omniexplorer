import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blockDetail state domain
 */
const selectTokenDomain = state => state.token || initialState;

/**
 * Other specific selectors
 */
export const getProperties = state => state.token;
export const getTokens = state => state.token.tokens;

/**
 * Default selector used by BlockDetail
 */

const makeSelectProperties = () =>
  createSelector(selectTokenDomain, substate => substate.tokens);

const makeSelectProperty = id => {
  return createSelector(
    [selectTokenDomain],
    (substate, id) => {
      return substate.tokens[id];
      }
  );
};

const makeSelectLoading = () =>
  createSelector(selectTokenDomain, substate => substate.isFetching);

const makeSelectLastFetched = () =>
  createSelector(selectTokenDomain, substate => substate.lastFetched);

const makeSelectHasProperty = id =>
  createSelector(
    selectTokenDomain,
    substate => !!substate.tokens[id],
  );

export {
  selectTokenDomain,
  makeSelectProperties,
  makeSelectProperty,
  makeSelectLoading,
  makeSelectHasProperty,
  makeSelectLastFetched,
};

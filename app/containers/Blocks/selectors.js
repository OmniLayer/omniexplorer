import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blocks state domain
 */
const selectBlocksDomain = state => state.get('blocks', initialState);

/**
 * Default selector used by Blocks
 */

const makeSelectBlocks = () =>
  createSelector(selectBlocksDomain, substate => substate.toJS());

const makeSelectLoading = () =>
  createSelector(selectBlocksDomain, substate => substate.get('loading'));

export { makeSelectBlocks, makeSelectLoading, selectBlocksDomain };

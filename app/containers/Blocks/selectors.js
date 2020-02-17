import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blocks state domain
 */
const selectBlocksDomain = state => state.blocks || initialState;

/**
 * Default selector used by Blocks
 */

const makeSelectBlocks = () =>
  createSelector(
    selectBlocksDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectBlocksDomain,
    substate => substate.loading,
  );

const makeSelectPreviousBlock = () =>
  createSelector(
    selectBlocksDomain,
    substate => substate.previousBlock,
  );

const makeSelectLatestBlock = () =>
  createSelector(
    selectBlocksDomain,
    substate => substate.latest,
  );

export {
  makeSelectBlocks,
  makeSelectLoading,
  selectBlocksDomain,
  makeSelectPreviousBlock,
  makeSelectLatestBlock,
};

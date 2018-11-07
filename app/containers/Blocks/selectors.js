import { createSelector } from 'reselect';

/**
 * Direct selector to the blocks state domain
 */
const selectBlocksDomain = (state) => state.get('blocks');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Blocks
 */

const makeSelectBlocks = () => createSelector(
  selectBlocksDomain,
  (substate) => substate.toJS()
);

export default makeSelectBlocks;
export {
  selectBlocksDomain,
};

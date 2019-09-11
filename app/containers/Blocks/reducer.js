/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import orderBy from 'lodash/orderBy';

import {
  LOAD_BLOCKS,
  LOAD_BLOCKS_SUCCESS,
  DISABLE_BLOCKS_LOADING,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: true,
  appendBlocks: false,
  blocks: [],
  pageCount: 0,
  previousBlock: '',
  latest: -1,
  txType: null,
};

function blocksReducer(state = initialState, action) {
  switch (action.type) {
    case DISABLE_BLOCKS_LOADING:
      return state.set('loading', false);
    case LOAD_BLOCKS:
      return state.set('loading', true);
    case LOAD_BLOCKS_SUCCESS: {
      const hasBlocks = state.get('blocks').length > 0;
      const blockValues = action.blocks.blocks;
      const blocks = (hasBlocks && state.get('appendBlocks')
        ? state.get('blocks')
        : []
      ).concat(blockValues);
      return state
        .set('latest', action.blocks.latest)
        .set('blocks', orderBy(blocks, 'block', 'desc'))
        .set('loading', false)
        .set('previousBlock', blocks.length ? blockValues[0].block - 1 : null);
    }
    default:
      return state;
  }
}

export default blocksReducer;

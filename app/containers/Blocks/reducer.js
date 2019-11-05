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

import produce from 'immer';
import {
  DISABLE_BLOCKS_LOADING,
  LOAD_BLOCKS,
  LOAD_BLOCKS_SUCCESS,
} from './constants';

export const initialState = {
  loading: true,
  appendBlocks: false,
  blocks: [],
  pageCount: 0,
  previousBlock: '',
  latest: -1,
  txType: null,
};

/* eslint-disable default-case, no-param-reassign */
const blocksReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DISABLE_BLOCKS_LOADING:
        draft.loading = false;
        break;
      case LOAD_BLOCKS:
        draft.loading = true;
        break;
      case LOAD_BLOCKS_SUCCESS: {
        const hasBlocks = state.blocks.length > 0;
        const blockValues = action.blocks.blocks;
        const blocks = (hasBlocks && state.appendBlocks
          ? state.blocks
          : []
        ).concat(blockValues);
        draft.latest = action.blocks.latest;
        draft.blocks = orderBy(blocks, 'block', 'desc');
        draft.loading = false;
        draft.previousBlock = blocks.length ? blockValues[0].block - 1 : null;
        break;
      }
    }
  });

export default blocksReducer;

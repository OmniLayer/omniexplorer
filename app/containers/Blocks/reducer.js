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

import { fromJS } from 'immutable';
import values from 'lodash/values';
import orderBy from 'lodash/orderBy';

import {
  LOAD_BLOCKS,
  LOAD_BLOCKS_ERROR,
  LOAD_BLOCKS_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  appendBlocks: false,
  error: false,
  blocks: [],
  pageCount: 0,
  previousBlock: '',
  txType: null,
});

function blocksReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BLOCKS:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_BLOCKS_SUCCESS:
      const hasBlocks = state.get('blocks').length > 0;
      const blockValues = values(action.blocks);
      const blocks = (hasBlocks && state.get('appendBlocks') ? state.get('blocks') : []).concat(blockValues);
      return state
        .set('blocks', orderBy(blocks, 'timestamp', 'desc'))
        .set('loading', false)
        .set('error', false)
        .set('previousBlock', blockValues[0].block - 1);
    case LOAD_BLOCKS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default blocksReducer;

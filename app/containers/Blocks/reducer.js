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
  LOAD_BLOCKS_SUCCESS,
  LOAD_BLOCKS,
  LOAD_BLOCKS_ERROR,
  SET_BLOCK_PAGE,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
  blocks: [],
  pageCount: 0,
  currentPage: 0,
  txType: null,
});

function blocksReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BLOCKS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('blocks', [])
    case LOAD_BLOCKS_SUCCESS:
      return state
        .set('blocks', orderBy(values(action.blocks), 'timestamp', 'desc'))
        .set('loading', false)
        .set('error', false);
    case LOAD_BLOCKS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case SET_BLOCK_PAGE:
      return state.set('currentBlock', action.currentBlock);
    default:
      return state;
  }
}

export default blocksReducer;

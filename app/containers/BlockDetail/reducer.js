/*
 *
 * BlockDetail reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LOAD_BLOCK,
  LOAD_BLOCK_SUCCESS,
  LOAD_BLOCK_ERROR,
} from './constants';

const initialBlock = {
  transactions: [],
};

const initialState = fromJS({
  loading: true,
  error: false,
  block: initialBlock,
});

function blockDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BLOCK:
      return state
        .set('loading', true)
        .set('error', false)
        .set('block', initialBlock);
    case LOAD_BLOCK_SUCCESS:
      return state
        .set('block', action.block)
        .set('error', false)
        .set('loading', false);
    case LOAD_BLOCK_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default blockDetailReducer;

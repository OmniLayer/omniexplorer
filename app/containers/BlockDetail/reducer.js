/*
 *
 * BlockDetail reducer
 *
 */

import { fromJS } from 'immutable';

import { LOAD_BLOCK, LOAD_BLOCK_SUCCESS } from './constants';

const initialBlock = {
  transactions: [],
};

export const initialState = fromJS({
  loading: true,
  block: initialBlock,
});

function blockDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BLOCK:
      return state
        .set('loading', true)
        .set('block', initialBlock);
    case LOAD_BLOCK_SUCCESS:
      return state
        .set('block', action.block)
        .set('loading', false);
    default:
      return state;
  }
}

export default blockDetailReducer;

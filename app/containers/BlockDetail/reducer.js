/*
 *
 * BlockDetail reducer
 *
 */
import produce from 'immer';
import { LOAD_BLOCK, LOAD_BLOCK_SUCCESS } from './constants';

const initialBlock = {
  transactions: [],
};

export const initialState = {
  loading: true,
  block: initialBlock,
};

/* eslint-disable default-case, no-param-reassign */
const blockDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_BLOCK:
        draft.loading = true;
        draft.block = initialBlock;
        break;
      case LOAD_BLOCK_SUCCESS:
        draft.block = action.block;
        draft.loading = false;
        break;
    }
  });

export default blockDetailReducer;

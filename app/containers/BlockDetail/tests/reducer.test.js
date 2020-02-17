import blockDetailReducer from '../reducer';

const initialBlock = {
  transactions: [],
};

import produce from 'immer';

export const initialState = {
  loading: true,
  block: initialBlock,
};

describe('blockDetailReducer', () => {
  it('returns the initial state', () => {
    expect(blockDetailReducer(undefined, {})).toEqual(initialState);
  });
});

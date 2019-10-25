import searchReducer from '../reducer';

import produce from 'immer';

export const initialState = {
  loading: true,
  query: '',
  address: {
    balance: [],
  },
  asset: [],
  tx: {},
};

describe('searchReducer', () => {
  it('returns the initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(initialState);
  });
});

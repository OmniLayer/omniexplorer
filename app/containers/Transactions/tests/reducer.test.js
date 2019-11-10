import transactionsReducer from '../reducer';

import produce from 'immer';

export const initialState = {
  loading: false,
  transactions: [],
  pageCount: 0,
  currentPage: 1,
  txType: null,
  unconfirmed: false,
};

describe('transactionsReducer', () => {
  it('returns the initial state', () => {
    expect(transactionsReducer(undefined, {})).toEqual(initialState);
  });
});

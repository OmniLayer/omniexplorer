import { fromJS } from 'immutable';
import transactionsReducer from '../reducer';

describe('transactionsReducer', () => {
  it('returns the initial state', () => {
    const state = {
      loading: false,
      error: false,
      transactions: [],
      pageCount: 0,
      currentPage: 0,
      txType: null,
    };
    expect(transactionsReducer(undefined, {})).toEqual(fromJS(state));
  });
});

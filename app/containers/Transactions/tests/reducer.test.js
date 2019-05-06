import { fromJS } from 'immutable';
import transactionsReducer from '../reducer';

export const initialState = fromJS({
  loading: false,
  transactions: [],
  pageCount: 0,
  currentPage: 1,
  txType: null,
  unconfirmed: false,
});

describe('transactionsReducer', () => {
  it('returns the initial state', () => {
    expect(transactionsReducer(undefined, {})).toEqual(fromJS(initialState));
  });
});

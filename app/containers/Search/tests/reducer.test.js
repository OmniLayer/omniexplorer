import { fromJS } from 'immutable';
import searchReducer from '../reducer';

const initialState = fromJS({
  loading: true,
  error: false,
  query: '',
  address: {
    balance: [],
  },
  asset: [],
  tx: {},
});

describe('searchReducer', () => {
  it('returns the initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(initialState);
  });
});

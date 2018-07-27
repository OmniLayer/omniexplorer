import { fromJS } from 'immutable';
import transactionDetailReducer from '../reducer';
const initialState = fromJS({
  transaction: {
    notFound: false,
  },
  loading: true,
});

describe('transactionDetailReducer', () => {
  it('returns the initial state', () => {
    expect(transactionDetailReducer(undefined, {})).toEqual(initialState);
  });
});

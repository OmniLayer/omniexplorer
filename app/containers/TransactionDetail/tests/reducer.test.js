import transactionDetailReducer from '../reducer';
import produce from 'immer';

export const initialState = {
  transaction: {
    notFound: false,
  },
  loading: true,
};

describe('transactionDetailReducer', () => {
  it('returns the initial state', () => {
    expect(transactionDetailReducer(undefined, {})).toEqual(initialState);
  });
});


import { fromJS } from 'immutable';
import transactionDetailReducer from '../reducer';

describe('transactionDetailReducer', () => {
  it('returns the initial state', () => {
    expect(transactionDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});

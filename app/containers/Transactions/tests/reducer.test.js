
import { fromJS } from 'immutable';
import transactionsReducer from '../reducer';

describe('transactionsReducer', () => {
  it('returns the initial state', () => {
    expect(transactionsReducer(undefined, {})).toEqual(fromJS({}));
  });
});

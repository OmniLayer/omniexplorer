
import { fromJS } from 'immutable';
import blocksReducer from '../reducer';

describe('blocksReducer', () => {
  it('returns the initial state', () => {
    expect(blocksReducer(undefined, {})).toEqual(fromJS({}));
  });
});

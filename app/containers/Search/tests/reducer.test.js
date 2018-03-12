
import { fromJS } from 'immutable';
import searchReducer from '../reducer';

describe('searchReducer', () => {
  it('returns the initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(fromJS({}));
  });
});

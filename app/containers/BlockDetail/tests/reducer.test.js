import { fromJS } from 'immutable';
import blockDetailReducer from '../reducer';

describe('blockDetailReducer', () => {
  it('returns the initial state', () => {
    expect(blockDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});

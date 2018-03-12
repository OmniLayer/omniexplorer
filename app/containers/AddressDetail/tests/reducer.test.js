
import { fromJS } from 'immutable';
import addressDetailReducer from '../reducer';

describe('addressDetailReducer', () => {
  it('returns the initial state', () => {
    expect(addressDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});


import { fromJS } from 'immutable';
import crowdsalesReducer from '../reducer';

describe('crowdsalesReducer', () => {
  it('returns the initial state', () => {
    expect(crowdsalesReducer(undefined, {})).toEqual(fromJS({}));
  });
});

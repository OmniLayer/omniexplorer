
import { fromJS } from 'immutable';
import crowdsaleDetailReducer from '../reducer';

describe('crowdsaleDetailReducer', () => {
  it('returns the initial state', () => {
    expect(crowdsaleDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});

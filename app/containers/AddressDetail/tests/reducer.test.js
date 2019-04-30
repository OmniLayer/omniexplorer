import { fromJS } from 'immutable';
import addressDetailReducer from '../reducer';

describe('addressDetailReducer', () => {
  it('returns the initial state', () => {
    const state = {
      loading: false,
      address: { balance: [] },
    };
    expect(addressDetailReducer(undefined, {})).toEqual(fromJS(state));
  });
});

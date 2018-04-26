
import { fromJS } from 'immutable';
import crowdsalesReducer from '../reducer';
import { LOAD_CROWDSALES_ECOSYSTEM_PROD } from '../constants';

describe('crowdsalesReducer', () => {
  it('returns the initial state', () => {
    const state = {
      loading: true,
      error: false,
      status: '',
      crowdsales: [],
      ecosystem: LOAD_CROWDSALES_ECOSYSTEM_PROD,
    };
    expect(crowdsalesReducer(undefined, {})).toEqual(fromJS(state));
  });
});

import { fromJS } from 'immutable';
import { ECOSYSTEM_PROD } from 'containers/App/constants';
import crowdsalesReducer from '../reducer';

describe('crowdsalesReducer', () => {
  it('returns the initial state', () => {
    const state = {
      loading: true,
      error: false,
      status: '',
      crowdsales: [],
      ecosystem: ECOSYSTEM_PROD,
    };
    expect(crowdsalesReducer(undefined, {})).toEqual(fromJS(state));
  });
});

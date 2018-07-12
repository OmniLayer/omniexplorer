
import { fromJS } from 'immutable';
import crowdsalesReducer from '../reducer';
import { ECOSYSTEM_PROD, ECOSYSTEM_TEST } from 'containers/App/constants';

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

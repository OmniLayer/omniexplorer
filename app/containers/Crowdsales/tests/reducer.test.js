import { ECOSYSTEM_PROD } from 'containers/App/constants';
import crowdsalesReducer from '../reducer';

describe('crowdsalesReducer', () => {
  it('returns the initial state', () => {
    const state = {
      loading: true,
      status: '',
      crowdsales: [],
      ecosystem: ECOSYSTEM_PROD,
    };
    expect(crowdsalesReducer(undefined, {})).toEqual(state);
  });
});

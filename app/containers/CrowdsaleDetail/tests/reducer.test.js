import crowdsaleDetailReducer from '../reducer';

describe('crowdsaleDetailReducer', () => {
  it('returns the initial state', () => {
    const state = {
      loading: false,
      transactions: [],
      pageCount: 0,
      currentPage: 1,
      total: 0,
    };
    expect(crowdsaleDetailReducer(undefined, {})).toEqual(state);
  });
});

import blockDetailReducer from '../reducer';

const initialBlock = {
  transactions: [],
};

export const initialState = {
  loading: true,
  block: initialBlock,
};

describe('blockDetailReducer', () => {
  it('returns the initial state', () => {
    expect(blockDetailReducer(undefined, {})).toEqual(initialState);
  });
});

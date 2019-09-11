import blocksReducer from '../reducer';

export const initialState = {
  loading: true,
  appendBlocks: false,
  blocks: [],
  pageCount: 0,
  previousBlock: '',
  latest: -1,
  txType: null,
};

describe('blocksReducer', () => {
  it('returns the initial state', () => {
    expect(blocksReducer(undefined, {})).toEqual(initialState);
  });
});

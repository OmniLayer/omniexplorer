// import { selectBlocksDomain } from '../selectors';
// import { selectBlockDetailDomain } from '../selectors';
import { initialState } from '../reducer';
import makeSelectBlockDetail, { selectBlockDetailDomain } from '../selectors';

describe('selectCrowdsaleDetailDomain', () => {
  it('should select the crodwsaleDetail state', () => {
    const blocksDetailState = { loading: true, block: { transactions: [] } };
    const mockedState = { blockDetail: initialState };
    expect(selectBlockDetailDomain(mockedState)).toEqual(blocksDetailState);
  });
});

describe('makeSelectCrowdsaleDetail', () => {
  const blocksSelector = makeSelectBlockDetail();
  it('should select the loading', () => {
    const blocksState = { loading: true };
    const mockedState = {
      blockDetail: blocksState,
    };
    expect(blocksSelector(mockedState)).toEqual(blocksState);
  });
});

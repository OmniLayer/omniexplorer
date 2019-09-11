// import { fromJS } from 'immutable';
// import { selectBlocksDomain } from '../selectors';
import { initialState } from '../reducer';
import { makeSelectBlocks, selectBlocksDomain } from '../selectors';

describe('selectCrowdsaleDetailDomain', () => {
  it('should select the crodwsaleDetail state', () => {
    const blocksDetailState = initialState;
    const mockedState = { blocks: blocksDetailState };
    expect(selectBlocksDomain(mockedState)).toEqual(blocksDetailState);
  });
});

describe('makeSelectCrowdsaleDetail', () => {
  const blocksSelector = makeSelectBlocks();
  it('should select the loading', () => {
    const blocksState = { loading: true };
    const mockedState = {
      blocks: blocksState,
    };
    expect(blocksSelector(mockedState)).toEqual(blocksState);
  });
});

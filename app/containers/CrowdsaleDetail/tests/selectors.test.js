import makeSelectCrowdsaleDetail, {
  selectCrowdsaleDetailDomain,
} from '../selectors';

describe('selectCrowdsaleDetailDomain', () => {
  it('should select the crodwsaleDetail state', () => {
    const crodwsaleDetailState = {
      transactions: [],
    };
    const mockedState = {
      crowdsaleDetail: crodwsaleDetailState,
    };
    expect(selectCrowdsaleDetailDomain(mockedState)).toEqual(
      crodwsaleDetailState,
    );
  });
});

describe('makeSelectCrowdsaleDetail', () => {
  const crodwsaleDetailSelector = makeSelectCrowdsaleDetail();
  it('should select the loading', () => {
    const crowdsaleDetailState = { loading: true };
    const mockedState = {
      crowdsaleDetail: crowdsaleDetailState,
    };
    expect(crodwsaleDetailSelector(mockedState)).toEqual(crowdsaleDetailState);
  });
});

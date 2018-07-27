import { fromJS } from 'immutable';

import makeSelectCrowdsaleDetail, {
  selectCrowdsaleDetailDomain,
} from '../selectors';

describe('selectCrowdsaleDetailDomain', () => {
  it('should select the crodwsaleDetail state', () => {
    const crodwsaleDetailState = fromJS({
      transactions: [],
    });
    const mockedState = fromJS({
      crowdsaleDetail: crodwsaleDetailState,
    });
    expect(selectCrowdsaleDetailDomain(mockedState)).toEqual(
      crodwsaleDetailState,
    );
  });
});

describe('makeSelectCrowdsaleDetail', () => {
  const crodwsaleDetailSelector = makeSelectCrowdsaleDetail();
  it('should select the loading', () => {
    const crowdsaleDetailState = { loading: true };
    const mockedState = fromJS({
      crowdsaleDetail: crowdsaleDetailState,
    });
    expect(crodwsaleDetailSelector(mockedState)).toEqual(crowdsaleDetailState);
  });
});

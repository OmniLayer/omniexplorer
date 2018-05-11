import { fromJS } from 'immutable';
import { selectCrowdsalesDomain } from '../selectors';

describe('selectAddressDetailDomain', () => {
  const crowdsaleState = fromJS({
    foo: 'bar',
  });
  const mockedState = fromJS({
    crowdsales: crowdsaleState,
  });

  it('Expect to have unit tests specified', () => {
    expect(selectCrowdsalesDomain(mockedState)).toEqual(crowdsaleState);
  });
});

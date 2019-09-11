import { selectCrowdsalesDomain } from '../selectors';

describe('selectAddressDetailDomain', () => {
  const crowdsaleState = {
    foo: 'bar',
  };
  const mockedState = {
    crowdsales: crowdsaleState,
  };

  it('Expect to have unit tests specified', () => {
    expect(selectCrowdsalesDomain(mockedState)).toEqual(crowdsaleState);
  });
});

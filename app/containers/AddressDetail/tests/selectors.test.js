import { selectAddressDetailDomain } from '../selectors';

describe('selectAddressDetailDomain', () => {
  it('Expect to have unit tests specified', () => {
    const addressState = {
      foo: 'bar',
    };
    const mockedState = {
      addressDetail: addressState,
    };
    expect(selectAddressDetailDomain(mockedState)).toEqual(addressState);
  });
});

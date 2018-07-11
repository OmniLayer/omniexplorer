import { fromJS } from 'immutable';
import makeSelectAddressDetail, { selectAddressDetailDomain } from '../selectors';

describe('selectAddressDetailDomain', () => {
  it('Expect to have unit tests specified', () => {
    const addressState = fromJS({
      foo: 'bar',
    });
    const mockedState = fromJS({
      addressDetail: addressState,
    });
    expect(selectAddressDetailDomain(mockedState)).toEqual(addressState);
  });
});

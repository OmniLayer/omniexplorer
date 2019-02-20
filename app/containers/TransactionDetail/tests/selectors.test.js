import { fromJS } from 'immutable';
import { selectTransactionDetailDomain } from '../selectors';

describe('selectTransactionDetailDomain', () => {
  it('Expect to have unit tests specified', () => {
    const transactionDetail = fromJS({
      foo: 'bar',
    });
    const mockedState = fromJS({ transactionDetail });
    expect(selectTransactionDetailDomain(mockedState)).toEqual(
      transactionDetail,
    );
  });
});

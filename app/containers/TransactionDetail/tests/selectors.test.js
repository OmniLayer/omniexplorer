import { selectTransactionDetailDomain } from '../selectors';

describe('selectTransactionDetailDomain', () => {
  it('Expect to have unit tests specified', () => {
    const transactionDetail = {
      foo: 'bar',
    };
    const mockedState = { transactionDetail };
    expect(selectTransactionDetailDomain(mockedState)).toEqual(
      transactionDetail,
    );
  });
});

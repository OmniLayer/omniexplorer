import { fromJS } from 'immutable';
import { selectTransactionsDomain } from '../selectors';

describe('selectTransactionsDomain', () => {
  it('Expect to have unit tests specified', () => {
    const transactions = fromJS({
      foo: 'bar',
    });
    const mockedState = fromJS({ transactions });
    expect(selectTransactionsDomain(mockedState)).toEqual(transactions);
  });
});

import { fromJS } from 'immutable';

import {
  makeSelectTransactions,
  makeSelectLoading,
  selectTransactionsDomain,
} from '../selectors';

describe('selectTransactionsDomain', () => {
  it('should select the transactions state', () => {
    const txState = fromJS({
      transactions: [],
    });
    const mockedState = fromJS({
      transactions: txState,
    });
    expect(selectTransactionsDomain(mockedState)).toEqual(txState);
  });
});

describe('makeSelectLoading', () => {
  const usernameSelector = makeSelectLoading();
  it('should select the loading', () => {
    const loading = true;
    const mockedState = fromJS({
      transactions: {
        loading,
      },
    });
    expect(usernameSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectTransactions', () => {
  const transactionsSelectors = makeSelectTransactions();
  it('should select the transaction', () => {
    const transactions = [];
    const mockedState = fromJS({
      transactions,
    });
    expect(transactionsSelectors(mockedState)).toEqual(transactions);
  });
});

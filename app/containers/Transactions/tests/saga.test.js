/**
 * Tests for Transactions sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { LOAD_TRANSACTIONS } from '../constants';
import { transactionsLoaded, transactionsLoadingError } from '../actions';

import root, { getTransactions } from '../saga';

const txid = 'dbf8b73aa9149ae3e8a96e85c64c48d8061d65c026b16c899e77bb6a607bd45x';

/* eslint-disable redux-saga/yield-effects */
describe('getTransaction Saga', () => {
  let getTransactionGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getTransactionGenerator = getTransactions();

    const selectDescriptor = getTransactionGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getTransactionGenerator.next(txid).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the transactionsLoaded action if it requests the data successfully', () => {
    const response = {
      pages: 143938,
      transactions: [
        {
          amount: '65067.68000000',
          blocktime: 1522349840,
          confirmations: 0,
          divisible: true,
          fee: '0.00001283',
          ismine: false,
          propertyid: 31,
          propertyname: 'TetherUS',
          referenceaddress: '1DkvAif2AKfRrd5GZya5U1QdDAG8hCoucx',
          sendingaddress: '17ScKNXo4cL8DyfWfcCWu1uJySQuJm7iKx',
          txid: 'dbf8b73aa9149ae3e8a96e85c64c48d8061d65c026b16c899e77bb6a607bd45x',
          type: 'Simple Send',
          type_int: 0,
          version: 0,
        }],
    };

    const putDescriptor = getTransactionGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(transactionsLoaded(response, txid)));
  });

  it('should call the transactionsLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getTransactionGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(transactionsLoadingError(response)));
  });
});

describe('githubDataSaga Saga', () => {
  const rootSaga = root();

  it('should start task to watch for LOAD_TRANSACTIONS action', () => {
    const takeLatestDescriptor = rootSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_TRANSACTIONS, getTransactions));
  });
});

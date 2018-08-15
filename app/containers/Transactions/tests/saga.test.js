/**
 * Tests for Transactions sagas
 */

import { all, put, takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import request from 'utils/request';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_TRANSACTIONS, SET_TRANSACTION_TYPE } from '../constants';
import { transactionsLoadingError, transactionsLoaded } from '../actions';
import { initialState } from '../reducer';
import root, { getTransactions } from '../saga';

const txid = 'dbf8b73aa9149ae3e8a96e85c64c48d8061d65c026b16c899e77bb6a607bd45x';

/* eslint-disable redux-saga/yield-effects */
describe('getTransaction Saga', () => {
  let getTransactionGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getTransactionGenerator = getTransactions({});

    const selectDescriptor = getTransactionGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getTransactionGenerator.next(initialState).value;
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
          txid,
          type: 'Simple Send',
          type_int: 0,
          version: 0,
        },
      ],
    };

    const saga = testSaga(getTransactions, { tx: txid });
    const url = `${API_URL_BASE}/transaction/general/0`;
    const getTransactionsOptions = {
      type: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    saga
      .next()
      .next({ currentPage: 0 })
      .call(request, url, getTransactionsOptions)
      .next(response)
      .put(transactionsLoaded(response.transactions, response.pages));
  });

  it('should call the transactionsLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getTransactionGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(transactionsLoadingError(response)));
  });
});

describe('Root Saga', () => {
  it('should start task to watch for LOAD_TRANSACTIONS action', () => {
    // arrange
    const rootSaga = root();
    const expectedYield = all([
      takeLatest(LOAD_TRANSACTIONS, getTransactions),
      takeLatest(SET_TRANSACTION_TYPE, getTransactions),
    ]);

    // act
    const actualYield = rootSaga.next().value;

    // assert
    expect(actualYield).toEqual(expectedYield);
  });
});

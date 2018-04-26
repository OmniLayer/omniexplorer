/**
 * Tests for TransactionDetail sagas
 */

import { all, put, takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import request from 'utils/request';
import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_TRANSACTION, LOAD_TRANSACTION_SUCCESS } from '../constants';
import { transactionLoadingError } from '../actions';

import root, { getTransaction } from '../saga';

const txid = 'dbf8b73aa9149ae3e8a96e85c64c48d8061d65c026b16c899e77bb6a607bd45x';

/* eslint-disable redux-saga/yield-effects */
describe('getTransaction Saga', () => {
  let getTransactionGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getTransactionGenerator = getTransaction();

    const selectDescriptor = getTransactionGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getTransactionGenerator.next(txid).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the transactionLoaded action if it requests the data successfully', () => {
    const response = {
      amount: '400',
      blocktime: 1522349719,
      confirmations: 0,
      divisible: false,
      fee: '0.00002614',
      ismine: false,
      propertyid: 56,
      propertyname: 'SafeExchangeCoin',
      referenceaddress: '17gNRMAqjtiStNReEnaHZmHN2KhJnme1cZ',
      sendingaddress: '1DUb2YYbQA1jjaNYzVXLZ7ZioEhLXtbUru',
      txid: 'dbf8b73aa9149ae3e8a96e85c64c48d8061d65c026b16c899e77bb6a607bd45x',
      type: 'Simple Send',
      type_int: 0,
      version: 0,
    };

    const saga = testSaga(getTransaction, { tx: txid });
    const url = `${API_URL_BASE}/transaction/tx/${txid}`;

    saga
      .next()
      .call(request, url)
      .next(response)
      .put({
        type: LOAD_TRANSACTION_SUCCESS,
        transaction: response,
      });
  });

  it('should call the transactionLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getTransactionGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(transactionLoadingError(response)));
  });
});

describe('Root Saga', () => {
  it('should start task to watch for LOAD_TRANSACTION action', () => {
    // arrange
    const rootSaga = root();
    const expectedYield = all([takeLatest(LOAD_TRANSACTION, getTransaction)]);

    // act
    const actualYield = rootSaga.next().value;

    // assert
    expect(actualYield).toEqual(expectedYield);
  });
});

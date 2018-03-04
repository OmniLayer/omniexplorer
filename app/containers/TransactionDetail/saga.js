import { call, put, takeLatest, all } from 'redux-saga/effects';
import { LOAD_TRANSACTION } from 'containers/TransactionDetail/constants';
import { transactionLoaded, transactionLoadingError } from 'containers/TransactionDetail/actions';

import request from 'utils/request';

function* getTransaction(action = {}) {
  const txid = action.tx;
  const requestURL = `/api/v1/transaction/tx/${txid}`;

  try {
    const tx = yield call(request, requestURL);
    yield put(transactionLoaded(tx));
  } catch (err) {
    yield put(transactionLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    takeLatest(LOAD_TRANSACTION, getTransaction),
  ]);
}

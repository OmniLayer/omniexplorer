import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import { LOAD_TRANSACTION } from 'containers/TransactionDetail/constants';
import { API_URL_BASE } from 'containers/App/constants';
import { transactionLoaded } from 'containers/TransactionDetail/actions';

import request from 'utils/request';

export function* getTransaction(action = {}) {
  const txid = action.tx;
  const requestURL = `${API_URL_BASE}/transaction/tx/${txid}`;

  const tx = yield call(request, requestURL);
  yield put(transactionLoaded(tx));
}

/**
 * Root saga manages watcher lifecycle
 */
/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  while (true) {
    const payload = yield take(LOAD_TRANSACTION);
    yield call(getTransaction, payload);
  }
}

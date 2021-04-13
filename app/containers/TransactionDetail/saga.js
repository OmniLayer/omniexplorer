import { call, put, take } from 'redux-saga/effects';
import { LOAD_TRANSACTION } from 'containers/TransactionDetail/constants';
import getLocationPath from 'utils/getLocationPath';
import { transactionLoaded } from 'containers/TransactionDetail/actions';

import request from 'utils/request';

export function* getTransaction(action = {}) {
  const txid = action.tx;
  const requestURL = `${getLocationPath()}/transaction/tx/${txid}`;

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

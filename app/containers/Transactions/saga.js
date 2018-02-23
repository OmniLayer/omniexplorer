import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_TRANSACTIONS } from 'containers/Transactions/constants';
import { transactionsLoaded, transactionsLoadingError } from 'containers/Transactions/actions';

import request from 'utils/request';

export function* getTransactions() {
  const requestURL = '/api/v1/transaction/general/';

  try {
    // Call our request helper (see 'utils/request')
    const headers = {
    };

    const transactions = yield call(request, requestURL, headers);
    yield put(transactionsLoaded(transactions.data, transactions.pages));
  } catch (err) {
    yield put(transactionsLoadingError(err));
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* get() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_TRANSACTIONS, getTransactions);
}

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_TRANSACTIONS, SET_PAGE } from 'containers/Transactions/constants';
import { API_URL_BASE } from 'containers/App/constants';
import { transactionsLoaded, transactionsLoadingError } from 'containers/Transactions/actions';

import request from 'utils/request';

function* getTransactions(action = {}) {
  const page = action.page || 0;
  const requestURL = (action.addr ? `${API_URL_BASE}/transaction/address/${page}` : `${API_URL_BASE}/transaction/general/${page}`);

  try {
    const options = (action.addr ?
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `${encodeURIComponent('addr')}=${encodeURIComponent(action.addr)}`,
    } :
        null
    );

    const transactions = yield call(request, requestURL, options);
    yield put(transactionsLoaded(transactions.transactions, transactions.pages, page));
  } catch (err) {
    yield put(transactionsLoadingError(err));
  }
}

export function* setPageGenerator(action) {
  return yield getTransactions(action);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    takeLatest(SET_PAGE, setPageGenerator),
    takeLatest(LOAD_TRANSACTIONS, getTransactions),
  ]);
}

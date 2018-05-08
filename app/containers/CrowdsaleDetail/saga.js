import { all, call, put, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_CROWDSALE_TRANSACTIONS } from './constants';
import { errorCrowdsaleTransactionsFetch, updateCrowdsaleTransactionsFetch } from './actions';

export function* getCrowdsaleTransactions(action = {}) {
  const page = action.page || 0;
  const count = 10; // fixed for now..
  const requestURL = `${API_URL_BASE}/properties/gethistory/${action.id}`;
  const pageParam = encodeURIComponent('start');
  const pageValue = encodeURIComponent(page);
  const countParam = encodeURIComponent('count');
  const countValue = encodeURIComponent(count);

  try {
    const getTransactionsOptions = {
      method: 'POST',
      type: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `${pageParam}=${pageValue}&${countParam}=${countValue}`,
    };

    const transactions = yield call(request, requestURL, getTransactionsOptions);
    yield put(updateCrowdsaleTransactionsFetch(transactions.transactions, transactions.pages, transactions.total, page));
  } catch (err) {
    yield put(errorCrowdsaleTransactionsFetch(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    takeEvery(LOAD_CROWDSALE_TRANSACTIONS, getCrowdsaleTransactions),
  ]);
}

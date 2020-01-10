import { call, put, select, take } from 'redux-saga/effects';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_CROWDSALE_TRANSACTIONS } from './constants';
import { updateCrowdsaleTransactionsFetch } from './actions';
import makeSelectCrowdsaleDetail from './selectors';

export function* getCrowdsaleTransactions({ start = 0, count = 10, id }) {
  const requestURL = `${API_URL_BASE}/properties/gethistory/${id}`;
  const state = yield select(makeSelectCrowdsaleDetail());
  const startPage = state.currentPage || start;

  const body = encoderURIParams({
    start: startPage,
    count,
  }, true);

  const getTransactionsOptions = {
    method: 'POST',
    type: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  };

  const transactions = yield call(
    request,
    requestURL,
    getTransactionsOptions,
  );

  yield put(
    updateCrowdsaleTransactionsFetch(
      transactions.transactions,
      transactions.pages,
      transactions.total,
      startPage,
    ),
  );
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  while (true) {
    const payload = yield take(LOAD_CROWDSALE_TRANSACTIONS);
    yield call(getCrowdsaleTransactions, payload);
  }
}

import { all, call, put, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_CROWDSALE_TRANSACTIONS } from './constants';
import {
  errorCrowdsaleTransactionsFetch,
  updateCrowdsaleTransactionsFetch,
} from './actions';

export function* getCrowdsaleTransactions({ start = 0, count = 1000, id }) {
  const requestURL = `${API_URL_BASE}/properties/gethistory/${id}`;

  const body = encoderURIParams({ start, count }, true);

  try {
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
        start,
      ),
    );
  } catch (err) {
    yield put(errorCrowdsaleTransactionsFetch(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([takeEvery(LOAD_CROWDSALE_TRANSACTIONS, getCrowdsaleTransactions)]);
}

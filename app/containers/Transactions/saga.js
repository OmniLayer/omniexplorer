import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_TRANSACTIONS } from 'containers/Transactions/constants';
import { API_URL_BASE } from 'containers/App/constants';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';
import { transactionsLoaded, transactionsLoadingError } from './actions';

export function* getTransactions({ page = 0, addr }) {
  const requestURL = (addr ? `${API_URL_BASE}/transaction/address/${page}` : `${API_URL_BASE}/transaction/general/${page}`);

  try {
    const getTransactionsOptions = {
      type: 'cors',
    };

    if (addr) {
      const body = encoderURIParams({ addr });

      Object.assign(
        getTransactionsOptions,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body,
        },
      );
    } else {
      Object.assign(
        getTransactionsOptions,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const transactions = yield call(request, requestURL, getTransactionsOptions);
    yield put(transactionsLoaded(transactions.transactions, transactions.pages, page));
  } catch (err) {
    yield put(transactionsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    takeLatest(LOAD_TRANSACTIONS, getTransactions),
  ]);
}

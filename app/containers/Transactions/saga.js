import { select, all, call, put, takeLatest } from 'redux-saga/effects';
import {
  LOAD_TRANSACTIONS,
  SET_TRANSACTION_TYPE,
  LOAD_UNCONFIRMED,
} from 'containers/Transactions/constants';
import { API_URL_BASE } from 'containers/App/constants';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';
import { transactionsLoaded, transactionsLoadingError } from './actions';
import { makeSelectTransactions } from './selectors';

export function* getUnconfirmed() {
  const requestURL = `${API_URL_BASE}/transaction/unconfirmed`;
  try {
    const transactions = yield call(request, requestURL);
    yield put(transactionsLoaded(transactions.data, 1));
  } catch (err) {
    yield put(transactionsLoadingError(err));
  }
}

export function* getTransactions({ addr }) {
  const state = yield select(makeSelectTransactions());
  const page = state.currentPage;
  const { txType } = state;

  const requestURL = addr
    ? `${API_URL_BASE}/transaction/address/${page}`
    : `${API_URL_BASE}/transaction/general/${page}`;

  try {
    const getTransactionsOptions = {
      type: 'cors',
    };

    const options = { tx_type: txType };

    if (addr) {
      options.addr = addr;
    }
    const body = encoderURIParams({ addr, tx_type: txType });

    Object.assign(getTransactionsOptions, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    const transactions = yield call(
      request,
      requestURL,
      getTransactionsOptions,
    );
    yield put(
      transactionsLoaded(transactions.transactions, transactions.pages),
    );
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
    takeLatest(SET_TRANSACTION_TYPE, getTransactions),
    takeLatest(LOAD_UNCONFIRMED, getUnconfirmed),
  ]);
}

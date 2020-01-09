import {
  all,
  call,
  put,
  select,
  takeEvery,
  take,
  takeLatest,
} from 'redux-saga/effects';
import {
  LOAD_TRANSACTIONS,
  LOAD_UNCONFIRMED,
  SET_TRANSACTION_TYPE,
} from 'containers/Transactions/constants';
import { API_URL_BASE } from 'containers/App/constants';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';
import { transactionsLoaded } from './actions';
import { makeSelectTransactions } from './selectors';
import { LOAD_PROPERTY } from '../../components/Token/constants';

export function* getUnconfirmed({ addr }) {
  const requestURL = addr
    ? `${API_URL_BASE}/transaction/unconfirmed/${addr}`
    : `${API_URL_BASE}/transaction/unconfirmed`;

  const transactions = yield call(request, requestURL);
  yield put(transactionsLoaded(transactions.data, 1));
}

export function* getTransactions({ addr }) {
  const state = yield select(makeSelectTransactions());
  const page = state.currentPage;
  const { txType } = state;

  const requestURL = addr
    ? `${API_URL_BASE}/transaction/address/${page}`
    : `${API_URL_BASE}/transaction/general/${page}`;

  const getTransactionsOptions = {
    type: 'cors',
  };

  const options = { tx_type: txType };

  if (addr) {
    options.addr = addr;
  }
  const body = encoderURIParams({
    addr,
    tx_type: txType,
  });

  Object.assign(getTransactionsOptions, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  const transactions = yield call(request, requestURL, getTransactionsOptions);
  yield put(
    transactionsLoaded(transactions.transactions, transactions.pages, addr),
  );
}

function* watchGetTransactions() {
  while (true) {
    const payload = yield take(LOAD_PROPERTY);
    yield call(getTransactions, payload);
  }
}

function* watchGetUnconfirmed() {
  while (true) {
    const payload = yield take(LOAD_UNCONFIRMED);
    yield call(getUnconfirmed, payload);
  }
}

function* watchGetTransactionsByType() {
  while (true) {
    const payload = yield take(SET_TRANSACTION_TYPE);
    yield call(getUnconfirmed, payload);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    call(watchGetTransactions),
    // takeLatest(LOAD_TRANSACTIONS, getTransactions),
    call(watchGetTransactionsByType),
    // takeLatest(SET_TRANSACTION_TYPE, getTransactions),
    call(watchGetUnconfirmed),
    // takeLatest(LOAD_UNCONFIRMED, getUnconfirmed),
  ]);
}

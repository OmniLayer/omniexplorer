import { all, call, put, select, take } from 'redux-saga/effects';
import { LOAD_TRANSACTIONS, LOAD_UNCONFIRMED, LOAD_CLASSAB_TXS, SET_TRANSACTION_TYPE } from 'containers/Transactions/constants';
import { API_URL_BASE, FN_API_URL_BLOCKCHAIN_ADDR } from 'containers/App/constants';
import getLocationPath, {getSufixURL} from 'utils/getLocationPath';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';
import { transactionsLoaded, ClassABTxsLoaded } from './actions';
import { makeSelectTransactions } from './selectors';

export function* getUnconfirmed({ addr }) {
  const requestURL = addr
    ? `${getLocationPath()}/transaction/unconfirmed/${addr}`
    : `${getLocationPath()}/transaction/unconfirmed`;

  const transactions = yield call(request, requestURL);
  yield put(transactionsLoaded(transactions.data, 1));
}

export function* getClassABTxs({ addr }) {
  const state = yield select(makeSelectTransactions());
  const maxPagesByMedia = getMaxPagesByMedia();
  const page = state.currentPage;
  const offset = (page - 1) * maxPagesByMedia;
  const requestURL = FN_API_URL_BLOCKCHAIN_ADDR({
    address: addr,
    limit: maxPagesByMedia,
    offset,
  });

  const transactions = yield call(request, requestURL);
  yield put(ClassABTxsLoaded(transactions.txs, transactions.n_tx / maxPagesByMedia, addr, transactions.n_tx));
}

export function* getTransactions({ addr }) {
  const state = yield select(makeSelectTransactions());
  const page = state.currentPage;
  const { txType } = state;

  const requestURL = addr
    ? `${getLocationPath()}/transaction/address/${page}`
    : `${getLocationPath()}/transaction/general/${page}`;

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
    transactionsLoaded(transactions.transactions, transactions.pages, addr, transactions.txcount),
  );
}

function* watchGetTransactions() {
  while (true) {
    const payload = yield take(LOAD_TRANSACTIONS);
    yield call(getTransactions, payload);
  }
}

function* watchGetUnconfirmed() {
  while (true) {
    const payload = yield take(LOAD_UNCONFIRMED);
    yield call(getUnconfirmed, payload);
  }
}

function* watchGetClassABTxs() {
  while (true) {
    const payload = yield take(LOAD_CLASSAB_TXS);
    yield call(getClassABTxs, payload);
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
    call(watchGetTransactionsByType),
    call(watchGetUnconfirmed),
    call(watchGetClassABTxs),
  ]);
}

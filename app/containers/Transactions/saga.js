import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_TRANSACTIONS } from 'containers/Transactions/constants';
import { API_URL_BASE } from 'containers/App/constants';
import request from 'utils/request';
import { transactionsLoaded, transactionsLoadingError } from './actions';


export function* getTransactions(action = {}) {
  const page = action.page || 0;
  const requestURL = (action.addr ? `${API_URL_BASE}/transaction/address/${page}` : `${API_URL_BASE}/transaction/general/${page}`);

  try {
    const addrHeader = encodeURIComponent('addr');
    const addrValue = encodeURIComponent(action.addr);
    const getTransactionsOptions = {
      type: 'cors',
    };
    if (action.addr) {
      Object.assign(
        getTransactionsOptions,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `${addrHeader}=${addrValue}`,
        }
      );
    } else {
      Object.assign(
        getTransactionsOptions,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const transactions = yield call(request, requestURL, getTransactionsOptions);
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
    // takeLatest(SET_PAGE, setPageGenerator),
    takeLatest(LOAD_TRANSACTIONS, getTransactions),
  ]);
}

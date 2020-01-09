import { call, put, take } from 'redux-saga/effects';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';
import isEmpty from 'lodash/isEmpty';

import { API_URL_BASE, API_URL_BLOCKCHAIN_BTC_BALANCE } from 'containers/App/constants';
import { LOAD_SEARCH } from './constants';
import { searchLoaded } from './actions';

export function* getSearch({ query }) {
  const requestURL = `${API_URL_BASE}/search`;
  
  const body = encoderURIParams({ query });
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  };
  
  const search = yield call(request, requestURL, options);
  
  // if the query is an address get BTC balance from blockchain.info for the given wallet
  if (!isEmpty(search.data.address)) {
    const wallet = search.data.address;
    const address = search.query;
    
    const urlBTCBalance = `${API_URL_BLOCKCHAIN_BTC_BALANCE}${address}`;
    const btcBalance = yield call(request, urlBTCBalance);
    
    // use btc balance from blockchain.info response
    const btcBalanceValue = btcBalance[address].final_balance;
    const walletBTCBalance = wallet.balance.find(x => x.id == 0);
    if (walletBTCBalance) walletBTCBalance.value = btcBalanceValue;
  }
  
  yield put(searchLoaded(search));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  while (true) {
    const payload = yield take(LOAD_SEARCH);
    yield call(getSearch, payload);
  }
}

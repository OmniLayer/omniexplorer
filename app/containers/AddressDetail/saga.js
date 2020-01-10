import { all, call, put, take } from 'redux-saga/effects';
import { LOAD_ADDRESS } from 'containers/AddressDetail/constants';
import { API_URL_BASE, API_URL_BLOCKCHAIN_BTC_BALANCE } from 'containers/App/constants';
import { updateFetch } from 'components/Token/actions';
import { addressLoaded } from 'containers/AddressDetail/actions';
import encoderURIParams from 'utils/encoderURIParams';

import request from 'utils/request';

export function* getAddress({ addr }) {
  const requestURL = `${API_URL_BASE}/address/addr`;

  const body = encoderURIParams({ addr });
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  };

  // get BTC balance from blockchain.info for the given wallet
  const urlBTCBalance = `${API_URL_BLOCKCHAIN_BTC_BALANCE}${addr}`;
  const [wallet, btcBalance] = yield all([
    call(request, requestURL, options),
    call(request, urlBTCBalance),
  ]);
  // use btc balance from blockchain.info response
  const btcBalanceValue = btcBalance[addr].final_balance;
  const walletBTCBalance = wallet.balance.find(x => x.id == 0);
  if (walletBTCBalance) walletBTCBalance.value = btcBalanceValue;

  yield put(addressLoaded(wallet));
  yield wallet.balance.map(property => put(updateFetch(property.propertyinfo)));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  while (true) {
    const payload = yield take(LOAD_ADDRESS);
    yield call(getAddress, payload);
  }
}

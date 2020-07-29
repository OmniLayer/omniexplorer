import { call, put, take } from 'redux-saga/effects';
import { LOAD_ADDRESS } from 'containers/AddressDetail/constants';
import {
  API_URL_BLOCKCHAIN_BTC_BALANCE,
  FN_API_URL_BLOCKCHAIR_BTC_BALANCE,
} from 'containers/App/constants';
import getLocationPath from 'utils/getLocationPath';
import { updateFetch } from 'components/Token/actions';
import { addressLoaded } from 'containers/AddressDetail/actions';
import encoderURIParams from 'utils/encoderURIParams';

import request from 'utils/request';
import isNil from 'lodash/isNil';

export function* getAddress({ addr }) {
  const requestURL = `${getLocationPath()}/address/addr`;

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

  const wallet = yield call(request, requestURL, options);
  let btcBalance;

  try {
    btcBalance = yield* call(request, urlBTCBalance);
  } catch {}
  // let [wallet, btcBalance] = yield all([
  //   call(request, requestURL, options),
  //   call(request, urlBTCBalance),
  // ]);

  /**
   // use btc balance from blockchain.info response
   const btcBalanceValue = btcBalance[addr].final_balance;
   const walletBTCBalance = wallet.balance.find(x => x.id == 0);
   if (walletBTCBalance) walletBTCBalance.value = btcBalanceValue;
   * */
  let btcBalanceValue;

  // if there is a valid response use btc balance from blockchain.info response
  if (btcBalance && btcBalance[addr] && !isNil(btcBalance[addr].final_balance)) {
    btcBalanceValue = btcBalance[addr].final_balance;
  } else {
    // if blockchain.info retrieves an error try with blockchair
    const urlBTCBalanceAlternative = FN_API_URL_BLOCKCHAIR_BTC_BALANCE({
      address: addr,
    });
    try {
      btcBalance = yield* call(request, urlBTCBalanceAlternative);
      // use btc balance from blockchair.com response
      btcBalanceValue = btcBalance.data[addr].address.balance;
    } catch {}
  }

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

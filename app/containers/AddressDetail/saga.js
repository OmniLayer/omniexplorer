import { call, put, takeLatest, all } from 'redux-saga/effects';
import { LOAD_ADDRESS } from 'containers/AddressDetail/constants';
import { API_URL_BASE } from 'containers/App/constants';
import { addressLoaded, addressLoadingError } from 'containers/AddressDetail/actions';

import request from 'utils/request';

export function* getAddress(action = {}) {
  const requestURL = `${API_URL_BASE}/address/addr`;

  try {
    const bodyRequest = `${encodeURIComponent('addr')}=${encodeURIComponent(action.addr)}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyRequest,
    };

    const wallet = yield call(request, requestURL, options);
    yield put(addressLoaded(wallet));
  } catch (err) {
    yield put(addressLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    takeLatest(LOAD_ADDRESS, getAddress),
  ]);
}

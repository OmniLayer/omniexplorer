import { call, put, takeLatest, all } from 'redux-saga/effects';
import { LOAD_ADDRESS } from 'containers/AddressDetail/constants';
import { API_URL_BASE } from 'containers/App/constants';
import { updateFetch } from 'components/Token/actions';
import {
  addressLoaded,
  addressLoadingError,
} from 'containers/AddressDetail/actions';
import encoderURIParams from 'utils/encoderURIParams';

import request from 'utils/request';

export function* getAddress({ addr }) {
  const requestURL = `${API_URL_BASE}/address/addr`;

  try {
    const body = encoderURIParams({ addr });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    };

    const wallet = yield call(request, requestURL, options);
    yield put(addressLoaded(wallet));
    yield wallet.balance.map(property => put(updateFetch(property.propertyinfo)));
  } catch (err) {
    yield put(addressLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([takeLatest(LOAD_ADDRESS, getAddress)]);
}

import { call, put, take } from 'redux-saga/effects';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';
import isNil from 'lodash/isNil';

// import { API_URL_BLOCKCHAIN_BTC_BALANCE, FN_API_URL_BLOCKCHAIR_BTC_BALANCE } from 'containers/App/constants';
import getLocationPath from 'utils/getLocationPath';
// import isFeatherCoin from 'utils/isOmniFeather';
// import isLTC from 'utils/isLTC';
import { LOAD_PROPERTIES } from './constants';
import { propertiesLoaded } from './actions';

export function* getProperties({ ecosystem }) {
  const requestURL = `${getLocationPath()}/properties/listbyecosystem`;

  const body = encoderURIParams({ ecosystem });
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  };

  const properties = yield call(request, requestURL, options);

  yield put(propertiesLoaded(properties));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  while (true) {
    const payload = yield take(LOAD_PROPERTIES);
    yield call(getProperties, payload);
  }
}

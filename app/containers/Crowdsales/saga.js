import { call, put, take } from 'redux-saga/effects';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_CROWDSALES } from './constants';
import { crowdsalesLoaded } from './actions';

export function* getCrowdsales({ ecosystem }) {
  const requestURL = `${API_URL_BASE}/properties/listactivecrowdsales`;
  
  const body = encoderURIParams({ ecosystem });
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  };
  
  const crowdsales = yield call(request, requestURL, options);
  yield put(crowdsalesLoaded(crowdsales));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  while (true) {
    const payload = yield take(LOAD_CROWDSALES);
    yield call(getCrowdsales, payload);
  }
}

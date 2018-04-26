import { call, put, takeLatest, all } from 'redux-saga/effects';
import request from 'utils/request';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_CROWDSALES } from './constants';
import { crowdsalesLoaded, crowdsalesLoadingError } from './actions';

export function* getCrowdsales(action = {}) {
  const requestURL = `${API_URL_BASE}/properties/listactivecrowdsales`;

  try {
    const bodyRequest = `${encodeURIComponent('ecosystem')}=${encodeURIComponent(action.ecosystem)}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyRequest,
    };

    const crowdsales = yield call(request, requestURL, options);
    yield put(crowdsalesLoaded(crowdsales));
  } catch (err) {
    yield put(crowdsalesLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    takeLatest(LOAD_CROWDSALES, getCrowdsales),
  ]);
}

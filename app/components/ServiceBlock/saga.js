import { call, put, take } from 'redux-saga/effects';
import request from 'utils/request';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_STATUS } from './constants';
import { updateFetch } from './actions';

function* fetchStatus() {
  const requestURL = `${API_URL_BASE}/system/status`;
  const status = yield call(request, requestURL);
  yield put(updateFetch(status));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  while (true) {
    const payload = yield take(LOAD_STATUS);
    yield call(fetchStatus, payload);
  }
}

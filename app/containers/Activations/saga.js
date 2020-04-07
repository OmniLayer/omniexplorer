import { call, put, take } from 'redux-saga/effects';
import { API_URL_BASE } from 'containers/App/constants';
import request from 'utils/request';

import { LOAD_ACTIVATIONS } from './constants';
import { activationsLoaded } from './actions';

export function* getActivations() {
  const requestURL = `${API_URL_BASE}/system/featureactivations`;
  const activations = yield call(request, requestURL);
  yield put(activationsLoaded(activations));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  while (true) {
    const payload = yield take(LOAD_ACTIVATIONS);
    yield call(getActivations, payload);
  }
}

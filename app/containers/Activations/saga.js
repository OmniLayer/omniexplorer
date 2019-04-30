import { all, put, takeLatest } from 'redux-saga/effects';
import { API_URL_BASE, MOCKED_ACTIVATIONS } from 'containers/App/constants';
import { LOAD_ACTIVATIONS } from './constants';
import { activationsLoaded } from './actions';

export function* getActivations() {
  const requestURL = `${API_URL_BASE}/activations`;

  //TODO: use api instead of mocked response
  // const activations = yield call(request, requestURL);

  yield put(activationsLoaded(MOCKED_ACTIVATIONS));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([takeLatest(LOAD_ACTIVATIONS, getActivations)]);
}

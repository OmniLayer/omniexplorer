import { call, put, takeLatest, all } from 'redux-saga/effects';
import { API_URL_BASE, MOCKED_ACTIVATIONS } from 'containers/App/constants';
import { LOAD_ACTIVATIONS } from './constants';
import { activationsLoaded, activationsLoadingError } from './actions';
import encoderURIParams from 'utils/encoderURIParams';
import request from 'utils/request';

export function* getActivations() {
  const requestURL = `${API_URL_BASE}/activations`;

  try {
    //TODO: use api instead of mocked response
    // const activations = yield call(request, requestURL);

    yield put(activationsLoaded(MOCKED_ACTIVATIONS));
  } catch (err) {
    yield put(activationsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([takeLatest(LOAD_ACTIVATIONS, getActivations)]);
}

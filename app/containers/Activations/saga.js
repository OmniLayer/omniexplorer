import { call, put, take } from 'redux-saga/effects';
import getLocationPath from 'utils/getLocationPath';
import request from 'utils/request';

import { LOAD_ACTIVATIONS } from './constants';
import { activationsLoaded } from './actions';

export function* getActivations() {
  const requestURL = `${getLocationPath()}/system/featureactivations`;
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

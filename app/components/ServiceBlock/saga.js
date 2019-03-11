import { all, call, put, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_STATUS } from './constants';
import { errorFetch, updateFetch } from './actions';

function* fetchStatus() {
  try {
    const requestURL = `${API_URL_BASE}/system/status`;
    const status = yield call(request, requestURL);
    yield put(updateFetch(status));
  } catch (err) {
    yield put(errorFetch(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([takeEvery(LOAD_STATUS, fetchStatus)]);
}

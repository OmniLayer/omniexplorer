import { all, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';

import { LOAD_PROPERTY } from './constants';
import { API_URL_BASE } from 'containers/App/constants';
import { errorFetch, updateFetch } from './actions';

function* fetchProperty(action) {
  try {
      const requestURL = `${API_URL_BASE}/property/${action.id}`;
      const property = yield call(request, requestURL);
      yield put(updateFetch(property));
  } catch (err) {
    yield put(errorFetch(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    takeEvery(LOAD_PROPERTY, fetchProperty),
  ]);
}

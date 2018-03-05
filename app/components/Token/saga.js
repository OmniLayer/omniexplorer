import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { LOAD_PROPERTY } from './constants';
import { errorFetch, updateFetch } from './actions';

function* fetchProperty(action) {
  try {
    const state = yield select((state) => state);
    const token = state.get('tokenDetail').get('tokens').get(action.id);

    if (!token) {
      const requestURL = `/api/v1/property/${action.id}`;
      const property = yield call(request, requestURL);
      yield put(updateFetch(property));
    }
  } catch (err) {
    yield put(errorFetch(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    takeLatest(LOAD_PROPERTY, fetchProperty),
  ]);
}

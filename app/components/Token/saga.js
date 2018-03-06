import { all, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';

import { LOAD_PROPERTY } from './constants';
import { errorFetch, updateFetch } from './actions';

function* fetchProperty(action) {
  try {
      const requestURL = `/api/v1/property/${action.id}`;
      const property = yield call(request, requestURL);
      yield put(updateFetch(property));
  } catch (err) {
    console.log(err);
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

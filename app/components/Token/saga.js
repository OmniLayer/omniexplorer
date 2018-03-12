import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_PROPERTY } from './constants';
import { errorFetch, updateFetch } from './actions';

function* fetchProperty(action) {
  try {
    // @refactoring: remove the state set
    const state = yield select((st) => st);
    const tokens = state.get('token').get('tokens');

    if (!tokens.get(action.id.toString())) {
      const requestURL = `${API_URL_BASE}/property/${action.id}`;
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
    takeEvery(LOAD_PROPERTY, fetchProperty),
  ]);
}

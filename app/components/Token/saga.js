/* eslint-disable no-console */
import { all, call, fork, put, select, delay, take, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_PROPERTY, LOAD_PROPERTY_DEEP } from './constants';
import { updateFetch } from './actions';
import { getTokens } from './selectors';

function* fetchSingleProperty(action) {
  // load token if is still not requested
  yield delay(1000);

  const state = yield select(st => st);
  const tokens = state.token.tokens;

  if (action.id && !tokens[action.id.toString()]) {
    const property = yield call(fetchProperty, action.id);

    if (!property) {
      const error = new Error(`Failed to fetch property ${action.id}`);
      throw error;
    }
  }
}

export function* watchFetchProperty() {
  while (true) {
    const prevTokenSelector = yield select(getTokens);
    const { id } = yield take(LOAD_PROPERTY_DEEP);
    const newTokenSelector = yield select(getTokens);
    if (prevTokenSelector !== newTokenSelector || !newTokenSelector[id]) {
      yield fork(fetchPropertyDeep, { id });
    }
  }
}

function* fetchPropertyDeep(action) {
  const state = yield select(st => st);
  const tokens = state.token.tokens;
  let property = tokens[action.id.toString()];

  // load token if is still not requested
  // yield call(delay, 1000);
  if (!property) {
    console.log('fetch property ', action.id);
    property = yield call(fetchProperty, action.id);

    if (!property) {
      const error = new Error(`Failed to fetch property ${action.id}`);
      throw error;
    }
  }

  // load desired property if it's still not requested
  const propertyiddesired = (property.propertyiddesired || '').toString();
  if (propertyiddesired && !tokens[propertyiddesired]) {
    console.log('fetch desired property ', propertyiddesired);
    yield call(fetchProperty, propertyiddesired);
  }
}

function* fetchProperty(propertyId) {
  const requestURL = `${API_URL_BASE}/property/${propertyId}`;
  const property = yield call(request, requestURL);
  yield put(updateFetch(property));

  return property;
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    takeEvery(LOAD_PROPERTY, fetchSingleProperty),
    fork(watchFetchProperty),
  ]);
}

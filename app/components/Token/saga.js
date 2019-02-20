/* eslint-disable no-console */
import { delay } from 'redux-saga';
import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';
import request from 'utils/request';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_PROPERTY, LOAD_PROPERTY_DEEP } from './constants';
import { errorFetch, updateFetch } from './actions';
import { getTokens } from './selectors';

function* fetchSingleProperty(action) {
  try {
    // load token if is still not requested
    yield call(delay, 1000);

    const state = yield select(st => st);
    const tokens = state.get('token').get('tokens');

    if (!tokens.get(action.id.toString())) {
      const property = yield call(fetchProperty, action.id);

      if (!property) {
        const error = new Error(`Failed to fetch property ${action.id}`);
        throw error;
      }
    }
  } catch (err) {
    console.log('SAGA fetchSingleDeep ERR: ', err);
    yield put(errorFetch(err));
  }
}

export function* watchFetchProperty() {
  while (true) {
    const prevTokenSelector = yield select(getTokens);
    const { id } = yield take(LOAD_PROPERTY_DEEP);
    const newTokenSelector = yield select(getTokens);
    if (prevTokenSelector !== newTokenSelector || !newTokenSelector.get(id)) {
      yield fork(fetchPropertyDeep, { id });
    }
  }
}

function* fetchPropertyDeep(action) {
  try {
    const state = yield select(st => st);
    const tokens = state.get('token').get('tokens');
    let property = tokens.get(action.id.toString());

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
    if (propertyiddesired && !tokens.get(propertyiddesired)) {
      console.log('fetch desired property ', propertyiddesired);
      yield call(fetchProperty, propertyiddesired);
    }
  } catch (err) {
    console.log('SAGA fetchPropertyDeep ERR: ', err);
    yield put(errorFetch(err));
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

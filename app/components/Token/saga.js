/* eslint-disable no-console */
import { all, call, delay, fork, put, select, take } from 'redux-saga/effects';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';
import chunk from 'lodash/chunk';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_MANY_PROPERTIES, LOAD_PROPERTY, LOAD_PROPERTY_DEEP } from './constants';
import { cancelFetch, updateFetch, updateFetchMany } from './actions';
import { getTokens } from './selectors';

function* fetchSingleProperty(action) {
  // load token if is still not requested
  yield delay(1000);

  const state = yield select(st => st);
  const { tokens } = state.token;

  if (action.id && !tokens[action.id.toString()]) {
    const property = yield call(fetchProperty, action.id);

    if (!property) {
      const error = new Error(`Failed to fetch property ${action.id}`);
      throw error;
    }
  } else {
    // nothing to load..
    yield call(cancelFetch);
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
  const { tokens } = state.token;
  let property = tokens[action.id.toString()];

  // load token if is still not requested
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
 * watch fetch single property
 */
function* watchFetchSingleProperty() {
  while (true) {
    const payload = yield take(LOAD_PROPERTY);
    yield call(fetchSingleProperty, payload);
  }
}

function* watchFetchManyProperties() {
  while (true) {
    const payload = yield take(LOAD_MANY_PROPERTIES);
    yield call(fetchManyProperties, payload);
  }
}

function* fetchManyProperties(action) {
  // load token if is still not requested

  const requestURL = `${API_URL_BASE}/property/bulk`;
  const state = yield select(st => st);
  const { tokens } = state.token;

  if (!tokens.isFetching) {
    const getOptions = body => ({
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    const propChunks = chunk(action.properties.map(token => token.id), 30);
    const encodedChunks = propChunks.map(propChunk =>
      encoderURIParams({ prop_ids: propChunk.map(id => id) }),
    );
    const optionsArray = encodedChunks.map(encodedChunk =>
      getOptions(encodedChunk),
    );
    const results = yield all(
      optionsArray.map(options => call(request, requestURL, options)),
    );

    yield put(updateFetchMany(results));

    if (!results) {
      const error = new Error(`Failed to fetch properties ${action.id}`);
      throw error;
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    call(watchFetchProperty),
    call(watchFetchSingleProperty),
    call(watchFetchManyProperties),
  ]);
}

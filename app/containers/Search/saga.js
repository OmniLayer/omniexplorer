import { call, put, takeLatest, all } from 'redux-saga/effects';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_SEARCH } from './constants';
import { searchLoaded, searchLoadingError } from './actions';

export function* getSearch({ query }) {
  const requestURL = `${API_URL_BASE}/search`;

  try {
    const body = encoderURIParams({ query });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    };

    const search = yield call(request, requestURL, options);
    yield put(searchLoaded(search));
  } catch (err) {
    yield put(searchLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([takeLatest(LOAD_SEARCH, getSearch)]);
}

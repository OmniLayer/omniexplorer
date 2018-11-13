import { call, put, takeLatest, all } from 'redux-saga/effects';
import { LOAD_BLOCK } from 'containers/BlockDetail/constants';
import { API_URL_BASE } from 'containers/App/constants';
import {
  blockLoaded,
  blockLoadingError,
} from 'containers/BlockDetail/actions';

import request from 'utils/request';

export function* getBlock({ block }) {
  const requestURL = `${API_URL_BASE}/transaction/block/${block}`;
  
  try {
    const result = yield call(request, requestURL);
  
    yield put(blockLoaded(result));
  } catch (err) {
    yield put(blockLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([takeLatest(LOAD_BLOCK, getBlock)]);
}

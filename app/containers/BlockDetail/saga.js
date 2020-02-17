import { call, put, take } from 'redux-saga/effects';
import { LOAD_BLOCK } from 'containers/BlockDetail/constants';
import { API_URL_BASE } from 'containers/App/constants';
import { blockLoaded } from 'containers/BlockDetail/actions';

import request from 'utils/request';

export function* getBlock({ block }) {
  const requestURL = `${API_URL_BASE}/transaction/block/${block}`;
  
  const result = yield call(request, requestURL);
  
  yield put(blockLoaded(result));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  while (true) {
    const payload = yield take(LOAD_BLOCK);
    yield call(getBlock, payload);
  }
}

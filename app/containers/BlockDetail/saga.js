import { call, put, take } from 'redux-saga/effects';
import { LOAD_BLOCK } from 'containers/BlockDetail/constants';
import getLocationPath from 'utils/getLocationPath';
import { blockLoaded } from 'containers/BlockDetail/actions';

import request from 'utils/request';

export function* getBlock({ block }) {
  const requestURL = `${getLocationPath()}/transaction/block/${block}`;

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

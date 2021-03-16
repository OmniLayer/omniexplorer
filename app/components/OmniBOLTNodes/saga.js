import { call, put, select, take } from 'redux-saga/effects';
import {
  OMNIBOLT_TESTNET_API_URL,
} from 'containers/OmniBOLT/constants';

import {
  LOAD_NODES,
  FN_API_URL_OMNIBOLT_NODES,
} from './constants';

import request from 'utils/request';
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';
import { nodesLoaded } from './actions';
import makeSelectOmniBOLTNodes from './selectors';

export function* getNodes() {
  const state = yield select(makeSelectOmniBOLTNodes());
  const maxPagesByMedia = getMaxPagesByMedia();
  const page = state.currentPage;

  const requestURL = FN_API_URL_OMNIBOLT_NODES({
    apiurl: OMNIBOLT_TESTNET_API_URL,
    pagenum: page,
    pagesize: maxPagesByMedia,
  });

  const nodes = yield call(request, requestURL);
  yield put(
    nodesLoaded(nodes),
  );
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  while (true) {
    const payload = yield take(LOAD_NODES);
    yield call(getNodes, payload);
  }
}

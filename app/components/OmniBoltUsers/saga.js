import { call, put, select, take } from 'redux-saga/effects';
import {
  OMNIBOLT_TESTNET_API_URL,
} from 'containers/OmniBOLT/constants';
import {
  LOAD_USERS,
  FN_API_URL_OMNIBOLT_USERS,
} from './constants';

import request from 'utils/request';
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';
import { usersLoaded } from './actions';
import makeSelectOmniBOLTUsers from './selectors';
import { LOAD_NODES } from '../OmniBOLTNodes/constants';
import { getNodes } from '../OmniBOLTNodes/saga';

export function* getUsers() {
  const state = yield select(makeSelectOmniBOLTUsers());
  const maxPagesByMedia = getMaxPagesByMedia();
  const page = state.currentPage;

  const requestURL = FN_API_URL_OMNIBOLT_USERS({
    apiurl: OMNIBOLT_TESTNET_API_URL,
    pagenum: page,
    pagesize: maxPagesByMedia,
  });

  const nodes = yield call(request, requestURL);
  yield put(
    usersLoaded(nodes),
  );
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  while (true) {
    const payload = yield take(LOAD_USERS);
    yield call(getUsers, payload);
  }
}

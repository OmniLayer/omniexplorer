import { all, call, put, select, take } from 'redux-saga/effects';
import {
  OMNIBOLT_TESTNET_API_URL,

  FN_API_URL_OMNIBOLT_NODES,
  FN_API_URL_OMNIBOLT_USERS,
  FN_API_URL_OMNIBOLT_CHANNELS,
} from 'containers/OmniBolt/constants';

// import getLocationPath, { getSufixURL } from 'utils/getLocationPath';
import request from 'utils/request';
// import encoderURIParams from 'utils/encoderURIParams';
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';
import { nodesLoaded, usersLoaded, channelsLoaded } from './actions';
import { makeSelectNodes, makeSelectUsers, makeSelectChannels } from './selectors';

export function* getNodes() {
  const state = yield select(makeSelectNodes());
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

export function* getUsers() {
  const state = yield select(makeSelectUsers());
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

export function* getChannels() {
  const state = yield select(makeSelectChannels());
  const maxPagesByMedia = getMaxPagesByMedia();
  const page = state.currentPage;

  const requestURL = FN_API_URL_OMNIBOLT_CHANNELS({
    apiurl: OMNIBOLT_TESTNET_API_URL,
    pagenum: page,
    pagesize: maxPagesByMedia,
  });

  const nodes = yield call(request, requestURL);
  yield put(
    usersLoaded(nodes),
  );
}

function* watchGetNodes() {
  while (true) {
    const payload = yield take(LOAD_NODES);
    yield call(getNodes, payload);
  }
}

function* watchGetUsers() {
  while (true) {
    const payload = yield take(LOAD_USERS);
    yield call(getUsers, payload);
  }
}

function* watchGetChannels() {
  while (true) {
    const payload = yield take(LOAD_CHANNELS);
    yield call(getChannels, payload);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    call(watchGetNodes),
    call(watchGetUsers),
    call(watchGetChannels),
  ]);
}

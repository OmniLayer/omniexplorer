import { call, put, select, take } from 'redux-saga/effects';

import request from 'utils/request';
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';
import {
  OMNIBOLT_TESTNET_API_URL,
} from 'containers/OmniBOLT/constants';

import { channelsLoaded } from './actions';
import makeSelectOmniBOLTChannels from './selectors';
import {
  LOAD_CHANNELS,
  FN_API_URL_OMNIBOLT_CHANNELS,
} from './constants'

export function* getChannels() {
  const state = yield select(makeSelectOmniBOLTChannels());
  const maxPagesByMedia = getMaxPagesByMedia();
  const page = state.currentPage;

  const requestURL = FN_API_URL_OMNIBOLT_CHANNELS({
    apiurl: OMNIBOLT_TESTNET_API_URL,
    pagenum: page,
    pagesize: maxPagesByMedia,
  });

  const channels = yield call(request, requestURL);
  yield put(
    channelsLoaded(channels),
  );
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  while (true) {
    const payload = yield take(LOAD_CHANNELS);
    yield call(getChannels, payload);
  }
}

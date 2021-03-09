import { call, put, select, take } from 'redux-saga/effects';
import {
  OMNIBOLT_TESTNET_API_URL,
} from 'containers/OmniBolt/constants';

import {
  LOAD_CHANNELS,
  FN_API_URL_OMNIBOLT_CHANNELS,
} from './constants'

import request from 'utils/request';
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';
import { channelsLoaded } from './actions';
import { makeSelectOmniBoltChannels } from './selectors';

export function* getChannels() {
  const state = yield select(makeSelectOmniBoltChannels());
  const maxPagesByMedia = getMaxPagesByMedia();
  const page = state.currentPage;

  const requestURL = FN_API_URL_OMNIBOLT_CHANNELS({
    apiurl: OMNIBOLT_TESTNET_API_URL,
    pagenum: page,
    pagesize: maxPagesByMedia,
  });

  const nodes = yield call(request, requestURL);
  yield put(
    channelsLoaded(nodes),
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

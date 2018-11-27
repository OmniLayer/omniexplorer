import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_BLOCKS } from 'containers/Blocks/constants';
import { API_URL_BASE } from 'containers/App/constants';
import request from 'utils/request';
import { blocksLoaded, blocksLoadingError } from './actions';
import { makeSelectBlocks } from './selectors';

export function* getBlocks() {
  const state = yield select(makeSelectBlocks());
  const currentBlock = state.currentBlock || '';

  const requestURL = `${API_URL_BASE}/transaction/blocks/${currentBlock}`;

  try {
    const blocks = yield call(request, requestURL);
    yield put(blocksLoaded(blocks));
  } catch (err) {
    yield put(blocksLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    takeLatest(LOAD_BLOCKS, getBlocks),
  ]);
}

/**
 * Tests for BlockDetail sagas
 */

import { all, put, takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import request from 'utils/request';

import {
  API_URL_BASE,
  FIRST_BLOCK,
} from 'containers/App/constants';
import getLocationPath, {getSufixURL} from 'utils/getLocationPath';

import { LOAD_BLOCKS } from '../constants';
import { blocksLoadingError, blocksLoaded } from '../actions';
import root, { getBlocks } from '../saga';
import { initialState } from '../reducer';

/* eslint-disable redux-saga/yield-effects */
describe('getBlocks Saga', () => {
  let getBlocksGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getBlocksGenerator = getBlocks({ FIRST_BLOCK });

    const selectDescriptor = getBlocksGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getBlocksGenerator.next(initialState).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the blocksLoaded action if it requests the data successfully', () => {
    const response = {
      transactions: [],
    };

    const saga = testSaga(getBlocks, { block: FIRST_BLOCK });
    const url = `${getLocationPath()}/transaction/blocks/${FIRST_BLOCK}`;

    saga
      .next()
      .next({ appendBlocks: false, previousBlock: FIRST_BLOCK })
      .call(request, url)
      .next(response)
      .put(blocksLoaded(response));
  });

  it('should call the blocksLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getBlocksGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(blocksLoadingError(response)));
  });
});

describe('BlockDetail detail Saga', () => {
  it('should start task to watch for LOAD_BLOCKS action', () => {
    // arrange
    const rootSaga = root();
    const expectedYield = all([takeLatest(LOAD_BLOCKS, getBlocks)]);

    // act
    const actualYield = rootSaga.next().value;

    // assert
    expect(actualYield).toEqual(expectedYield);
  });
});

/**
 * Tests for BlockDetail sagas
 */

import { all, put, takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import request from 'utils/request';

import getBlockchainFirstBlock from 'utils/getBlockchainFirstBlock';
import getLocationPath from 'utils/getLocationPath';
import { blockLoaded } from '../actions';

import { LOAD_BLOCK } from '../constants';
import root, { getBlock } from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('getBlock Saga', () => {
  let getBlockGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getBlockGenerator = getBlock({ getBlockchainFirstBlock() });

    const selectDescriptor = getBlockGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getBlockGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the blockLoaded action if it requests the data successfully', () => {
    const response = {
      transactions: [],
    };

    const saga = testSaga(getBlock, { block: getBlockchainFirstBlock() });
    const url = `${getLocationPath()}/transaction/block/${getBlockchainFirstBlock()}`;

    saga
      .next()
      .call(request, url)
      .next(response)
      .put(blockLoaded(response));
  });
});

describe('BlockDetail detail Saga', () => {
  it('should start task to watch for LOAD_BLOCK action', () => {
    // arrange
    const rootSaga = root();
    const expectedYield = all([takeLatest(LOAD_BLOCK, getBlock)]);

    // act
    const actualYield = rootSaga.next().value;

    // assert
    expect(actualYield).toEqual(expectedYield);
  });
});

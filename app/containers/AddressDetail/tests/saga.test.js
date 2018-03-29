/**
 * Tests for AddressDetail sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { LOAD_ADDRESS } from '../constants';
import { addressLoaded, addressLoadingError } from '../actions';

import root, { getAddress } from '../saga';

const addr = '17ScKNXo4cL8DyfWfcCWu1uJySQuJm7iKx';

/* eslint-disable redux-saga/yield-effects */
describe('getAddress Saga', () => {
  let getAddressGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getAddressGenerator = getAddress();

    const selectDescriptor = getAddressGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getAddressGenerator.next(addr).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the addressLoaded action if it requests the data successfully', () => {
    const response = {
      balance: [
        {
          divisible: true,
          frozen: '0',
          id: '31',
          pendingneg: '-6586595182600',
          pendingpos: '0',
          reserved: '0',
          symbol: 'SP31',
          value: '321623187160442',
        },
        {
          divisible: true,
          error: false,
          id: 0,
          pendingneg: '0',
          pendingpos: '0',
          symbol: 'BTC',
          value: '251440000',
        },
      ],
    };

    const putDescriptor = getAddressGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(addressLoaded(response, addr)));
  });

  it('should call the addressLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getAddressGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(addressLoadingError(response)));
  });
});

describe('githubDataSaga Saga', () => {
  const rootSaga = root();

  it('should start task to watch for LOAD_ADDRESS action', () => {
    const takeLatestDescriptor = rootSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_ADDRESS, getAddress));
  });
});

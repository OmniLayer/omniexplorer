/**
 * Tests for AddressDetail sagas
 */

import { all, put, takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';

import { API_URL_BASE } from 'containers/App/constants';
import {
  addressLoaded,
  addressLoadingError,
} from 'containers/AddressDetail/actions';

import { LOAD_ADDRESS } from 'containers/AddressDetail/constants';
import root, { getAddress } from '../saga';

const addr = '17ScKNXo4cL8DyfWfcCWu1uJySQuJm7iKx';

/* eslint-disable redux-saga/yield-effects */
describe('getAddress Saga', () => {
  let getAddressGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getAddressGenerator = getAddress({ addr });

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
          id: 0,
          pendingneg: '0',
          pendingpos: '0',
          symbol: 'BTC',
          value: '251440000',
        },
      ],
    };

    const saga = testSaga(getAddress, { addr });
    const url = `${API_URL_BASE}/address/addr`;
    const body = encoderURIParams({ addr });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    };

    saga
      .next()
      .call(request, url, options)
      .next(response)
      .put(addressLoaded(response));
  });

  it('should call the addressLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getAddressGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(addressLoadingError(response)));
  });
});

describe('Address detail Saga', () => {
  it('should start task to watch for LOAD_ADDRESS action', () => {
    // arrange
    const rootSaga = root();
    const expectedYield = all([takeLatest(LOAD_ADDRESS, getAddress)]);

    // act
    const actualYield = rootSaga.next().value;

    // assert
    expect(actualYield).toEqual(expectedYield);
  });
});

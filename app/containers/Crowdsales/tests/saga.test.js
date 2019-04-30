/**
 * Tests for CrowdsalesDetail sagas
 */

import { all, put, takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';

import { API_URL_BASE, ECOSYSTEM_PROD } from 'containers/App/constants';
import {
  crowdsalesLoaded,
  crowdsalesLoadingError,
} from 'containers/Crowdsales/actions';

import { LOAD_CROWDSALES } from '../constants';
import root, { getCrowdsales } from '../saga';

const addr = '17ScKNXo4cL8DyfWfcCWu1uJySQuJm7iKx';

/* eslint-disable redux-saga/yield-effects */
describe('getCrowdsales Saga', () => {
  let getCrowdsalesGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    const ecosystem = ECOSYSTEM_PROD;
    // const saga = testSaga(getCrowdsales, { ecosystem });
    getCrowdsalesGenerator = getCrowdsales({ ecosystem });

    const selectDescriptor = getCrowdsalesGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getCrowdsalesGenerator.next(addr).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the crowdsalesLoaded action if it requests the data successfully', () => {
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

    const ecosystem = ECOSYSTEM_PROD;
    const saga = testSaga(getCrowdsales, { ecosystem });
    const url = `${API_URL_BASE}/properties/listactivecrowdsales`;

    const body = encoderURIParams({ ecosystem });

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
      .put(crowdsalesLoaded(response));
  });

  it('should call the crowdsalesLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getCrowdsalesGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(crowdsalesLoadingError(response)));
  });
});

describe('Crowdsales detail Saga', () => {
  it('should start task to watch for LOAD_CROWDSALES action', () => {
    // arrange
    const rootSaga = root();
    const expectedYield = all([takeLatest(LOAD_CROWDSALES, getCrowdsales)]);

    // act
    const actualYield = rootSaga.next().value;

    // assert
    expect(actualYield).toEqual(expectedYield);
  });
});

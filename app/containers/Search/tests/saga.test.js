/**
 * Tests for AddressDetail sagas
 */

import { all, put, takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';

import { API_URL_BASE } from 'containers/App/constants';
import { searchLoaded, searchLoadingError } from 'containers/Search/actions';
import { LOAD_SEARCH } from 'containers/Search/constants';
import root, { getSearch } from 'containers/Search/saga';

/* eslint-disable redux-saga/yield-effects */
describe('getSearch Saga', () => {
  let getSearchGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getSearchGenerator = getSearch({ query: '' });

    const selectDescriptor = getSearchGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getSearchGenerator.next('OMNI').value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the searchLoaded action if it requests the data successfully', () => {
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

    const saga = testSaga(getSearch, { query: 'OMNI' });
    const url = `${API_URL_BASE}/search`;
    const body = encoderURIParams({ query: 'OMNI' });

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
      .put(searchLoaded(response));
  });

  it('should call the searchLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getSearchGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(searchLoadingError(response)));
  });
});

describe('Search Saga', () => {
  it('should start task to watch for LOAD_ADDRESS action', () => {
    // arrange
    const rootSaga = root();
    const expectedYield = all([takeLatest(LOAD_SEARCH, getSearch)]);

    // act
    const actualYield = rootSaga.next().value;

    // assert
    expect(actualYield).toEqual(expectedYield);
  });
});

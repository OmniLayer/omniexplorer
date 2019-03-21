import { call, put, takeLatest, all } from 'redux-saga/effects';
import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_ACTIVATIONS } from './constants';
import { activationsLoaded, activationsLoadingError } from './actions';
import encoderURIParams from 'utils/encoderURIParams';

import request from 'utils/request';

const mockedActivations = {
  "pendingactivations": [
  ],
  "completedactivations": [
    {
      "featureid": 1,
      "featurename": "Class C transaction encoding",
      "activationblock": 395000,
      "minimumversion": 1000000
    },
    {
      "featureid": 5,
      "featurename": "DEx integer math update",
      "activationblock": 395000,
      "minimumversion": 1000000
    },
    {
      "featureid": 7,
      "featurename": "Disable crowdsale ecosystem crossovers",
      "activationblock": 395000,
      "minimumversion": 1000000
    },
    {
      "featureid": 6,
      "featurename": "Send All transactions",
      "activationblock": 395000,
      "minimumversion": 1000000
    },
    {
      "featureid": 4,
      "featurename": "Remove grant side effects",
      "activationblock": 394500,
      "minimumversion": 1000000
    },
    {
      "featureid": 2,
      "featurename": "Distributed Meta Token Exchange",
      "activationblock": 400000,
      "minimumversion": 1000000
    },
    {
      "featureid": 8,
      "featurename": "Allow trading all pairs on the Distributed Exchange",
      "activationblock": 438500,
      "minimumversion": 1100000
    },
    {
      "featureid": 14,
      "featurename": "Activate the waiting period for enabling freezing",
      "activationblock": 499200,
      "minimumversion": 30000000
    }
  ]
};

export function* getActivations() {
  const requestURL = `${API_URL_BASE}/activations`;

  try {
    //TODO: use api instead of mocked response
    // const activations = yield call(request, requestURL);

    yield put(activationsLoaded(mockedActivations));
  } catch (err) {
    yield put(activationsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([takeLatest(LOAD_ACTIVATIONS, getActivations)]);
}

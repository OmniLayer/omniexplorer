import { fromJS } from 'immutable';
import { GLOBAL_ON_SAGA_ERROR } from 'constants.js';

import {
  ERROR_BACKEND_LAGGED,
  ERROR_CLEAN,
} from './constants';

const initialState = fromJS({
  error: null,
  errorInfo: null,
  modal: false,
});

const errorBoundaryReducer = (state = initialState, action = {}) => {
  const { error, errorInfo, type } = action;
  switch (type) {
    case ERROR_CLEAN:
      return initialState;
    case ERROR_BACKEND_LAGGED:
      return state
        .set('error', 'backend lagged')
        .set('errorInfo', (errorInfo || {componentStack: 'backend lagged'}));
    case GLOBAL_ON_SAGA_ERROR:
      return state
        .set('modal', true)
        .set('error', `${error.message} ${error.response || ''}`)
        .set('errorInfo', (errorInfo || {componentStack: error.message}));
    default: {
      return state;
    }
  }
};

export default errorBoundaryReducer;

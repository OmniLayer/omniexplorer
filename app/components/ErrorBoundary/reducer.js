import produce from 'immer';
import { GLOBAL_ON_SAGA_ERROR } from 'constants.js';
import { ERROR_BACKEND_LAGGED, ERROR_CLEAN } from './constants';

export const initialState = {
  error: null,
  errorInfo: null,
  modal: false,
};

/* eslint-disable default-case, no-param-reassign */
const errorBoundaryReducer = (state = initialState, action = {}) => {
  const { error, errorInfo, type } = action;
  return produce(state, draft => {
    switch (type) {
      case ERROR_CLEAN:
        draft.modal = false;
        break;
      case ERROR_BACKEND_LAGGED:
        draft.error = 'backend lagged';
        draft.errorInfo = (errorInfo || { componentStack: 'backend lagged' });
        break;
      case GLOBAL_ON_SAGA_ERROR:
        draft.modal = true;
        draft.error = error;
        draft.errorInfo = (errorInfo || { componentStack: error.message });
        break;
    }
  });
};

export default errorBoundaryReducer;

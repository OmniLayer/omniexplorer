import { fromJS } from 'immutable';
import {
  ERROR_BACKEND_LAGGED,
} from './constants';

const initialState = fromJS({
  error: null,
  errorInfo: null,
});

const errorBoundaryReducer = (state = initialState, action = {}) => {
  const { error, errorInfo, type } = action;
  switch (type) {
    // case ERROR_CLEAN:
    //   return state
    //     .set('error', null)
    //     .set('errorInfo', null);
    case ERROR_BACKEND_LAGGED:
      return state
        .set('error', 'backend lagged')
        .set('errorInfo', {componentStack: 'backend lagged'});
    default: {
      return state;
    }
  }
};

export default errorBoundaryReducer;

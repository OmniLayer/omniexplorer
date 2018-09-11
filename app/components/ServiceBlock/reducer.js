import { fromJS } from 'immutable';
import {
  LOAD_STATUS,
  LOAD_STATUS_ERROR,
  LOAD_STATUS_SUCCESS,
} from './constants';

const initialState = fromJS({
  status: {},
  error: null,
  isFetching: false,
  lastFetched: 0,
});

const statusReducer = (state = initialState, action = {}) => {
  const { error, payload, type } = action;
  switch (type) {
    case LOAD_STATUS_ERROR: {
      return state.set('isFetching', false).set('error', error);
    }
    case LOAD_STATUS: {
      return state
        .set('isFetching', true)
        .set('error', null)
        .set('status', {});
    }
    case LOAD_STATUS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('lastFetched', Date.now())
        .set('error', null)
        .set('status', payload);
    default: {
      return state;
    }
  }
};

export default statusReducer;

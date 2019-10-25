import {
  LOAD_PROPERTY,
  LOAD_PROPERTY_SUCCESS,
} from './constants';

import produce from 'immer';

export const initialState = {
  tokens: {},
  error: null,
  isFetching: false,
  lastFetched: 0,
};

const propertyReducer = (state = initialState, action = {}) => {
  const { error, payload, type } = action;

  switch (type) {
    case LOAD_PROPERTY: {
      return state
        .set('lastFetched', 0)
        .set('isFetching', true)
        .set('error', null);
    }
    case LOAD_PROPERTY_SUCCESS: {
      return state
      .set('isFetching', false)
      .set('lastFetched', Date.now())
      .set('error', null)
      .setIn(['tokens', payload.propertyid.toString()], payload);
    }
    default: {
      return state;
    }
  }
};

export default propertyReducer;

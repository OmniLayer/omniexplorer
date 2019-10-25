import produce from 'immer';
import { LOAD_PROPERTY, LOAD_PROPERTY_SUCCESS } from './constants';

export const initialState = {
  tokens: {},
  error: null,
  isFetching: false,
  lastFetched: 0,
};

/* eslint-disable default-case, no-param-reassign */
const propertyReducer = (state = initialState, action = {}) => {
  const { error, payload, type } = action;
  return produce(state, draft => {
    switch (type) {
      case LOAD_PROPERTY:
        draft.lastFetched = 0;
        draft.isFetching = true;
        draft.error = null;
        break;
      case LOAD_PROPERTY_SUCCESS:
        draft.isFetching = false;
        draft.lastFetched = Date.now();
        draft.error = null;
        // .setIn(['tokens', payload.propertyid.toString()], payload);
        debugger;
        draft.tokens[payload.propertyid.toString()] = payload;
        break;
    }
  });
};

export default propertyReducer;

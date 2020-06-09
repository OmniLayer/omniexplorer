import produce from 'immer';
import {
  LOAD_MANY_PROPERTIES,
  LOAD_MANY_PROPERTIES_SUCCESS,
  LOAD_PROPERTY,
  LOAD_PROPERTY_CANCEL,
  LOAD_PROPERTY_DEEP,
  LOAD_PROPERTY_SUCCESS,
  FETCHING_PROPERTY,
} from './constants';

export const initialState = {
  tokens: {},
  error: null,
  isFetching: false,
  lastFetched: 0,
};

/* eslint-disable default-case, no-param-reassign */
const propertyReducer = (state = initialState, action = {}) => {
  const { error, payload, type, propertyId } = action;
  return produce(state, draft => {
    switch (type) {
      case LOAD_PROPERTY_CANCEL:
        draft.isFetching = false;
        draft.lastFetched = Date.now();
      case LOAD_PROPERTY:
        draft.isFetching = true;
        draft.lastFetched = 0;
        draft.error = null;
        break;
      case FETCHING_PROPERTY:
        draft.isFetching = true;
        draft.tokens[propertyId] = { isFetching: true };
      case LOAD_PROPERTY_DEEP:
        draft.isFetching = true;
        draft.error = null;
        break;
      case LOAD_PROPERTY_SUCCESS:
        draft.isFetching = false;
        draft.lastFetched = Date.now();
        draft.error = null;
        draft.tokens[payload.propertyid] = payload;
        break;
      case LOAD_MANY_PROPERTIES:
        draft.isFetching = true;
        draft.lastFetched = 0;
        draft.error = null;
        break;
      case LOAD_MANY_PROPERTIES_SUCCESS:
        payload.forEach(p =>
          Object.values(p).forEach(token => {
            draft.tokens[token.propertyid] = token;
          }),
        );
        draft.isFetching = false;
        draft.lastFetched = Date.now();
        draft.error = null;
        break;
    }
  });
};

export default propertyReducer;

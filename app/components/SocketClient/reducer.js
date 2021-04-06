import produce from 'immer';

import {
  WS_CONNECT,
  WS_CONNECTING,
  WS_CONNECT_SUCCESS,
  WS_DISCONNECT,
  WS_DISCONNECT_SUCCESS,
  WS_CONNECT_FAILURE,
  WS_SUBSCRIBE_EVENT,
  WS_EMIT_EVENT,
} from './constants';
import { LOAD_STATUS, LOAD_STATUS_SUCCESS } from '../ServiceBlock/constants';

export const initialState = {
  connected: false,
  isSending: false,
  error: null,
};


/* eslint-disable default-case, no-param-reassign */
const socketClientReducer = (state = initialState, action = {}) => {
  const { payload, type } = action;
  return produce(state, draft => {
    switch (type) {
      case WS_EMIT_EVENT:
        draft.isSending = true;
        draft.error = null;
        break;
    }
  });
};

export default socketClientReducer;

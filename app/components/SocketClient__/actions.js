import {
  // SEND, SEND_SUCCESS, SEND_FAIL
  WS_CONNECT,
  WS_CONNECTING,
  WS_CONNECT_SUCCESS,
  WS_DISCONNECT,
  WS_DISCONNECT_SUCCESS,
  WS_CONNECT_FAILURE,
  WS_SUBSCRIBE_EVENT,
  WS_NEW_MESSAGE,
  WS_EMIT_EVENT,
} from './constants';
//
// export function send(chatId, content) {
//   const message = { chatId, content };
//   return {
//     type: 'socket',
//     types: [SEND, SEND_SUCCESS, SEND_FAIL],
//     promise: socket => socket.emit('SendMessage', message),
//   };
// }
export function subscribeMessages() {
  return {
    event: 'message',
    handle: SEND,
  };
}

export function unsubscribeMessages() {
  return {
    event: 'message',
    leave: true,
  };
}

// Action creator with received function:
export function subscribeConversation() {
  return dispatch =>
    dispatch({
      event: 'message',
      handle: data =>
        dispatch({
          type: WS_NEW_MESSAGE,
          payload: data.message,
        }),
    });
}

export const wsConnect = host => ({ type: WS_CONNECT, host });
export const wsConnecting = host => ({ type: WS_CONNECTING, host });
export const wsConnected = host => ({ type: WS_CONNECT_SUCCESS, host });
export const wsDisconnect = host => ({ type: WS_DISCONNECT, host });
export const wsDisconnected = host => ({ type: WS_DISCONNECT_SUCCESS, host });

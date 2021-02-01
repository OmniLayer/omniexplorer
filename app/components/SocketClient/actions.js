import { SEND, SEND_SUCCESS, SEND_FAIL } from './constants';
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
  }
}

export function unsubscribeMessages() {
  return {
    event: 'message',
    leave: true,
  }
}

// Action creator with received function:
export function subscribeConversation() {
  return dispatch => dispatch({
    event: 'message',
    handle: data => dispatch({
      type: NEW_MESSAGE,
      payload: data.message,
    }),
  });
}

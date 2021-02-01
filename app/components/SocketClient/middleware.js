import io from 'socket.io-client';

// import * as actions from '../modules/websocket';
// import { updateGame, } from '../modules/game';
const updateGame = console.log;

// WS conf. @TODO: move this to config file.
const host = 'ws://127.0.0.1:60020';
const socketPath = '/wstest';

const socketMiddleware = () => {
  let socket = null;

  const connect = () => {
    socket = io.connect(host, { path: socketPath });
    return new Promise((resolve, reject) => {
      socket.on('connect', () => resolve());
      socket.on('connect_error', (error) => reject(error));
    });
  };

  const disconnect = () => {
    return new Promise((resolve) => {
      socket.disconnect(() => {
        socket = null;
        resolve();
      });
    });
  };

  const onOpen = store => (event) => {
    console.log('websocket open', event.target.url);
    store.dispatch(actions.wsConnected(event.target.url));
  };

  const onClose = store => () => {
    store.dispatch(actions.wsDisconnected());
  };

  const onMessage = store => (event) => {
    const payload = JSON.parse(event.data);
    console.log('receiving server message');

    switch (payload.type) {
      case 'update_game_players':
        store.dispatch(updateGame(payload.game, payload.current_player));
        break;
      default:
        break;
    }
  };

  // the middleware part of this function
  return store => next => action => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = new WebSocket(action.host);

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);

        break;
      case 'WS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log('websocket closed');
        break;
      case 'NEW_MESSAGE':
        console.log('sending a message', action.msg);
        socket.send(JSON.stringify({
          command: 'NEW_MESSAGE',
          message: action.msg,
        }));
        break;
      default:
        console.log('the next action:', action);
        return next(action);
    }
  };
};

export default socketMiddleware;

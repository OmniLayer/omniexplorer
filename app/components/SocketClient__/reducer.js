import { SEND } from './constants.js';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case SEND: {
      return {
        ...state,
        isSending: true,
      };
    }
    default: {
      return state;
    }
  }
}

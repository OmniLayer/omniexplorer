import produce from 'immer';
import { TOGGLE_DISABLED_TESTNET } from './constants';

export const initialState = {
  disabledTestnet: true,
};

/* eslint-disable default-case, no-param-reassign */
const menuReducer = (state = initialState, action = {}) => {
  const { type } = action;
  return produce(state, draft => {
    switch (type) {
      case TOGGLE_DISABLED_TESTNET:
        draft.disabledTestnet = !state.disabledTestnet;
        console.log('toggle disabled tesnet switch', state.disabledTestnet);
        break;
    }
  });
};

export default menuReducer;

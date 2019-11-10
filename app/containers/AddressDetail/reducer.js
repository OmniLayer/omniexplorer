/*
 *
 * AddressDetail reducer
 *
 */
import produce from 'immer';
import { LOAD_ADDRESS, LOAD_ADDRESS_SUCCESS } from './constants';

const initialAddress = {
  balance: [],
};

export const initialState = {
  loading: false,
  address: initialAddress,
};

/* eslint-disable default-case, no-param-reassign */
const addressDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ADDRESS:
        draft.loading = true;
        draft.address = initialAddress;
        break;
      case LOAD_ADDRESS_SUCCESS:
        draft.loading = false;
        draft.address = action.address;
        break;
    }
  });

export default addressDetailReducer;

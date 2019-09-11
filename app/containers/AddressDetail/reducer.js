/*
 *
 * AddressDetail reducer
 *
 */

import {
  LOAD_ADDRESS,
  LOAD_ADDRESS_SUCCESS,
} from './constants';

const initialAddress = {
  balance: [],
};

const initialState = {
  loading: false,
  address: initialAddress,
};

function addressDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ADDRESS:
      return state
        .set('loading', true)
        .set('address', initialAddress);
    case LOAD_ADDRESS_SUCCESS:
      return state
        .set('address', action.address)
        .set('loading', false);
    default:
      return state;
  }
}

export default addressDetailReducer;

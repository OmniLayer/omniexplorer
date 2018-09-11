/*
 *
 * AddressDetail reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LOAD_ADDRESS,
  LOAD_ADDRESS_SUCCESS,
  LOAD_ADDRESS_ERROR,
} from './constants';

const initialAddress = {
  balance: [],
};

const initialState = fromJS({
  loading: false,
  error: false,
  address: initialAddress,
});

function addressDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ADDRESS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('address', initialAddress);
    case LOAD_ADDRESS_SUCCESS:
      return state
        .set('address', action.address)
        .set('error', false)
        .set('loading', false);
    case LOAD_ADDRESS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default addressDetailReducer;

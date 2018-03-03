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

const initialState = fromJS({});

function addressDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ADDRESS:
      return state;
    case LOAD_ADDRESS_SUCCESS:
      return state;
    case LOAD_ADDRESS_ERROR:
      return state;
    default:
      return state;
  }
}

export default addressDetailReducer;

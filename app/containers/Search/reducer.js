/*
 *
 * Search reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_SEARCH,
  LOAD_SEARCH_SUCCESS,
  LOAD_SEARCH_ERROR,
} from './constants';

const initialState = fromJS({});

function searchReducer(state = initialState, action) {
  const { error, payload, type } = action;

  switch (type) {
    case LOAD_SEARCH:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_SEARCH_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('payload', payload);
    case LOAD_SEARCH_ERROR:
      return state
        .set('error', error)
        .set('loading', false);
    default:
      return state;
  }
}

export default searchReducer;

/*
 *
 * Activations reducer
 *
 */

import { fromJS } from 'immutable';

import { LOAD_ACTIVATIONS, LOAD_ACTIVATIONS_ERROR, LOAD_ACTIVATIONS_SUCCESS } from './constants';

const activation = {
  featureid: 1,
  featurename: 'Class C transaction encoding',
  activationblock: 395000,
  minimumversion: 1000000,
};
const initialState = fromJS({
  loading: true,
  list: [],
  pendingactivations: [],
  completedactivations: [],
});

function ActivationsReducer(state = initialState, action) {
  const { activations } = action;
  switch (action.type) {
    case LOAD_ACTIVATIONS:
      return state.set('loading', true);
    case LOAD_ACTIVATIONS_SUCCESS:
      return state
      .set('pendingactivations', activations.pendingactivations)
      .set('completedactivations', activations.completedactivations)
      .set('list', activations.completedactivations)
      .set('loading', false)
      .set('error', null);
    case LOAD_ACTIVATIONS_ERROR:
      return state
      .set('error', action.error)
      .set('loading', false);
    default:
      return state;
  }
}

export default ActivationsReducer;

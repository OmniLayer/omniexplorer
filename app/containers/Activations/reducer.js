/*
 *
 * Activations reducer
 *
 */
import produce from 'immer';
import orderBy from 'lodash/orderBy';

import { LOAD_ACTIVATIONS, LOAD_ACTIVATIONS_SUCCESS } from './constants';

const activation = {
  featureid: 1,
  featurename: 'Class C transaction encoding',
  activationblock: 395000,
  minimumversion: 1000000,
};

export const initialState = {
  loading: true,
  list: [],
  pendingactivations: [],
  completedactivations: [],
};

/* eslint-disable default-case, no-param-reassign */
const ActivationsReducer = (state = initialState, action) => {
  const { activations } = action;
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ACTIVATIONS:
        draft.loading = true;
        break;
      case LOAD_ACTIVATIONS_SUCCESS:
        draft.pendingactivations = orderBy(activations.pendingactivations, 'featureid', 'asc');
        draft.completedactivations = orderBy(activations.completedactivations, 'featureid', 'asc');
        draft.list = orderBy(activations.completedactivations, 'featureid', 'asc');
        draft.loading = false;
        draft.error = null;
        break;
    }
  });
};

export default ActivationsReducer;

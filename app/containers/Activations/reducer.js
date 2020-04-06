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
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const activationsReducer = (state = initialState, {type, activations} = action) =>
  produce(state, draft => {
    switch (type) {
      case LOAD_ACTIVATIONS:
        draft.loading = true;
        break;
      case LOAD_ACTIVATIONS_SUCCESS:
        draft.list = orderBy(activations.activations, 'featureid', 'asc');
        draft.loading = false;
        draft.error = null;
        break;
    }
  });

export default activationsReducer;
